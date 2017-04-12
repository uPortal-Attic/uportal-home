#!/bin/bash

if [ "$1" = "master" ]; then
  cp angularjs-portal-home/src/main/webapp/js/override.js angularjs-portal-home/src/main/webapp/js/override.js.bak
  cp angularjs-portal-home/src/main/webapp/js/master-override.js angularjs-portal-home/src/main/webapp/js/override.js

  mvn -Djava.awt.headless=true clean install
else

  if [ "$#" = "0" ]; then
   mvn -Djava.awt.headless=true clean install
  else
   mvn -Djava.awt.headless=true $@
  fi

fi
  pushd ../uw-frame/
  npm run clean
  pushd uw-frame-java
  mvn -Djava.awt.headless=true clean install
  popd
  popd
  pushd angularjs-portal-home
  mvn -Djava.awt.headless=true tomcat7:redeploy
  popd

if [ "$1" = "master" ]; then
  mv angularjs-portal-home/src/main/webapp/js/override.js.bak angularjs-portal-home/src/main/webapp/js/override.js
fi


unamestr=`uname`
if [[ "$unamestr" == 'Linux' ]]; then
 notify-send "Build complete for angularjs-portal"
elif [[ "$unamestr" == 'Darwin' ]]; then
 osascript -e 'display notification "angularJS-portal build.sh finished" with title "Angular portal deployed" sound name "Hero"'
fi
