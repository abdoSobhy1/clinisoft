@echo off
setlocal

REM === Get current date in YYMMDD format ===
for /f %%a in ('powershell -NoProfile -Command "Get-Date -Format yyMMdd"') do set "TODAY=%%a"

REM === Set variables ===
set "PROJECT_DIR=%cd%"
set "PROJECT_NAME=clinisoft"
set "ARCHIVE_NAME=%PROJECT_NAME%-%TODAY%.7z"
set "ARCHIVE_PATH=%PROJECT_DIR%\.."
set "OUTPUT_FILE=%ARCHIVE_PATH%\%ARCHIVE_NAME%"

REM === Set the full path to 7z.exe ===
REM Replace this with the correct path if yours is different
set "SEVENZIP_PATH=C:\Program Files\7-Zip\7z.exe"

REM === Change to project root ===
cd /d "%PROJECT_DIR%"

REM === Create archive using 7-Zip with max compression (-mx=9) and exclusions ===
"%SEVENZIP_PATH%" a -t7z "%OUTPUT_FILE%" * ^
 -xr!node_modules ^
 -xr!.next ^
 -xr!.git ^
 -xr!out ^
 -xr!.vscode ^
 -xr!.idea ^
 -xr!*.log ^
 -xr!.env ^
 -xr!.env.* ^
 -xr!.DS_Store ^
 -mx=9

echo.
echo ✅ Done! Archive created:
echo %OUTPUT_FILE%
pause
