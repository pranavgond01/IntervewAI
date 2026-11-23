@echo off
title Interview Project Launcher
echo ========================================================
echo         INTERVIEW PROJECT LAUNCHER (C:\Interview)
echo ========================================================

echo [1/3] Ensuring MongoDB service is running...
sc query MongoDB | find "RUNNING" >nul
if %ERRORLEVEL% NEQ 0 (
    echo Starting MongoDB service...
    net start MongoDB
) else (
    echo MongoDB is already active.
)

echo [2/3] Launching NestJS Backend Server on http://localhost:5000 ...
start "Interview Server (Port 5000)" cmd /k "cd /d C:\Interview\server && npm run start:dev"

echo [3/3] Launching Next.js Frontend on http://localhost:3000 ...
start "Interview Client (Port 3000)" cmd /k "cd /d C:\Interview\client && npm run dev"

echo.
echo ========================================================
echo Application started successfully from C:\Interview!
echo   * Frontend Next.js:  http://localhost:3000
echo   * Backend REST API:  http://localhost:5000
echo   * Swagger API Docs:  http://localhost:5000/docs
echo ========================================================
timeout /t 5
