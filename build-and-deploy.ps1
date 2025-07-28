# ClassKart React Build and Deployment Script
# This script builds the React application and creates a deployment package

Write-Host "Building ClassKart React Application..." -ForegroundColor Green
Write-Host ""

# Navigate to project directory
Set-Location "C:\Users\Classio\classkart-react"

# Build the project
Write-Host "Building production version..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if (Test-Path "build") {
    Write-Host ""
    Write-Host "Build successful! Creating deployment package..." -ForegroundColor Green
    
    # Create deployment folder
    if (!(Test-Path "deployment")) {
        New-Item -ItemType Directory -Name "deployment"
    }
    
    # Copy build files to deployment folder
    Copy-Item -Path "build\*" -Destination "deployment\" -Recurse -Force
    
    # Create .htaccess file for Apache servers
    $htaccess = @"
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
"@
    $htaccess | Out-File -FilePath "deployment\.htaccess" -Encoding UTF8
    
    # Create web.config for IIS servers
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
    
    # Create nginx configuration instructions
    $nginxConfig = @"
# Nginx Configuration for ClassKart React App
# Add this to your nginx server block:

location / {
    try_files `$uri `$uri/ /index.html;
}

# Optional: Enable gzip compression
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
"@
    $nginxConfig | Out-File -FilePath "deployment\nginx-config.txt" -Encoding UTF8
    
    # Create deployment instructions
    $instructions = @"
CLASSKART REACT WEBSITE - DEPLOYMENT INSTRUCTIONS
================================================

Your website has been successfully built and packaged for deployment!

FILES CREATED:
- deployment/ folder contains all website files
- classkart-website-build.zip ready for server upload

DEPLOYMENT STEPS:
1. Upload classkart-website-build.zip to your web hosting server
2. Extract the ZIP file to your website's root directory (usually public_html, www, or htdocs)
3. Configure your server for Single Page Application (SPA) routing

SERVER CONFIGURATIONS:

APACHE:
- .htaccess file is already included
- Make sure mod_rewrite is enabled on your server

IIS (Windows Server):
- web.config file is already included
- Make sure URL Rewrite module is installed

NGINX:
- See nginx-config.txt for configuration details
- Add the configuration to your server block

CLOUDFLARE/CDN:
- Enable "Always Use HTTPS"
- Set up page rules for caching static assets
- Configure redirect rules if needed

TESTING YOUR DEPLOYMENT:
1. Visit your website URL
2. Try navigating to different pages
3. Refresh the page on any route to test SPA routing
4. Check that all images and assets load correctly

TROUBLESHOOTING:
- If you get 404 errors on page refresh, check your server configuration
- If CSS/JS files don't load, check file permissions
- If images don't display, verify the file paths

For technical support, contact your hosting provider or web developer.

Built on: $(Get-Date)
React Version: 18.2.0
Material-UI Version: 5.14.20
"@
    $instructions | Out-File -FilePath "deployment\DEPLOYMENT-INSTRUCTIONS.txt" -Encoding UTF8
    
    # Create the ZIP file
    Write-Host "Creating ZIP file for deployment..." -ForegroundColor Yellow
    Compress-Archive -Path "deployment\*" -DestinationPath "classkart-website-build.zip" -Force
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "BUILD AND PACKAGING COMPLETE!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your website is ready for deployment!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Files created:" -ForegroundColor Yellow
    Write-Host "- deployment\ folder with all website files" -ForegroundColor White
    Write-Host "- classkart-website-build.zip ready for upload" -ForegroundColor White
    Write-Host "- Server configuration files included" -ForegroundColor White
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Upload classkart-website-build.zip to your server" -ForegroundColor White
    Write-Host "2. Extract the ZIP file to your web root directory" -ForegroundColor White
    Write-Host "3. Follow the instructions in DEPLOYMENT-INSTRUCTIONS.txt" -ForegroundColor White
    Write-Host ""
    
} else {
    Write-Host ""
    Write-Host "Build failed! Please check for errors above." -ForegroundColor Red
    Write-Host "Make sure all dependencies are installed with: npm install" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
