#!/bin/zsh
# Start backend and frontend in separate terminals

# Absolute paths
BACKEND_DIR="$(cd "$(dirname "$0")/backend" && pwd)"
FRONTEND_DIR="$(cd "$(dirname "$0")/frontend" && pwd)"

# Start backend in new Terminal tab
osascript <<END
 tell application "Terminal"
   activate
   do script "cd '$BACKEND_DIR' && npm install && npm run dev"
 end tell
END

# Start frontend in new Terminal tab
osascript <<END
 tell application "Terminal"
   activate
   do script "cd '$FRONTEND_DIR' && npm install && npm run dev"
 end tell
END

echo "Backend and frontend are starting in new Terminal tabs."
