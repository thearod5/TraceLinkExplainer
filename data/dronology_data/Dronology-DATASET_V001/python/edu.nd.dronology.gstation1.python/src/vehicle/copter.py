import threading
import util
import dronekit
import dronekit_sitl
from pymavlink import mavutil
from common import *
from communication import message, command
from vehicle import VehicleControl

_LOG = util.get_logger()


class CopterControl(VehicleControl):
    def __init__(self, handshake_msg_queue, state_msg_queue, groundstation_id, vehicle_id=None):
        VehicleControl.__init__(self, handshake_msg_queue, state_msg_queue, groundstation_id, vehicle_id=vehicle_id)

    def gen_state_message(self):
        return {}
 
    def gen_monitor_message(self):
        return {}

    def get_location(self):
        raise NotImplementedError

    def connect_vehicle(self, **kwargs):
        raise NotImplementedError

    def handle_command(self, cmd):
        raise NotImplementedError

    def stop(self):
        raise NotImplementedError

    def _set_mode(self, cmd):
        raise NotImplementedError

    def _set_armed(self, cmd=None):
        raise NotImplementedError

    def _takeoff(self, cmd):
        raise NotImplementedError

    def send_rtk_adjustment(self, data):
        pass

    def _goto_lla(self, cmd):
        pass

    def _land(self, cmd):
        pass

    def _set_ground_speed(self, cmd):
        pass

    def _set_velocity(self, cmd):
        pass


