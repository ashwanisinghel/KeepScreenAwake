@echo off
REM Keep Screen Awake using Chrome - Batch file launcher
REM This batch file calls the PowerShell script to start the keep-awake app

echo Starting Keep Screen Awake app...
echo.

REM Check if PowerShell is available
powershell -Command "Write-Host 'PowerShell is available'" >nul 2>&1
if errorlevel 1 (
    echo ERROR: PowerShell is not available on this system.
    echo This app requires PowerShell to run.
    pause
    exit /b 1
)

REM Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"

REM Run the PowerShell script
powershell -ExecutionPolicy Bypass -File "%SCRIPT_DIR%start-keep-awake.ps1" %*

if errorlevel 1 (
    echo.
    echo Failed to start the keep-awake app.
    echo Please check that Chrome is installed and try again.
    pause
)