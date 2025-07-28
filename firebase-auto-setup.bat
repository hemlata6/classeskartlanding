@echo off
echo ========================================
echo   CLASSKART FIREBASE HOSTING SETUP
echo ========================================
echo.
echo This script will help you deploy your ClassKart website to Firebase Hosting for FREE!
echo.
echo Prerequisites:
echo - Google account
echo - Internet connection
echo.
pause

echo.
echo Step 1: Installing Firebase CLI...
echo.
call npm install -g firebase-tools

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to install Firebase CLI
    echo Make sure you have internet connection and npm is working
    pause
    exit /b 1
)

echo.
echo ✅ Firebase CLI installed successfully!
echo.

echo Step 2: Logging into Firebase...
echo This will open your browser - please login with your Google account
echo.
pause
call firebase login

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Firebase login failed
    echo Please try again with a valid Google account
    pause
    exit /b 1
)

echo.
echo ✅ Successfully logged into Firebase!
echo.

echo Step 3: Building your React application...
echo.
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Build failed
    echo Please check for errors and try again
    pause
    exit /b 1
)

if not exist "build" (
    echo.
    echo ERROR: Build folder not found
    echo The build process may have failed
    pause
    exit /b 1
)

echo.
echo ✅ React app built successfully!
echo.

echo Step 4: Initializing Firebase project...
echo.
echo IMPORTANT: When prompted:
echo - Select "Hosting: Configure files for Firebase Hosting"
echo - Choose "Create a new project" or select existing project
echo - Set "build" as your public directory
echo - Choose "Yes" for single-page app
echo - Choose "No" for automatic builds with GitHub
echo.
pause

call firebase init

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Firebase initialization failed
    echo Please try running: firebase init manually
    pause
    exit /b 1
)

echo.
echo ✅ Firebase project initialized!
echo.

echo Step 5: Deploying to Firebase Hosting...
echo.
call firebase deploy

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Deployment failed
    echo Please check your internet connection and try again
    pause
    exit /b 1
)

echo.
echo ========================================
echo   🎉 DEPLOYMENT SUCCESSFUL! 🎉
echo ========================================
echo.
echo Your ClassKart website is now live on Firebase!
echo.
echo To get your website URL, run:
echo   firebase hosting:sites:list
echo.
echo To deploy updates in the future:
echo   1. npm run build
echo   2. firebase deploy
echo.
echo Firebase Features Available:
echo ✅ Free SSL Certificate (HTTPS)
echo ✅ Global CDN
echo ✅ Custom Domain Support
echo ✅ 10GB Storage / 1GB Transfer per month
echo ✅ Automatic Scaling
echo.
echo To manage your project:
echo Visit: https://console.firebase.google.com
echo.
pause
