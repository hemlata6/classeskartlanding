# 🔥 Firebase Hosting Setup for ClassKart React Website

## Prerequisites
- Google account
- Node.js installed (already done)
- Your React project built and ready

## Step 1: Install Firebase CLI

Open Command Prompt or PowerShell and run:
```bash
npm install -g firebase-tools
```

## Step 2: Login to Firebase

```bash
firebase login
```
This will open your browser - login with your Google account.

## Step 3: Initialize Firebase in Your Project

Navigate to your project directory:
```bash
cd "C:\Users\Classio\classkart-react"
```

Initialize Firebase:
```bash
firebase init
```

During initialization, select:
- ✅ **Hosting: Configure files for Firebase Hosting**
- Choose **"Create a new project"** or select existing project
- Set **"build"** as your public directory
- Choose **"Yes"** for single-page app (rewrites all URLs to /index.html)
- Choose **"No"** for automatic builds with GitHub

## Step 4: Build Your React App

```bash
npm run build
```

## Step 5: Deploy to Firebase

```bash
firebase deploy
```

## Step 6: Your Website is Live! 🎉

Firebase will provide you with:
- **Hosting URL**: https://your-project-id.web.app
- **Custom Domain**: https://your-project-id.firebaseapp.com

## Firebase Free Tier Limits

✅ **10 GB Storage**
✅ **1 GB/month Transfer** 
✅ **Custom Domain Support**
✅ **SSL Certificate (HTTPS)**
✅ **Global CDN**
✅ **Unlimited Projects**

Perfect for most websites!

## Automatic Deployment Script

See `firebase-deploy.bat` for automated deployment.

## Custom Domain Setup

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow DNS configuration steps
4. SSL certificate auto-generated

## Performance Optimizations Included

- Gzip compression enabled
- Cache headers configured
- CDN distribution worldwide
- Automatic HTTPS redirect

---

**Next Steps:**
1. Run the automated script: `firebase-auto-setup.bat`
2. Follow the prompts
3. Your website will be live in minutes!

For detailed steps, see the individual script files created.
