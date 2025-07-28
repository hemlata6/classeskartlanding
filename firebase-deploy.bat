@echo off
echo ========================================
echo   FIREBASE DEPLOYMENT SCRIPT
echo ========================================
echo.
echo This script will build and deploy your ClassKart website to Firebase.
echo.

echo Building React application...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Build failed! Please check for errors.
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.

echo Deploying to Firebase...
call firebase deploy

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Deployment failed! Please check your internet connection.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   🎉 DEPLOYMENT COMPLETE! 🎉
echo ========================================
echo.
echo Your website has been updated on Firebase!
echo.
echo Useful commands:
echo   firebase open hosting:site  - Open your live website
echo   firebase hosting:sites:list - List your hosting URLs
echo.
pause
