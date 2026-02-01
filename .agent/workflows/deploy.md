---
description: Deploy SmartCampus to Vercel
---

# Deploy to Vercel

This workflow guides you through deploying the SmartCampus application to Vercel.

## Prerequisites

1. **GitHub Repository**: Ensure your code is pushed to a GitHub repository
2. **Vercel Account**: Create a free account at https://vercel.com
3. **Supabase Credentials**: Have your Supabase URL and anon key ready (found in `.env.local`)

## Deployment Options

### Option 1: Deploy via Vercel CLI (Fastest)

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from the project root:
// turbo
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (first time) or **Y** (subsequent deploys)
   - What's your project's name? **smartcampus** (or your preferred name)
   - In which directory is your code located? **./** (press Enter)
   - Want to override the settings? **N**

5. Add environment variables:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```
   - When prompted, paste the values from your `.env.local` file
   - Select **Production**, **Preview**, and **Development** for each

6. Redeploy with environment variables:
// turbo
```bash
vercel --prod
```

### Option 2: Deploy via GitHub Integration (Recommended for Production)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. Go to https://vercel.com/new

3. **Import Git Repository**:
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"

4. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: **./** (leave as is)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

5. **Add Environment Variables**:
   Click "Environment Variables" and add:
   - `NEXT_PUBLIC_SUPABASE_URL` = (paste from .env.local)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (paste from .env.local)

6. Click **Deploy**

7. Wait for deployment to complete (~2-3 minutes)

### Option 3: Deploy via Vercel Dashboard (Manual Import)

1. Go to https://vercel.com/dashboard

2. Click **"Add New..." → "Project"**

3. **Import Project**:
   - Choose "Import Git Repository"
   - Authorize Vercel to access your GitHub
   - Select your repository

4. Follow steps 4-7 from Option 2 above

## Post-Deployment Steps

1. **Get your deployment URL**:
   - Vercel will provide a URL like: `https://smartcampus-xxxxx.vercel.app`
   - You can also find it in your Vercel dashboard

2. **Update Supabase Redirect URLs**:
   - Go to https://app.supabase.com/project/_/auth/url-configuration
   - Add your Vercel URL to **Redirect URLs**:
     - `https://your-app.vercel.app/auth/callback`
     - `https://your-app.vercel.app/**` (wildcard for all routes)
   - Add to **Site URL**: `https://your-app.vercel.app`

3. **Test the deployment**:
   - Visit your Vercel URL
   - Test the login flow
   - Verify faculty and student portals work
   - Check that the 3D background renders correctly

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Run `npm run build` locally to reproduce the error
- Verify all dependencies are in `package.json`

### Environment Variables Not Working
- Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding environment variables
- Check Vercel dashboard → Settings → Environment Variables

### Authentication Issues
- Verify Supabase redirect URLs include your Vercel domain
- Check that environment variables are correctly set
- Review Supabase logs for authentication errors

### Database Connection Issues
- Verify Supabase URL and anon key are correct
- Check Supabase project is active and not paused
- Review Network tab in browser DevTools for API errors

## Updating Your Deployment

### Automatic Updates (GitHub Integration)
Every push to your main branch will automatically trigger a new deployment.

### Manual Updates (CLI)
```bash
vercel --prod
```

### Preview Deployments
Every pull request gets its own preview URL automatically.

## Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Navigate to **Settings → Domains**
3. Add your custom domain
4. Update your DNS records as instructed
5. Update Supabase redirect URLs with your custom domain
