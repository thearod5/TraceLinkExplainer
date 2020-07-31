#!/bin/bash
#cd ../git/DronologyEventWeek/edu.nd.dronology.ui.vaadin 
pkill -9 python
gnome-terminal --profile="p1"  -e 'bash -c "cd ../../python/edu.nd.dronology.gstation1.python;bash runner.sh; exec bash"'
sleep 15
x-www-browser http://localhost:8080/vaadinui
 
