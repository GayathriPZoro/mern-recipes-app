# Vercel Deployment Fixes Applied

## Issues Fixed

### 1. ✅ Node Version Specification
- **Problem**: No Node version specified, causing deployment failures
- **Fix**: Added `.nvmrc` file with Node 18
- **Fix**: Added `engines` field in all package.json files specifying Node >= 18.x

### 2. ✅ Monorepo Configuration
- **Problem**: Vercel didn't know how to handle the monorepo structure
- **Fix**: Created root `package.json` with proper scripts
- **Fix**: Updated `vercel.json` with correct build and route configuration

### 3. ✅ Serverless Function Setup
- **Problem**: Server wasn't configured for Vercel's serverless environment
- **Fix**: Modified `server/index.js` to export the Express app
- **Fix**: Created `api/index.js` as Vercel serverless function wrapper
- **Fix**: Updated server to not start listening in production mode

### 4. ✅ CORS Configuration
- **Problem**: CORS not properly configured for production
- **Fix**: Updated CORS settings to use CLIENT_URL environment variable
- **Fix**: Added credentials support

### 5. ✅ MongoDB Connection
- **Problem**: MongoDB connection handling not optimal for serverless
- **Fix**: Added conditional connection with proper error handling
- **Fix**: Moved dotenv to dependencies (was in devDependencies)

### 6. ✅ Build Configuration
- **Problem**: Client build configuration missing
- **Fix**: Added `client/vercel.json` with proper build settings
- **Fix**: Updated root `vercel.json` with correct paths and routes

## Files Created/Modified

### New Files:
- `package.json` (root)
- `.nvmrc`
- `vercel.json` (root - replaced)
- `api/index.js`
- `client/vercel.json`
- `DEPLOYMENT.md`
- `VERCEL_FIX.md` (this file)

### Modified Files:
- `server/index.js` - Updated for serverless
- `server/package.json` - Added engines, moved dotenv
- `client/package.json` - Added engines

## Next Steps for Deployment

1. **Push to GitHub**:
   ```bash
   cd /Users/gayathri.polubothu/mern-recipes-app
   git add .
   git commit -m "fix: Configure for Vercel deployment with Node 18"
   git push origin main
   ```

2. **Configure Vercel**:
   - Go to https://vercel.com/dashboard
   - Import your GitHub repository
   - Add environment variables:
     - `MONGODB_URL`
     - `PRIVATE_SECRET_KEY`
     - `CLIENT_URL` (your Vercel app URL)
     - `NODE_ENV=production`

3. **Deploy**:
   - Vercel will auto-deploy on push
   - Or click "Deploy" in Vercel dashboard

## Environment Variables Required

```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/recipes-app
PRIVATE_SECRET_KEY=your_secret_jwt_key
CLIENT_URL=https://your-app-name.vercel.app
NODE_ENV=production
```

## Testing After Deployment

1. Check health endpoint: `https://your-app.vercel.app/health`
2. Test auth routes: `https://your-app.vercel.app/auth/*`
3. Test recipe routes: `https://your-app.vercel.app/recipes/*`
4. Check browser console for any client-side errors
5. Verify MongoDB connections in Atlas dashboard

## Common Issues & Solutions

### Issue: "Cannot find module"
**Solution**: Make sure to commit node_modules folders to .gitignore and let Vercel install dependencies

### Issue: MongoDB connection timeout
**Solution**: Add `0.0.0.0/0` to MongoDB Atlas IP whitelist

### Issue: 500 Internal Server Error
**Solution**: Check Vercel function logs for detailed error messages

### Issue: Client app loads but API calls fail
**Solution**: Update client's API base URL to match your Vercel deployment URL

## Verification Checklist

- [ ] All files committed to GitHub
- [ ] Environment variables added in Vercel
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Vercel deployment successful
- [ ] Health check endpoint responding
- [ ] Can register new user
- [ ] Can login
- [ ] Can create/view recipes
- [ ] All features working as expected

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Node.js Runtime](https://vercel.com/docs/runtimes#official-runtimes/node-js)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

