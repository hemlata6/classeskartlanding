# Simple Build Script for ClassKart React Website
# This creates a ZIP package ready for any hosting service

Write-Host "========================================" -ForegroundColor Green
Write-Host "   CLASSKART BUILD FOR HOSTING" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Set location
Set-Location "C:\Users\Classio\classkart-react"

Write-Host "Building React application..." -ForegroundColor Yellow

# Build the project
npm run build

if (Test-Path "build") {
    Write-Host ""
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Creating deployment package..." -ForegroundColor Yellow
    
    # Clean previous deployment
    if (Test-Path "deployment") {
        Remove-Item -Recurse -Force "deployment"
    }
    New-Item -ItemType Directory -Name "deployment"
    
    # Copy build files
    Copy-Item -Path "build\*" -Destination "deployment\" -Recurse -Force
    
    # Create .htaccess for Apache
    $htaccess = @"
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
"@
    $htaccess | Out-File -FilePath "deployment\.htaccess" -Encoding UTF8
    
    # Create web.config for IIS
    $webconfig = @"
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
"@
    $webconfig | Out-File -FilePath "deployment\web.config" -Encoding UTF8
    
    # Create README for hosting
    $readme = @"
CLASSKART REACT WEBSITE - HOSTING INSTRUCTIONS
=============================================

🎉 Your professional education platform is ready!

QUICK DEPLOYMENT:
1. Upload all files to your web root directory (public_html, www, htdocs)
2. Make sure your hosting supports HTML5 routing
3. Done! Your website is live!

FEATURES INCLUDED:
✅ React 18 application
✅ Material-UI components
✅ Glassmorphism effects  
✅ Mobile responsive design
✅ Contact forms
✅ Video gallery
✅ Course sections
✅ Loading animations
✅ Mobile sticky menu
✅ SEO optimized

SERVER CONFIGURATIONS:
- .htaccess (Apache) - INCLUDED
- web.config (IIS) - INCLUDED
- For Nginx: Add try_files \$uri \$uri/ /index.html;

COMPATIBLE WITH:
✅ Shared hosting (cPanel, Plesk)
✅ VPS/Dedicated servers
✅ Free hosting services
✅ Cloudflare Pages
✅ Surge.sh
✅ Neocities
✅ 000webhost
✅ InfinityFree

Your ClassKart educational platform is ready to serve students!
"@
    $readme | Out-File -FilePath "deployment\README.txt" -Encoding UTF8
    
    # Create ZIP file
    Write-Host "Creating ZIP package..." -ForegroundColor Yellow
    if (Test-Path "classkart-website-build.zip") {
        Remove-Item "classkart-website-build.zip" -Force
    }
    Compress-Archive -Path "deployment\*" -DestinationPath "classkart-website-build.zip" -Force
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   ✅ PACKAGE READY FOR HOSTING!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📦 File created: classkart-website-build.zip" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📁 Size: " -NoNewline -ForegroundColor Yellow
    $size = (Get-Item "classkart-website-build.zip").Length / 1MB
    Write-Host "$([math]::Round($size, 2)) MB" -ForegroundColor White
    Write-Host ""
    Write-Host "🚀 READY TO UPLOAD TO ANY HOSTING SERVICE!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Popular free hosting options:" -ForegroundColor Yellow
    Write-Host "- Surge.sh (surge.sh)" -ForegroundColor White
    Write-Host "- Netlify (netlify.com)" -ForegroundColor White  
    Write-Host "- Vercel (vercel.com)" -ForegroundColor White
    Write-Host "- GitHub Pages" -ForegroundColor White
    Write-Host "- InfinityFree (infinityfree.net)" -ForegroundColor White
    Write-Host "- 000webhost (000webhost.com)" -ForegroundColor White
    Write-Host ""
    Write-Host "🎯 Just upload and extract the ZIP file!" -ForegroundColor Cyan
    Write-Host ""
    
} else {
    Write-Host ""
    Write-Host "❌ Build failed!" -ForegroundColor Red
    Write-Host "Make sure dependencies are installed: npm install" -ForegroundColor Yellow
    Write-Host ""
}

Read-Host "Press Enter to finish"
