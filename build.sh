#!/bin/bash

if [ "$1" = "master" ]; then
  cp angularjs-portal-home/src/main/webapp/js/app-config.js angularjs-portal-home/src/main/webapp/js/app-config.js.bak
  cp angularjs-portal-home/src/main/webapp/js/master-app-config.js angularjs-portal-home/src/main/webapp/js/app-config.js
  
  mvn -Djava.awt.headless=true clean install
else

  if [ "$#" = "0" ]; then
   mvn -Djava.awt.headless=true clean install
  else 
   mvn -Djava.awt.headless=true $@
  fi

fi
  
  pushd angularjs-portal-frame
  mvn -Djava.awt.headless=true tomcat7:redeploy
  popd
  pushd angularjs-portal-home
  mvn -Djava.awt.headless=true tomcat7:redeploy
  popd
  
if [ "$1" = "master" ]; then
  mv angularjs-portal-home/src/main/webapp/js/app-config.js.bak angularjs-portal-home/src/main/webapp/js/app-config.js
fi


unamestr=`uname`
if [[ "$unamestr" == 'Linux' ]]; then
 notify-send "build complete for angular" 
elif [[ "$unamestr" == 'Darwin' ]]; then
 osascript -e 'display notification "angularJSportal build.sh finished" with title "Angular portal deployed" sound name "Hero"'
fi

