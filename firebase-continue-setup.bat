@echo off
echo ========================================
echo   FIREBASE SETUP - STEP BY STEP
echo ========================================
echo.
echo Firebase CLI is already installed!
echo Please complete authentication first if not done.
echo.

echo Step 1: Build the React application...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo Build failed! Please check for errors.
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.

echo Step 2: Initialize Firebase project...
echo.
echo IMPORTANT: When prompted, select:
echo - [x] Hosting: Configure files for Firebase Hosting
echo - Public directory: build
echo - Single-page app: Yes
echo - Automatic builds: No
echo.
pause

call firebase init

if %ERRORLEVEL% NEQ 0 (
    echo Firebase initialization failed!
    pause
    exit /b 1
)

echo.
echo Step 3: Deploy to Firebase...
call firebase deploy

if %ERRORLEVEL% NEQ 0 (
    echo Deployment failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   🎉 SUCCESS! WEBSITE IS LIVE! 🎉
echo ========================================
echo.
echo Your ClassKart website is now live on Firebase!
echo.
echo Get your website URL with:
echo   firebase hosting:sites:list
echo.
echo To open your website:
echo   firebase open hosting:site
echo.
pause
