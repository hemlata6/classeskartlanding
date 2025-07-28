@echo off
echo ========================================
echo    BUILDING CLASSKART WEBSITE
echo ========================================
echo.

rem Ensure we're in the right directory
cd /d "C:\Users\Classio\classkart-react"

echo Building React application...
call npm run build

if exist "build" (
    echo.
    echo ✅ BUILD SUCCESSFUL!
    echo.
    echo Creating deployment package...
    
    rem Clean previous deployment
    if exist "deployment" rmdir /s /q deployment
    mkdir deployment
    
    rem Copy build files
    xcopy "build\*" "deployment\" /E /Y /Q
    
    rem Create server config files
    echo RewriteEngine On > deployment\.htaccess
    echo RewriteCond %%{REQUEST_FILENAME} !-f >> deployment\.htaccess
    echo RewriteCond %%{REQUEST_FILENAME} !-d >> deployment\.htaccess
    echo RewriteRule . /index.html [L] >> deployment\.htaccess
    
    rem Create ZIP package
    echo Creating deployment ZIP...
    powershell -command "Compress-Archive -Path 'deployment\*' -DestinationPath 'classkart-website-build.zip' -Force"
    
    echo.
    echo ========================================
    echo   ✅ WEBSITE PACKAGE READY!
    echo ========================================
    echo.
    echo Files created:
    echo 📁 deployment\ - Website files
    echo 📦 classkart-website-build.zip - Upload package
    echo.
    echo DEPLOYMENT OPTIONS:
    echo.
    echo 🔥 FIREBASE (FREE):
    echo   1. Open NEW terminal
    echo   2. firebase init (select Hosting, public: build)
    echo   3. firebase deploy
    echo.
    echo 📦 ANY WEB HOST:
    echo   1. Upload classkart-website-build.zip
    echo   2. Extract to web root directory
    echo   3. Done!
    echo.
    echo 🌐 Your website URL will be live!
    echo.
    
) else (
    echo.
    echo ❌ Build failed!
    echo Make sure dependencies are installed: npm install
    echo.
)

pause
