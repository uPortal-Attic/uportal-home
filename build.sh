#!/bin/bash
#
# Licensed to Apereo under one or more contributor license
# agreements. See the NOTICE file distributed with this work
# for additional information regarding copyright ownership.
# Apereo licenses this file to you under the Apache License,
# Version 2.0 (the "License"); you may not use this file
# except in compliance with the License.  You may obtain a
# copy of the License at the following location:
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#


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