class ArduCopter(CopterControl):
    def __init__(self, handshake_msg_queue, state_msg_queue, groundstation_id, vehicle_id=None):
        CopterControl.__init__(self, handshake_msg_queue, state_msg_queue, groundstation_id, vehicle_id=vehicle_id)
        self._v_type = None
        self._sitl = None
        self._cmd_handlers = {
            command.SetMode: self._set_mode,
            command.GotoLocation: self._goto_lla,
            command.Takeoff: self._takeoff,
            command.SetGroundSpeed: self._set_ground_speed,
            command.SetVelocity: self._set_velocity,
            command.SetHome: self._set_home_location,
            command.SetArmed: self._set_armed,
            command.SetMonitorFrequency: self._set_monitor_interval,
        }
        self._sensors = {
            '3D_GYRO': mavutil.mavlink.MAV_SYS_STATUS_SENSOR_3D_GYRO,
            '3D_ACCEL': mavutil.mavlink.MAV_SYS_STATUS_SENSOR_3D_ACCEL
        }

    def handle_command(self, cmd):
        """
        Handle a command from dronology
        :param cmd:
        :return:
        """
        with self._drone_lock:
            if not self._vehicle:
                _LOG.error('Vehicle {} not connected! Ignoring command.'.format(self._vid))
            elif type(cmd) not in self._cmd_handlers:
                _LOG.warn('Vehicle {} received unrecognized command \"{}\" for \"{}\" '
                          'controller!'.format(self._vid,
                                               cmd.__class__.__name__,
                                               self.__class__.__name__))
            elif not self._responsive:
                _LOG.info('Vehicle {} ignoring command: manual control overrides!')
            else:
                self._cmd_handlers[type(cmd)](cmd)

    def send_rtk_adjustment(self, data):
        if self._gps_rtcm_sequence_num >= (1 << 5):
            self._gps_rtcm_sequence_num = 0

        remaining_len = len(data)
        start_buf = 0
        frag_id = 0
        fragmented = False
        msglen = 180

        while remaining_len >= 0 and frag_id < 4:
            # Greater or equal allows for an empty message to be sent if the data is an
            # exact multiple of 180 characters long (as a "terminator")
            length = remaining_len
            if length > msglen:
                length = msglen
                fragmented = True
            packet = data[start_buf:(start_buf + length)]
            flags = (self._gps_rtcm_sequence_num << 3) | (frag_id << 2) | (fragmented)
            buf = bytearray(packet.ljust(msglen, '\0'))
            msg = self._vehicle.message_factory.gps_rtcm_data_encode(flags, length, buf)
            self._vehicle.send_mavlink(msg)
            remaining_len = length - msglen
            start_buf = start_buf + msglen
            frag_id = frag_id + 1
        if remaining_len > 0:
            _LOG.warn('GPS_RTCM_DATA message too long to transmit! Remaining characters: ' + str(remaining_len))

        self._gps_rtcm_sequence_num += 1

    def gen_state_message(self):
        return message.StateMessage.from_vehicle(self._vehicle, self._vid, self._gid)

    def gen_monitor_message(self):
        return message.MonitorMessage.from_vehicle(self._vehicle, self._vid, self._gid)

    def get_location(self, global_relative=True):
        """
        Get the current lat,lon,alt in the global relative frame (altitude wrt to starting altitude)
        :return:
        """
        if global_relative:
            lla = self._vehicle.location.global_relative_frame
        else:
            lla = self._vehicle.location.global_frame 

        return util.Lla(lla.lat, lla.lon, lla.alt) 

    def _set_monitor_interval(self, cmd): 
        self.update_monitor_interval(cmd.get_frequency())

    def _set_mode(self, cmd):
        """
        Set the vehicle mode
        :param cmd:
        :return:
        """ 
        self.__set_mode(cmd.get_mode())

    def __set_mode(self, mode, wait=3.0):
        """
        Set the vehicle mode to the specified mode
        :param mode:
        :return:
        """
        self._vehicle.mode = dronekit.VehicleMode(mode)
        if self._v_type == DRONE_TYPE_PHYS:
            time.sleep(wait)
        mode_ = self._vehicle.mode.name

        while mode_ != mode:
            self._vehicle.mode = dronekit.VehicleMode(mode)
            if self._v_type == DRONE_TYPE_PHYS:
                time.sleep(wait)
            mode_ = self._vehicle.mode.name

    def _set_armed(self, armed=True):
        """
        Arm or disarm the vehicle.
        :param armed:
        :return:
        """
        if self._vehicle.armed != armed:
            if armed:
                while not self._vehicle.is_armable:
                    time.sleep(2.0)

            self._vehicle.armed = armed
            if self._v_type == DRONE_TYPE_PHYS:
                time.sleep(2.0)
            while self._vehicle.armed != armed:
                self._vehicle.armed = armed
                if self._v_type == DRONE_TYPE_PHYS:
                    time.sleep(2.0)

    def _takeoff(self, cmd):
        """
        Takeoff
        :param cmd:
        :return:
        """
        self.__takeoff(cmd.get_altitude())

    def __takeoff(self, alt, wait=2.0):
        """
        Takeoff to the specified altitude
        :param alt:
        :return:
        """
        self.__set_mode(MODE_GUIDED)
        self._set_armed(armed=True)
        self._vehicle.simple_takeoff(alt)
        if self._v_type == DRONE_TYPE_PHYS:
            time.sleep(wait)

    def _goto_lla(self, cmd):
        """
        Go to a location
        :param cmd:
        :return:
        """
        lat, lon, alt = cmd.get_lla().as_array()
        self.__goto_lla(lat, lon, alt)

    def __goto_lla(self, lat, lon, alt):
        """
        Go to the specified lat, lon, alt
        :param lat:
        :param lon:
        :param alt:
        :return:
        """
        self._vehicle.simple_goto(dronekit.LocationGlobalRelative(lat, lon, alt))

    def _land(self, cmd=None):
        """
        Land the vehicle
        :param cmd:
        :return:
        """
        self.__land()

    def __land(self):
        """
        Land the vehicle
        :return:
        """
        self.__set_mode(MODE_LAND)

    def _set_ground_speed(self, cmd):
        """
        Set the ground speed
        :param cmd:
        :return:
        """
        self.__set_ground_speed(cmd.get_speed())

    def __set_ground_speed(self, speed):
        """
        Set the ground speed
        :param speed:
        :return:
        """
        msg = self._vehicle.message_factory.command_long_encode(
            0, 0,  # target system, target component
            mavutil.mavlink.MAV_CMD_DO_CHANGE_SPEED,  # command
            0,  # confirmation
            0,  # param 1
            speed,  # speed in metres/second
            0, 0, 0, 0, 0  # param 3 - 7
        )

        # send command to vehicle
        self._vehicle.send_mavlink(msg)
        self._vehicle.flush()

    def _set_velocity(self, cmd):
        """
        Set the velocity
        :param cmd:
        :return:
        """
        self.__set_velocity(*cmd.get_ned())

    def __set_velocity(self, north, east, down):
        """
        Set the velocity
        :param north:
        :param east:
        :param down:
        :return:
        """
        msg = self._vehicle.message_factory.set_position_target_local_ned_encode(
            0,  # time_boot_ms (not used)
            0, 0,  # target system, target component
            mavutil.mavlink.MAV_FRAME_BODY_NED,  # frame
            0b0000111111000111,  # type_mask (only speeds enabled)
            0, 0, 0,  # x, y, z positions (not used)
            north, east, down,  # x, y, z velocity in m/s
            0, 0, 0,  # x, y, z acceleration (not supported yet, ignored in GCS_Mavlink)
            0, 0)  # yaw, yaw_rate (not supported yet, ignored in GCS_Mavlink)
        # send command to vehicle
        self._vehicle.send_mavlink(msg)
        self._vehicle.flush()

    def _set_home_location(self, cmd):
        """
        Set the home location.
        :param cmd:
        :return:
        """
        self.__set_home_location(*cmd.get_lla().as_array())

    def __set_home_location(self, lat, lon, alt):
        """
        Set the home location
        :param lat:
        :param lon:
        :param alt:
        :return:
        """
        self._vehicle.send_mavlink(self._vehicle.message_factory.command_long_encode(
            0, 0,  # target system, target component
            mavutil.mavlink.MAV_CMD_DO_SET_HOME,  # command
            0,  # confirmation
            2,  # param 1: 1 to use current position, 2 to use the entered values.
            0, 0, 0,  # params 2-4
            lat, lon, alt))
        self._vehicle.flush()

    def connect_vehicle(self, vehicle_type=None, vehicle_id=None, ip=None, instance=0, ardupath=ARDUPATH, rate=10,
                        home=(41.519412, -86.239830, 0, 0), baud=57600, speedup=1.0, async=True,
                        defaults=None, **kwargs):
        """
        Connect to a vehicle
        :param vehicle_type: the type of vehicle to connect to (VRTL or PHYS)
        :param vehicle_id: the id of the vehicle
        :param ip: the connection string of the vehicle
        :param instance: the SITL instance to connect to
        :param ardupath: the location of the ardupilot repository
        :param rate: vehicle refresh rate
        :param home: vehicle starting location (only required for VRTL drones)
        :param baud: baud rate
        :param speedup: simulation speedup
        :param async: True to connect to the vehicle asynchronously
        :param defaults: the location of the ardupilot default parameters
        :return:
        """
        args = vehicle_type, vehicle_id, ip, instance, ardupath, rate, home, baud, speedup
        if async:
            threading.Thread(target=self._connect_vehicle, args=args).start()
        else:
            self._connect_vehicle(*args)

    def _connect_vehicle(self, vehicle_type, vehicle_id, ip, instance, ardupath, rate, home, baud, speedup,
                         defaults=None, wait_till_armable=True):
        """
        Connect to a vehicle
        :param vehicle_type:
        :param vehicle_id:
        :param ip:
        :param instance:
        :param ardupath:
        :param rate:
        :param home:
        :param baud:
        :param speedup:
        :param wait_till_armable:
        :return:
        """
        self._connection_initiated = True
        status = 0
        vehicle = None

        if defaults is None:
            defaults = os.path.join(ardupath, 'Tools', 'autotest', 'default_params', 'copter.parm')

        if home is not None:
            if len(home) == 2:
                home = tuple(home) + (0, 0)
            else:
                home = tuple(home)

        try:
            if vehicle_type == DRONE_TYPE_PHYS:
                vehicle = dronekit.connect(ip, wait_ready=False, baud=baud)
                # must wait separately in order to specify a timeout other than 30 s.
                vehicle.wait_ready(timeout=120)

                self._v_type = DRONE_TYPE_PHYS
                if vehicle_id is None:
                    vehicle_id = ip

            elif vehicle_type == DRONE_TYPE_SITL_VRTL:
                if vehicle_id is None:
                    vehicle_id = vehicle_type + str(instance)

                sitl_args = [
                    '-I{}'.format(str(instance)),
                    '--model', '+',
                    '--home', ','.join(map(str, home)),
                    '--rate', str(rate),
                    '--speedup', str(speedup),
                    '--defaults', defaults
                ]
                _LOG.debug('Trying to launch SITL instance {} on port {}...'.format(instance, 5760 + instance * 10))
                sitl = dronekit_sitl.SITL(path=os.path.join(ardupath, 'build', 'sitl', 'bin', 'arducopter'))
                sitl.launch(sitl_args, await_ready=True)
                tcp, ip, port = sitl.connection_string().split(':')
                port = str(int(port) + instance * 10)
                conn_string = ':'.join([tcp, ip, port])
                _LOG.debug('SITL instance {} launched on: {}'.format(instance, conn_string))
                vehicle = dronekit.connect(conn_string, baud=baud)
                vehicle.wait_ready(timeout=120)
                _LOG.info('Vehicle {} connected on {}'.format(vehicle_id, conn_string))
                self._v_type = DRONE_TYPE_SITL_VRTL
                self._sitl = sitl

            else:
                _LOG.warn('vehicle type {} not supported!'.format(vehicle_type))
                status = -1

            if wait_till_armable:
                # Force wait until vehicle is armable. (ensure all pre-flight checks are completed)
                while not vehicle.is_armable:
                    time.sleep(3.0)

            # Allow some extra time for things to initialize
            time.sleep(3.0)
            with self._drone_lock:
                self._vehicle = vehicle
                self._vid = vehicle_id
                self._register_message_handlers(vehicle)

        except dronekit.APIException as e:
            status = -1
            _LOG.error('Dronekit Exception raised: {}'.format(e.message))

            if vehicle is not None:
                expected = {'parameters', 'gps_0', 'armed', 'mode', 'attitude'}
                ready = set(vehicle._ready_attrs)
                not_ready = expected - ready

                _LOG.error('Attributes not ready! ({})'.format(','.join(not_ready)))

        self._connection_complete = True

        if status >= 0:
            _LOG.info('Vehicle {} successfully initialized.'.format(self._vid))
            self._handshake_out_msgs.put_message(message.DroneHandshakeMessage.from_vehicle(self._vehicle, self._vid, self._gid))
            time.sleep(0.1)
            self._connection_successful = True
        else:
            _LOG.error('Vehicle {} failed to initialize.'.format(self._vid))

    def _send_mode_change(self, mode_name):
        self._state_out_msgs.put_message(message.ModeChangeMessage.from_vehicle(self._vehicle, self._vid, self._gid,
                                                                                mode_name=mode_name))

    def _register_message_handlers(self, vehicle):
        """
        Register all vehicle handlers. Add a new method here to register a new handler.
        :param vehicle:
        :return:
        """
        self._register_sys_status_handler(vehicle)
        self._register_mode_change(vehicle)

    def _register_sys_status_handler(self, vehicle):
        """
        Register sys status listener. If a monitored sensor is not present or unhealthy, report.
        :param vehicle:
        :return:
        """
        @vehicle.on_message('SYS_STATUS')
        def handle_sys_status(_, name, msg):
            for sid, bits in self._sensors.items():
                present = True if ((msg.onboard_control_sensors_enabled & bits) == bits) else False
                healthy = True if ((msg.onboard_control_sensors_health & bits) == bits) else False

                if not present:
                    _LOG.warn('Vehicle {} sensor {} not present!'.format(self._vid, sid))
                elif not healthy:
                    _LOG.warn('Vehicle {} sensor {} not healthy!'.format(self._vid, sid))

    def _register_mode_change(self, vehicle):
        """
        Register a mode listener on the vehicle. When the mode changes, we should ensure that control is
        handed back to the RC.
        :param vehicle:
        :return:
        """
        @vehicle.on_attribute('mode')
        def handle_mode_change(_, name, msg):
            # Tell dronology about the mode change
            self._send_mode_change(msg.name)

            if msg.name == MODE_LOITER:
                _LOG.info('Vehicle {} mode changed to {}, giving up control!'.format(self._vid, msg.name))
                with self._drone_lock:
                    # Give control to the RC
                    # Set responsive to false.. ignore all future commands that might be sent by Dronology
                    self._responsive = False
            elif msg.name == MODE_STBL:
                _LOG.info('Vehicle {} mode changed to STABILIZE, taking back control!'.format(self._vid))
                self.__set_mode(MODE_GUIDED)
                with self._drone_lock:
                    self._responsive = True

    def stop(self):
        """
        Close connection to vehicle and sitl.
        :return:
        """
        if self._connection_initiated:
            while not self._connection_complete:
                time.sleep(1.0)

            for timer in self._timers:
                if timer is not None:
                    timer.stop()

            if self._vehicle:
                _LOG.info('Closing vehicle {} connection.'.format(self._vid))
                self._vehicle.close()
            if self._sitl:
                _LOG.info('Closing SITL connnection for vehicle {}'.format(self._vid))
                self._sitl.stop()

