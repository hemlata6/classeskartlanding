# Firebase Hosting - PowerShell Script for ClassKart
# This script provides a complete Firebase hosting setup

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   CLASSKART FIREBASE HOSTING SETUP" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔥 Setting up Firebase Hosting for your React website..." -ForegroundColor Yellow
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org" -ForegroundColor Yellow
    pause
    exit
}

# Check if npm is available
try {
    $npmVersion = npm --version
    Write-Host "✅ NPM version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ NPM not found. Please check your Node.js installation." -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "Step 1: Installing Firebase CLI..." -ForegroundColor Yellow
Write-Host ""

try {
    npm install -g firebase-tools
    Write-Host "✅ Firebase CLI installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install Firebase CLI" -ForegroundColor Red
    Write-Host "Please check your internet connection and try again." -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""
Write-Host "Step 2: Logging into Firebase..." -ForegroundColor Yellow
Write-Host "This will open your browser - please login with your Google account" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to continue"

try {
    firebase login
    Write-Host "✅ Successfully logged into Firebase!" -ForegroundColor Green
} catch {
    Write-Host "❌ Firebase login failed" -ForegroundColor Red
    Write-Host "Please try again with a valid Google account" -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""
Write-Host "Step 3: Building your React application..." -ForegroundColor Yellow
Write-Host ""

try {
    npm run build
    Write-Host "✅ React app built successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Build failed" -ForegroundColor Red
    Write-Host "Please check for errors and try again" -ForegroundColor Yellow
    pause
    exit
}

# Check if build folder exists
if (!(Test-Path "build")) {
    Write-Host "❌ Build folder not found" -ForegroundColor Red
    Write-Host "The build process may have failed" -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""
Write-Host "Step 4: Initializing Firebase project..." -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: When prompted, select:" -ForegroundColor Cyan
Write-Host "- ✅ Hosting: Configure files for Firebase Hosting" -ForegroundColor White
Write-Host "- 📁 Public directory: build" -ForegroundColor White
Write-Host "- 🔄 Single-page app: Yes" -ForegroundColor White
Write-Host "- 🚫 Automatic builds with GitHub: No" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to continue with Firebase initialization"

try {
    firebase init
    Write-Host "✅ Firebase project initialized!" -ForegroundColor Green
} catch {
    Write-Host "❌ Firebase initialization failed" -ForegroundColor Red
    Write-Host "Please try running 'firebase init' manually" -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""
Write-Host "Step 5: Deploying to Firebase Hosting..." -ForegroundColor Yellow
Write-Host ""

try {
    firebase deploy
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
} catch {
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    Write-Host "Please check your internet connection and try again" -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   🎉 DEPLOYMENT SUCCESSFUL! 🎉" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your ClassKart website is now live on Firebase! 🚀" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 To get your website URL:" -ForegroundColor Yellow
Write-Host "   firebase hosting:sites:list" -ForegroundColor White
Write-Host ""
Write-Host "🔄 To deploy updates in the future:" -ForegroundColor Yellow
Write-Host "   1. npm run build" -ForegroundColor White
Write-Host "   2. firebase deploy" -ForegroundColor White
Write-Host ""
Write-Host "🎁 Firebase Features Available:" -ForegroundColor Yellow
Write-Host "   ✅ Free SSL Certificate (HTTPS)" -ForegroundColor White
Write-Host "   ✅ Global CDN" -ForegroundColor White
Write-Host "   ✅ Custom Domain Support" -ForegroundColor White
Write-Host "   ✅ 10GB Storage / 1GB Transfer per month" -ForegroundColor White
Write-Host "   ✅ Automatic Scaling" -ForegroundColor White
Write-Host ""
Write-Host "🔧 To manage your project:" -ForegroundColor Yellow
Write-Host "   Visit: https://console.firebase.google.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Quick deployment script created: firebase-deploy.bat" -ForegroundColor Yellow
Write-Host ""

Read-Host "Press Enter to finish"
