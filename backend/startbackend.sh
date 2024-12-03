#!/bin/bash

# Ensure the script runs from the correct directory
cd "$(dirname "$0")"

# Check if an existing process is running using the PID file
if [ -f npm-start.pid ]; then
    existing_pid=$(cat npm-start.pid)
    if ps -p $existing_pid > /dev/null; then
        echo "Stopping existing npm process (PID: $existing_pid)..."
        kill $existing_pid
        sleep 2
    fi
    rm -f npm-start.pid
fi

# Start `npm start` in the background without logging
nohup npm start >/dev/null 2>&1 &

# Save the process ID (PID) to a file
echo $! > npm-start.pid

# Inform the user
echo "npm start has been restarted in the background."
echo "PID of the process is $(cat npm-start.pid)."