@echo off
echo ========================================
echo   FIREBASE QUICK SETUP FOR CLASSKART
echo ========================================
echo.

echo Step 1: Building React application...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo Build failed! Check errors above.
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.

echo Step 2: Firebase setup...
echo.
echo Please complete the Firebase setup manually with these exact responses:
echo.
echo ┌─────────────────────────────────────────┐
echo │  FIREBASE SETUP RESPONSES NEEDED:      │
echo ├─────────────────────────────────────────┤
echo │  Features: Select "Hosting" (Spacebar) │
echo │  Project: "Create new project"         │
echo │  Project ID: "classkart-2025"          │
echo │  Project Name: "ClassKart Education"   │
echo │  Public directory: "build"             │
echo │  Single-page app: "Yes"                │
echo │  GitHub deploys: "No"                  │
echo └─────────────────────────────────────────┘
echo.
pause

echo Opening Firebase init...
call firebase init

if %ERRORLEVEL% NEQ 0 (
    echo Firebase init failed!
    pause
    exit /b 1
)

echo.
echo Step 3: Deploying to Firebase...
call firebase deploy

if %ERRORLEVEL% NEQ 0 (
    echo Deployment failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   🎉 CLASSKART WEBSITE IS LIVE! 🎉
echo ========================================
echo.
echo Your website is now available at:
call firebase hosting:sites:list
echo.
echo To open your website:
echo   firebase open hosting:site
echo.
echo To deploy updates in the future:
echo   1. npm run build
echo   2. firebase deploy
echo.
pause
