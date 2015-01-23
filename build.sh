#!/bin/bash

mvn -Djava.awt.headless=true clean package
pushd angularjs-portal-frame
mvn -Djava.awt.headless=true tomcat7:redeploy
popd
mvn install
pushd angularjs-portal-home
mvn -Djava.awt.headless=true tomcat7:redeploy
popd
