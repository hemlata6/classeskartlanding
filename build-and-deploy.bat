@echo off
echo Building ClassKart React Application...
echo.

rem Navigate to project directory
cd /d "C:\Users\Classio\classkart-react"

rem Build the project
echo Building production version...
call npm run build

rem Check if build was successful
if exist "build" (
    echo.
    echo Build successful! Creating deployment package...
    
    rem Create deployment folder
    if not exist "deployment" mkdir deployment
    
    rem Copy build files to deployment folder
    xcopy "build\*" "deployment\" /E /Y
    
    rem Create a simple .htaccess file for Apache servers
    echo RewriteEngine On > deployment\.htaccess
    echo RewriteCond %%{REQUEST_FILENAME} !-f >> deployment\.htaccess
    echo RewriteCond %%{REQUEST_FILENAME} !-d >> deployment\.htaccess
    echo RewriteRule . /index.html [L] >> deployment\.htaccess
    
    rem Create web.config for IIS servers
    echo ^<?xml version="1.0" encoding="UTF-8"?^> > deployment\web.config
    echo ^<configuration^> >> deployment\web.config
    echo   ^<system.webServer^> >> deployment\web.config
    echo     ^<rewrite^> >> deployment\web.config
    echo       ^<rules^> >> deployment\web.config
    echo         ^<rule name="React Routes" stopProcessing="true"^> >> deployment\web.config
    echo           ^<match url=".*" /^> >> deployment\web.config
    echo           ^<conditions logicalGrouping="MatchAll"^> >> deployment\web.config
    echo             ^<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" /^> >> deployment\web.config
    echo             ^<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" /^> >> deployment\web.config
    echo           ^</conditions^> >> deployment\web.config
    echo           ^<action type="Rewrite" url="/index.html" /^> >> deployment\web.config
    echo         ^</rule^> >> deployment\web.config
    echo       ^</rules^> >> deployment\web.config
    echo     ^</rewrite^> >> deployment\web.config
    echo   ^</system.webServer^> >> deployment\web.config
    echo ^</configuration^> >> deployment\web.config
    
    rem Create zip file using PowerShell
    echo Creating ZIP file for deployment...
    powershell -command "Compress-Archive -Path 'deployment\*' -DestinationPath 'classkart-website-build.zip' -Force"
    
    echo.
    echo ========================================
    echo BUILD AND PACKAGING COMPLETE!
    echo ========================================
    echo.
    echo Your website is ready for deployment!
    echo.
    echo Files created:
    echo - deployment\ folder with all website files
    echo - classkart-website-build.zip ready for upload
    echo.
    echo Deployment Instructions:
    echo 1. Upload classkart-website-build.zip to your server
    echo 2. Extract the ZIP file to your web root directory
    echo 3. Make sure your server supports HTML5 routing
    echo.
    echo For Apache: .htaccess file included
    echo For IIS: web.config file included
    echo For Nginx: Add try_files configuration
    echo.
    pause
) else (
    echo.
    echo Build failed! Please check for errors above.
    echo Make sure all dependencies are installed with: npm install
    echo.
    pause
)
