@echo off
setlocal

REM === Set project directory ===
set "PROJECT_DIR=%cd%"
set "ARCHIVE_NAME=nextjs-project.zip"
set "ARCHIVE_PATH=%PROJECT_DIR%\.."

REM === Temporary working folder for clean copy ===
set "TEMP_COPY=%TEMP%\nextjs_temp_%RANDOM%"

REM === Files/folders to exclude ===
set "EXCLUDES=node_modules .next .git out .vscode .idea *.log .DS_Store .env .env.*"

REM === Clean old temp and create fresh copy ===
if exist "%TEMP_COPY%" rmdir /s /q "%TEMP_COPY%"
mkdir "%TEMP_COPY%"

echo Copying files (excluding unneeded ones)...
xcopy "%PROJECT_DIR%\*" "%TEMP_COPY%\" /E /I /H /Y /EXCLUDE:%~f0.excludes.txt

REM === Use PowerShell's Compress-Archive ===
echo Compressing to archive...
powershell -NoLogo -NoProfile -Command ^
    "Compress-Archive -Path '%TEMP_COPY%\*' -DestinationPath '%ARCHIVE_PATH%\%ARCHIVE_NAME%' -Force"

REM === Cleanup temp copy ===
rmdir /s /q "%TEMP_COPY%"

echo Done! Archive created: %ARCHIVE_PATH%\%ARCHIVE_NAME%"
pause
