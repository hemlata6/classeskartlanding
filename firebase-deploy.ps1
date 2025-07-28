# ClassKart React Website - Firebase Hosting
# Deployment automation scripts

# Build and Deploy to Firebase
Write-Host "🔄 Building and deploying ClassKart to Firebase..." -ForegroundColor Cyan

# Build the React app
Write-Host "Building React application..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

# Deploy to Firebase
Write-Host "Deploying to Firebase..." -ForegroundColor Yellow
firebase deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   🎉 DEPLOYMENT COMPLETE! 🎉" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your ClassKart website has been updated!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Yellow
Write-Host "  firebase open hosting:site  - Open your live website" -ForegroundColor White
Write-Host "  firebase hosting:sites:list - List your hosting URLs" -ForegroundColor White
Write-Host ""

Read-Host "Press Enter to finish"
