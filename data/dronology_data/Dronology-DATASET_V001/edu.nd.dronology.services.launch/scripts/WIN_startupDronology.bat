SET WORKSPACE_ROOT=../..
SET VAADIN_PROJECT=edu.nd.dronology.ui.vaadin
SET LAUNCH_PROJECT=edu.nd.dronology.services.launch


start cmd /k "cd /D %WORKSPACE_ROOT%/%VAADIN_PROJECT% & mvn jetty:run"
start cmd /k "cd /D %WORKSPACE_ROOT%/%LAUNCH_PROJECT% & mvn exec:java"
TIMEOUT 20
start "" http://localhost:8080