@echo off
title Stop Interview Services
echo Stopping Interview services on ports 5000 and 3000...

echo Freeing port 5000 (Backend)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5000" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a 2>nul
)

echo Freeing port 3000 (Frontend)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a 2>nul
)

echo Stopped all services.
pause
