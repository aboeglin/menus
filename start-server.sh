#!/bin/bash

timeOfChange=$(date -r ./build/server/run)

if [ -f ./build/server/run ]; then
  ./build/server/run &
fi

while :
do
  currentTimeOfChange=$(date -r ./build/server/run)

  if [ "$timeOfChange" != "$currentTimeOfChange" ]; then
    ps aux | grep "./build/server/run$" | awk '{print $2;}' | xargs kill -9;
    timeOfChange=$currentTimeOfChange
  fi

  if [ $(ps aux | grep "./build/server/run$" | wc -l) -eq 0 ]; then
    ./build/server/run &
  fi
  sleep 1
done
