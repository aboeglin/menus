#!/bin/sh

if [ -f ./build/server/run ]; then
#   PID=$(lsof -n -i :4001 | grep LISTEN | awk '{print $2;}')
  ps aux | grep "./build/server/run$" | awk '{print $2;}' | xargs kill -9
#   if [ $PID ]; then
#     echo "Killing server...";
#     kill -9 $PID;
#     echo "Killed.";
#   fi
  ./build/server/run
fi
