# Quick Deployment Steps (TL;DR)

## Backend (Render.com) - 5 Minutes

1. Go to https://render.com → Sign up with GitHub
2. New → Web Service
3. Select `someshBalani1301/ai-system-designer`
4. Settings:
   - Root: `ai-system-designer/server`
   - Start: `npm start`
   - Build: `npm install`
5. Environment Variables:
   ```
   NODE_ENV=production
   OPENROUTER_API_KEY=[YOUR_KEY]
   OPENAI_API_KEY=[YOUR_KEY]
   CORS_ORIGIN=[YOUR_FRONTEND_URL_LATER]
   ```
6. Deploy! Copy your backend URL

## Frontend (Vercel.com) - 5 Minutes

1. Go to https://vercel.com → Sign up with GitHub
2. New Project → Import `someshBalani1301/ai-system-designer`
3. Settings:
   - Root: `ai-system-designer/ai-system-designer`
   - Framework: Vite
4. Environment Variables:
   ```
   VITE_API_URL=[YOUR_BACKEND_URL_FROM_STEP_1]
   ```
5. Deploy! Copy your frontend URL

## Update Backend CORS

1. Render Dashboard → Environment Variables
2. Set `CORS_ORIGIN=[YOUR_FRONTEND_URL]`
3. Auto-redeploys

## Done! ✓

- Frontend: https://your-frontend.vercel.app
- Backend: https://your-backend.onrender.com

---

## Get API Keys (Free)

- **OpenRouter**: https://openrouter.ai (sign up, copy key)
- **OpenAI**: https://platform.openai.com (needs payment card, test $5 free)
