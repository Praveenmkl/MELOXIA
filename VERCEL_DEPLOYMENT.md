# Deploying Meloxia Studio to Vercel

This guide will walk you through deploying your full-stack Meloxia Studio application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **MongoDB Atlas**: For production database (free tier available at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))

## Project Structure

- **Frontend**: React + Vite application in `/frontend` directory
- **Backend**: Node.js/Express API in `/backend` directory

## Step-by-Step Deployment

### Part 1: Deploy Backend (API)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Go to Vercel Dashboard**:
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"

3. **Import Backend Repository**:
   - Select your GitHub repository
   - Click "Import"

4. **Configure Backend Project**:
   - **Framework Preset**: Other
   - **Root Directory**: Click "Edit" and select `backend`
   - **Build Command**: Leave empty or use `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Add Environment Variables** (click "Environment Variables"):
   ```
   MONGODB_URI = your_mongodb_atlas_connection_string
   JWT_SECRET = your_super_secret_jwt_key_minimum_32_characters
   NODE_ENV = production
   FRONTEND_URL = (leave empty for now, will add after frontend deployment)
   ```

6. **Deploy Backend**:
   - Click "Deploy"
   - Wait for deployment to complete
   - **Copy your backend URL** (e.g., `https://your-backend.vercel.app`)

### Part 2: Deploy Frontend

1. **Go to Vercel Dashboard**:
   - Click "Add New..." → "Project"

2. **Import Frontend Repository**:
   - Select the same GitHub repository
   - Click "Import"

3. **Configure Frontend Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: Click "Edit" and select `frontend`
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `dist` (should be auto-detected)
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   ```
   VITE_API_URL = https://your-backend.vercel.app/api
   ```
   *(Replace with your actual backend URL from Part 1)*

5. **Deploy Frontend**:
   - Click "Deploy"
   - Wait for deployment to complete
   - **Copy your frontend URL** (e.g., `https://your-frontend.vercel.app`)

### Part 3: Update Backend CORS

1. **Go to your Backend Project** in Vercel Dashboard
2. **Go to Settings** → **Environment Variables**
3. **Add/Update**:
   ```
   FRONTEND_URL = https://your-frontend.vercel.app
   ```
   *(Replace with your actual frontend URL from Part 2)*

4. **Redeploy Backend**:
   - Go to "Deployments" tab
   - Click "..." menu on the latest deployment
   - Click "Redeploy"

## MongoDB Atlas Setup

If you don't have MongoDB Atlas set up:

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `myFirstDatabase` with your database name (e.g., `meloxia`)

Example connection string:
```
mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/meloxia?retryWrites=true&w=majority
```

## Verifying Deployment

### Test Backend:
- Visit `https://your-backend.vercel.app`
- You should see: `{"message": "Meloxia Studio API Server is running"}`

### Test Frontend:
- Visit `https://your-frontend.vercel.app`
- Your website should load properly
- Test sign up/sign in functionality

## Troubleshooting

### CORS Errors:
- Ensure `FRONTEND_URL` is set correctly in backend environment variables
- Make sure backend is redeployed after adding the frontend URL

### API Connection Issues:
- Verify `VITE_API_URL` in frontend environment variables
- Check browser console for exact error messages
- Ensure the URL ends with `/api` (e.g., `https://your-backend.vercel.app/api`)

### Database Connection Issues:
- Verify MongoDB connection string is correct
- Ensure IP whitelist in MongoDB Atlas includes `0.0.0.0/0` (allow all) for Vercel
- Check if database user has correct permissions

### Environment Variables Not Working:
- Environment variables require redeployment to take effect
- For frontend, variables must start with `VITE_`
- Check spelling and make sure there are no extra spaces

## Continuous Deployment

Both projects are now set up for automatic deployment:
- Every push to your `main` branch will trigger a new deployment
- You can also deploy specific branches or enable preview deployments for PRs

## Custom Domain (Optional)

To add a custom domain:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed by Vercel
4. Update `FRONTEND_URL` in backend environment variables if using custom domain

## Important Notes

- **Keep your `.env` files local** - they are in `.gitignore` and should NOT be committed
- **Environment variables** are managed through Vercel dashboard
- **Free tier limitations**: Vercel free tier has serverless function execution limits
- **Cold starts**: Serverless functions may have a slight delay on first request after inactivity

## Support

If you encounter issues:
- Check Vercel deployment logs in the dashboard
- Review the Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Check MongoDB Atlas connection status

---

**Congratulations!** 🎉 Your Meloxia Studio application is now live on Vercel!
