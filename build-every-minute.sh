#!/bin/bash

while :
do 

./build.sh

echo "Waiting one minute and then building and redeploying again."
echo "Press [CTRL+C] to stop.."
echo ""
sleep 60

done
