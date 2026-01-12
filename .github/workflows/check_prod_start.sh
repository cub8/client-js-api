#!/bin/bash

# Start the application with a timeout
timeout 10s npm run start || code=$?

# check if it timed out (124) which means it kept running (success)
if [ "$code" -eq 124 ]; then
  echo "Server started and ran for 10 seconds (success)"
  exit 0
else
  echo "Server exited with code $code"
  exit 1
fi
