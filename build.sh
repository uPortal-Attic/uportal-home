#!/bin/bash

mvn package
pushd angularjs-portal-frame
mvn tomcat7:redeploy
popd
pushd angularjs-portal-home
mvn tomcat7:redeploy
popd
