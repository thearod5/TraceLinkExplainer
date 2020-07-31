import json
import os
import socket
import threading
import time
import util
from boltons import socketutils
from communication import command

_LOG = util.get_logger()


class MessageQueue:
    def __init__(self):
        self._lock = threading.Lock()
        self._messages = []

    def put_message(self, msg):
        with self._lock:
            self._messages.append(msg)

    def get_messages(self):
        msgs = []
        with self._lock:
            while self._messages:
                msgs.append(self._messages.pop(0))

        return msgs


class Connection(object):
    _WAITING = 1
    _CONNECTED = 2
    _DEAD = -1

    def __init__(self, msg_queue, addr='', port=1234, g_id='default_groundstation'):
        self._g_id = g_id
        self._msgs = msg_queue
        self._addr = addr
        self._port = port
        self._sock = None
        self._conn_lock = threading.Lock()
        self._status = Connection._WAITING
        self._status_lock = threading.Lock()
        self._msg_buffer = ''

    def get_status(self):
        with self._status_lock:
            return self._status

    def set_status(self, status):
        with self._status_lock:
            self._status = status

    def is_connected(self):
        return self.get_status() == Connection._CONNECTED

    def start(self):
        threading.Thread(target=self._work).start()

    def stop(self):
        self.set_status(Connection._DEAD)

    def send(self, msg):
        success = False
        with self._conn_lock:
            if self._status == Connection._CONNECTED:
                try:
                    self._sock.send(msg)
                    self._sock.send(os.linesep)
                    success = True
                except Exception as e:
                    _LOG.warn('failed to send message! ({})'.format(e))

        return success

    def get_messages(self, vid):
        return self._msgs.get_messages(vid)

    def _recv(self):
        msg = self._sock.recv_until(os.linesep, timeout=0.1)
        cmd = command.CommandFactory.get_command(msg)
        if isinstance(cmd, command.Command):
            self._msgs.put_message(cmd)

    def _handshake(self):
        handshake = json.dumps({'type': 'connect', 'groundstationid': self._g_id})
        self._sock.send(handshake)
        self._sock.send(os.linesep)

    def _work(self):
        """
        Main loop.
            1. Wait for a connection
            2. Once connected, wait for commands from dronology
            3. If connection interrupted, wait for another connection again.
            4. Shut down when status is set to DEAD
        :return:
        """
        cont = True
        while cont:
            status = self.get_status()
            if status == Connection._DEAD:
                # Shut down
                cont = False
            elif status == Connection._WAITING:
                # Try to connect, timeout after 10 seconds.
                try:
                    sock = socket.create_connection((self._addr, self._port), timeout=5.0)
                    self._sock = socketutils.BufferedSocket(sock)
                    self._handshake()
                    self.set_status(Connection._CONNECTED)
                except socket.error as e:
                    _LOG.info('Socket error ({})'.format(e))
                    time.sleep(10.0)
            else:
                # Receive messages
                try:
                    self._recv()
                except socket.timeout:
                    pass
                except socket.error as e:
                    _LOG.warn('connection interrupted! ({})'.format(e))
                    self._sock.shutdown(socket.SHUT_RDWR)
                    self._sock.close()
                    self._sock = None
                    self.set_status(Connection._WAITING)
                    time.sleep(20.0)

        if self._sock is not None:
            _LOG.info('Shutting down socket.')
            self._sock.shutdown(socket.SHUT_WR)
            _LOG.info('Closing socket.')
            self._sock.close()
            return


class RTKConnection(Connection):
    def __init__(self, msg_list, address, port):
        Connection.__init__(self, msg_list, addr=address, port=port)
        self._received_data = ''
        self._buf_size = 1024

    def _handshake(self):
        # no handshake necessary
        pass

    def _recv(self):
        # override default implementation
        msg = self._sock.recv(self._buf_size)
        self._received_data += msg
        self._parse()

    def _parse(self):
        pos = self._received_data.find(chr(0xD3))
        if pos > 0:
            self._received_data = self._received_data[pos:]
            self._parse()  # re-parse starting from the RTCM preamble
        # TODO: remove this recursive loop!
        elif pos == 0 and len(self.received_data) >= 3:
            len_byte_0 = self.received_data[1]
            len_byte_1 = self.received_data[2]
            length = ((ord(len_byte_0) & 3) << 8) + ord(len_byte_1) + 6
            if len(self.received_data) >= length:
                data_chunk = self.received_data[0:length]
                self._msgs.append(data_chunk)
                self.received_data = self.received_data[(length + 1):]
                self._parse()  # might still have data left to parse after this, so recurse to keep on parsing
