@echo off
REM Cross-platform dev script for Windows (opens two terminals)

REM Start backend in new terminal window
title Smart Air Quality Monitor - Backend
start cmd /k "cd /d %~dp0backend && npm install && npm run dev"

REM Start frontend in new terminal window
title Smart Air Quality Monitor - Frontend
start cmd /k "cd /d %~dp0frontend && npm install && npm run dev"

echo Backend and frontend are starting in new Command Prompt windows.
pause
