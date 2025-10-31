# Deployment Guide for My Recipes App

## Vercel Deployment

### Prerequisites
1. Vercel account
2. MongoDB Atlas database
3. GitHub repository connected to Vercel

### Environment Variables

Add these environment variables in your Vercel project settings:

```
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/recipes-app?retryWrites=true&w=majority
PRIVATE_SECRET_KEY=your_jwt_secret_key_here
CLIENT_URL=https://your-app-name.vercel.app
NODE_ENV=production
```

### Deployment Steps

#### Option 1: Automatic Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Import the project in Vercel dashboard
3. Configure the following:
   - **Framework Preset**: Other
   - **Root Directory**: Leave as default (/)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/build`
   - **Install Command**: `npm install`
4. Add all environment variables in Vercel project settings
5. Deploy!

#### Option 2: Manual Deployment via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add MONGODB_URL
vercel env add PRIVATE_SECRET_KEY
vercel env add CLIENT_URL
vercel env add NODE_ENV

# Deploy to production
vercel --prod
```

### Important Notes

1. **Node Version**: The project uses Node.js 18.x (specified in `.nvmrc`)
2. **MongoDB Connection**: Make sure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) for Vercel's serverless functions
3. **CORS**: The server is configured to accept requests from the client URL
4. **Serverless Functions**: API routes are handled by Vercel serverless functions

### API Endpoints

After deployment, your API will be available at:
- `https://your-app.vercel.app/auth/*` - Authentication routes
- `https://your-app.vercel.app/recipes/*` - Recipe routes
- `https://your-app.vercel.app/health` - Health check

### Troubleshooting

#### Issue: "Module not found" errors
- Solution: Make sure all dependencies are in package.json and run `npm install`

#### Issue: MongoDB connection timeout
- Solution: Check MongoDB Atlas network access settings and add 0.0.0.0/0 to IP whitelist

#### Issue: 404 on API routes
- Solution: Verify vercel.json routes configuration and redeploy

#### Issue: Client can't connect to API
- Solution: Update REACT_APP_SERVER_BASE_URL in client to point to your Vercel deployment URL

### Local Development

```bash
# Install all dependencies
npm run install:all

# Start server (in one terminal)
cd server
npm start

# Start client (in another terminal)
cd client
npm start
```

### Monitoring

- Check Vercel deployment logs for errors
- Monitor function execution time and memory usage in Vercel dashboard
- Check MongoDB Atlas metrics for database performance

### Support

If you encounter issues, check:
1. Vercel deployment logs
2. Browser console for client-side errors
3. Network tab for API request failures
4. MongoDB Atlas logs for database connection issues

