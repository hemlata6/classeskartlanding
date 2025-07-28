@echo off
cls
echo ========================================
echo    CLASSKART HOSTING PACKAGE CREATOR
echo ========================================
echo.
echo Creating ZIP package for easy hosting...
echo.

rem Make sure we're in the right directory
cd /d "C:\Users\Classio\classkart-react"

rem Build the project
echo Step 1: Building React application...
call npm run build

if not exist "build" (
    echo.
    echo ❌ Build failed! 
    echo Make sure to run: npm install
    echo Then try again.
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.

echo Step 2: Creating deployment package...

rem Clean and create deployment folder
if exist "deployment" rmdir /s /q deployment
mkdir deployment

rem Copy all build files
echo Copying website files...
xcopy "build\*" "deployment\" /E /Y /Q

rem Create .htaccess for Apache servers
echo Creating server configuration files...
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

rem Create hosting instructions
echo CLASSKART REACT WEBSITE - HOSTING INSTRUCTIONS > deployment\HOSTING-INSTRUCTIONS.txt
echo ============================================== >> deployment\HOSTING-INSTRUCTIONS.txt
echo. >> deployment\HOSTING-INSTRUCTIONS.txt
echo Your professional education platform is ready! >> deployment\HOSTING-INSTRUCTIONS.txt
echo. >> deployment\HOSTING-INSTRUCTIONS.txt
echo QUICK DEPLOYMENT: >> deployment\HOSTING-INSTRUCTIONS.txt
echo 1. Upload all files to your web root directory >> deployment\HOSTING-INSTRUCTIONS.txt
echo 2. Make sure hosting supports HTML5 routing >> deployment\HOSTING-INSTRUCTIONS.txt
echo 3. Done! Your website is live! >> deployment\HOSTING-INSTRUCTIONS.txt
echo. >> deployment\HOSTING-INSTRUCTIONS.txt
echo FEATURES INCLUDED: >> deployment\HOSTING-INSTRUCTIONS.txt
echo - React 18 application >> deployment\HOSTING-INSTRUCTIONS.txt
echo - Material-UI components >> deployment\HOSTING-INSTRUCTIONS.txt
echo - Glassmorphism effects >> deployment\HOSTING-INSTRUCTIONS.txt
echo - Mobile responsive design >> deployment\HOSTING-INSTRUCTIONS.txt
echo - Contact forms with validation >> deployment\HOSTING-INSTRUCTIONS.txt
echo - Video gallery integration >> deployment\HOSTING-INSTRUCTIONS.txt
echo - Course sections and categories >> deployment\HOSTING-INSTRUCTIONS.txt
echo - Loading animations >> deployment\HOSTING-INSTRUCTIONS.txt
echo - Mobile sticky menu >> deployment\HOSTING-INSTRUCTIONS.txt
echo - SEO optimized >> deployment\HOSTING-INSTRUCTIONS.txt
echo. >> deployment\HOSTING-INSTRUCTIONS.txt
echo FREE HOSTING OPTIONS: >> deployment\HOSTING-INSTRUCTIONS.txt
echo - Surge.sh >> deployment\HOSTING-INSTRUCTIONS.txt
echo - Netlify.com >> deployment\HOSTING-INSTRUCTIONS.txt
echo - Vercel.com >> deployment\HOSTING-INSTRUCTIONS.txt
echo - InfinityFree.net >> deployment\HOSTING-INSTRUCTIONS.txt
echo - 000webhost.com >> deployment\HOSTING-INSTRUCTIONS.txt

rem Create ZIP package
echo Step 3: Creating ZIP package...
powershell -command "if (Test-Path 'classkart-website-build.zip') { Remove-Item 'classkart-website-build.zip' -Force }; Compress-Archive -Path 'deployment\*' -DestinationPath 'classkart-website-build.zip' -Force"

if exist "classkart-website-build.zip" (
    echo.
    echo ========================================
    echo   ✅ HOSTING PACKAGE READY!
    echo ========================================
    echo.
    echo 📦 File created: classkart-website-build.zip
    echo.
    echo 🚀 READY TO UPLOAD TO ANY HOSTING SERVICE!
    echo.
    echo Popular free hosting options:
    echo - Surge.sh (surge.sh)
    echo - Netlify (netlify.com)
    echo - Vercel (vercel.com)  
    echo - GitHub Pages
    echo - InfinityFree (infinityfree.net)
    echo - 000webhost (000webhost.com)
    echo.
    echo 🎯 Just upload and extract the ZIP file!
    echo.
    echo Your ClassKart educational platform includes:
    echo ✅ Professional design with glassmorphism
    echo ✅ Mobile responsive layout
    echo ✅ Contact forms and enquiry popup
    echo ✅ Course categories (CA, CS, CMA)
    echo ✅ Video gallery integration
    echo ✅ Mobile sticky menu
    echo ✅ Loading animations
    echo ✅ SEO optimization
    echo.
) else (
    echo.
    echo ❌ Failed to create ZIP file!
    echo Please check if PowerShell is available.
    echo.
)

pause
