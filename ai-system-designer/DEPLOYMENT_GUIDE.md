# Deployment Guide - AI System Designer

This guide provides step-by-step instructions to deploy both the frontend and backend to free hosting platforms.

## Architecture Overview

- **Frontend**: React + Vite → Vercel
- **Backend**: Node.js + Express → Render.com
- **Communication**: HTTPS REST API

---

## Part 1: Deploy Backend to Render.com (Free)

### Prerequisites
- GitHub account (already set up ✓)
- Render.com account (free)
- OpenRouter/OpenAI API keys

### Steps

#### 1. Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (easier for CI/CD)
3. Create a new account

#### 2. Create Web Service
1. Dashboard → New → Web Service
2. Select your GitHub repository: `someshBalani1301/ai-system-designer`
3. Configure:
   - **Name**: `ai-system-designer-backend`
   - **Root Directory**: `ai-system-designer/server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (note: service sleeps after 15 min of inactivity)

#### 3. Set Environment Variables
In Render Dashboard → your service → Environment:

```
NODE_ENV=production
PORT=5000
OPENROUTER_API_KEY=<your-api-key>
OPENAI_API_KEY=<your-api-key>
CORS_ORIGIN=https://ai-system-designer-frontend.vercel.app
REQUEST_TIMEOUT=30000
MAX_REQUEST_SIZE=1mb
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### 4. Deploy
- Click "Create Web Service"
- Render will automatically deploy when you push to GitHub
- Your backend URL will be: `https://<service-name>.onrender.com`

#### 5. Keep Service Active (Optional)
Free tier services sleep after 15 minutes. To keep it awake:
- https://render.com/docs/free#free-tier-limitations (check Uptime Robot alternative)
- Or upgrade to paid ($7/month)

---

## Part 2: Deploy Frontend to Vercel (Free)

### Prerequisites
- GitHub account (already set up ✓)
- Vercel account (free)
- Backend URL from Part 1

### Steps

#### 1. Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Create account

#### 2. Import Project
1. Dashboard → New Project → Import Git Repository
2. Select: `someshBalani1301/ai-system-designer`
3. Configure:
   - **Root Directory**: `ai-system-designer/ai-system-designer`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

#### 3. Set Environment Variables
In Vercel Dashboard → Project Settings → Environment Variables:

```
VITE_API_URL=https://<your-backend-service>.onrender.com
VITE_API_TIMEOUT=30000
```

Replace `<your-backend-service>` with your actual Render service name.

#### 4. Deploy
- Click "Deploy"
- Vercel will automatically deploy when you push to GitHub
- Your frontend URL will be: `https://ai-system-designer-frontend.vercel.app` (or custom domain)

---

## Part 3: Connect Frontend to Backend

### Update CORS in Backend
After deploying frontend, update the backend's CORS setting:

1. Get your Vercel frontend URL (e.g., https://ai-system-designer-frontend.vercel.app)
2. Go to Render Dashboard → Environment Variables
3. Update `CORS_ORIGIN` to your Vercel URL
4. Service auto-deploys (or redeploy manually)

### Verify Connection
1. Open your frontend URL
2. Try using the system designer
3. Check browser console (F12) for any CORS errors
4. Check Render logs if API calls fail

---

## Part 4: Get API Keys

### OpenRouter API Key
1. Go to https://openrouter.ai
2. Sign up (free tier available)
3. Dashboard → API Keys
4. Create new key
5. Copy and save securely

### OpenAI API Key (Alternative)
1. Go to https://platform.openai.com
2. Sign up and verify payment method
3. API Keys → Create new key
4. Copy and save securely

---

## Troubleshooting

### Backend Service Keeps Sleeping (Free Tier)
**Problem**: Service is slow or returns 503 errors
**Solution**: 
- Upgrade to paid ($7/month minimum)
- Or use Railway.app instead (better free tier)
- Or set up Uptime Robot to ping the service every 10 minutes (free)

### CORS Errors in Frontend
**Problem**: Browser blocks API requests
**Solution**:
1. Verify `CORS_ORIGIN` in backend matches frontend URL exactly
2. Check environment variables are properly set
3. Redeploy backend after changing CORS_ORIGIN

### Frontend Can't Reach Backend
**Problem**: 404 or network errors
**Solution**:
1. Check `VITE_API_URL` in frontend environment variables
2. Verify backend service is running (check Render logs)
3. Check if backend URL has `/api` prefix in requests
4. Temporarily test with `http://localhost:5000` locally

### API Key Invalid
**Problem**: 401 or 403 errors from OpenRouter/OpenAI
**Solution**:
1. Regenerate API key
2. Update in Render environment variables
3. Clear browser cache and retry

---

## Alternative Free Hosting Options

### Backend Alternatives
1. **Railway.app** - Better free tier (better than Render)
2. **Replit** - Good for Node.js (includes built-in storage)
3. **Fly.io** - Excellent free tier (3 shared-cpu-1x 256MB VMs)
4. **Heroku** - No longer free (was popular, now paid only)

### Frontend Alternatives
1. **Netlify** - Similar to Vercel, very good free tier
2. **GitHub Pages** - Only for static sites (doesn't support SPA routing well)
3. **Surge.sh** - Simple, free, but limited features

---

## Production Checklist

- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured in both services
- [ ] API keys securely stored (never in code)
- [ ] CORS properly configured
- [ ] Frontend can reach backend
- [ ] System designer works end-to-end
- [ ] Custom domain (optional)
- [ ] Monitor logs for errors
- [ ] Set up error tracking (optional)

---

## Monitor Your Deployments

### Render Backend
- Dashboard → Services → ai-system-designer-backend → Logs
- Check for errors and API calls

### Vercel Frontend
- Dashboard → Deployments → Select deployment → Logs
- Check for build errors

---

## Next Steps

1. **Add Custom Domain**: Both Vercel and Render support custom domains
2. **Set up CI/CD Monitoring**: GitHub Actions for automated tests
3. **Monitor Performance**: Use tools like Uptime Robot for monitoring
4. **Optimize**: Enable caching, CDN optimization
5. **Scale**: When ready, upgrade to paid plans

---

**Deployment Date**: April 6, 2026  
**Last Updated**: April 6, 2026
