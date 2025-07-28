@echo off
cls
echo ========================================
echo      FIREBASE DEPLOYMENT - CLASSKART
echo ========================================
echo.
echo Current terminal session has input conflicts.
echo Let's start fresh for Firebase deployment.
echo.
echo STEP 1: Close this window
echo STEP 2: Open a NEW Command Prompt
echo STEP 3: Run these commands:
echo.
echo   cd "C:\Users\Classio\classkart-react"
echo   npm run build
echo   firebase init
echo.
echo STEP 4: When Firebase asks, select:
echo   - Features: Hosting (press Space, then Enter)
echo   - Project: Create new project
echo   - Project ID: ck-edu-2025
echo   - Project name: ClassKart Education
echo   - Public directory: build
echo   - Single-page app: Yes
echo   - GitHub deploy: No
echo.
echo STEP 5: Deploy:
echo   firebase deploy
echo.
echo ========================================
echo   ALTERNATIVE: USE ZIP PACKAGE
echo ========================================
echo.
echo If Firebase seems complex, just run:
echo   build-and-deploy.bat
echo.
echo This creates classkart-website-build.zip
echo Upload this to ANY web hosting service!
echo.
echo ========================================
echo.
echo Your website will have:
echo ✅ Professional design
echo ✅ Mobile responsive
echo ✅ Contact forms
echo ✅ WhatsApp integration
echo ✅ Course sections
echo ✅ Video gallery
echo ✅ Loading animations
echo ✅ SEO optimized
echo.
pause
