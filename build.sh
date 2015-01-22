#!/bin/bash

mvn -Djava.awt.headless=true clean package
pushd angularjs-portal-frame
mvn -Djava.awt.headless=true tomcat7:redeploy
popd
pushd angularjs-portal-home
mvn -Djava.awt.headless=true tomcat7:redeploy
popd

# On MacOS this will display a notification.
# osascript -e 'display notification "angularJSportal build.sh finished" with title "Angular portal deployed" sound name "Hero"'
# See http://apple.stackexchange.com/questions/57412/
