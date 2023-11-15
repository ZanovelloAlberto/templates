#!/bin/sh

sigint_handler()
{
  kill $PID
  exit
}

trap sigint_handler SIGINT

while true; do
  $@ &
  PID=$!
  inotifywait -e modify -r `pwd` # -e move -e create -e delete -e attrib
  kill $PID
done