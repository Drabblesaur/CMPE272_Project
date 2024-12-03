#!/bin/bash

# Ensure the script runs from the correct directory
cd "$(dirname "$0")"

# Check if the PID file exists
if [ -f npm-start.pid ]; then
    existing_pid=$(cat npm-start.pid)
    
    # Check if the process is running
    if ps -p $existing_pid > /dev/null; then
        echo "Stopping existing npm process (PID: $existing_pid)..."
        kill $existing_pid
        sleep 2
        echo "Process stopped successfully."
    else
        echo "No running process found with PID: $existing_pid."
    fi

    # Remove the PID file
    rm -f npm-start.pid
else
    echo "No PID file found. Backend may not be running."
fi