#!/bin/bash
#cd ../git/DronologyEventWeek/edu.nd.dronology.ui.vaadin
export DISPLAY="localhost:1"
export DISPLAY=:0
export TERM=xterm-256color
pkill -9 python
pkill -9 java
gnome-terminal --profile="p1"  -e 'bash -c "cd ../../edu.nd.dronology.ui.vaadin; mvn jetty:run; exec bash"'
gnome-terminal --profile="p1"  -e 'bash -c "cd ../../edu.nd.dronology.services.launch; mvn exec:java; exec bash"'
#gnome-terminal --profile="p1"  -e 'bash -c "cd #../git/DronologyEventWeek/python/edu.nd.dronology.gstation1.python;bash runner.sh; exec bash"'
sleep 15
x-www-browser http://localhost:8080/vaadinui

