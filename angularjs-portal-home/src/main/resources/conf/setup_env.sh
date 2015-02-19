#!/bin/bash

ENV=$1;
TARGET=angularjs-portal-home/target/web/js


cp angularjs-portal-home/src/main/resources/conf/app-config/${ENV}-config.js ${TARGET}/app-config.js
if [ $? != 0 ];then
 echo 'that env exist? No app-config file for it'
 exit -1;
fi
cp angularjs-portal-home/target/web/conf/${ENV}.js ${TARGET}/config.js
if [ $? != 0 ];then
 echo 'no ga config for this environment'
 exit -1;
fi
echo "Environment setup complete"

