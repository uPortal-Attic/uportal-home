#!/bin/bash

mvn -Djava.awt.headless=true package
pushd angularjs-portal-frame
mvn -Djava.awt.headless=true tomcat7:redeploy
popd
pushd angularjs-portal-home
mvn -Djava.awt.headless=true tomcat7:redeploy
popd
