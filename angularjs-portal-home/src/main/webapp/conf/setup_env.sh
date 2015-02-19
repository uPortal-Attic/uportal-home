#!/bin/bash

ENV=$1;


cp angularjs-portal-home/target/web/conf/app-config/${ENV}-config.js angularjs-portal-home/target/web/js/app-config.js
cp angularjs-portal-home/target/web/conf/${ENV}.js angularjs-portal-home/target/web/js/config.js

echo "Environment setup complete"

