#!/bin/bash
if [ "$#" = "0" ]; then
 mvn -Djava.awt.headless=true clean install
else 
 mvn -Djava.awt.headless=true $@
fi

pushd angularjs-portal-frame
mvn -Djava.awt.headless=true tomcat7:redeploy
popd
pushd angularjs-portal-home
mvn -Djava.awt.headless=true tomcat7:redeploy
popd

unamestr=`uname`
if [[ "$unamestr" == 'Linux' ]]; then
 notify-send "build complete for angular" 
elif [[ "$unamestr" == 'Darwin' ]]; then
 osascript -e 'display notification "angularJSportal build.sh finished" with title "Angular portal deployed" sound name "Hero"'
fi

