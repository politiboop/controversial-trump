# Deployment Guide - Trump Controversies Tracker

This guide covers how to deploy your website to the internet for free!

---

## 🚀 Recommended: GitHub Pages (EASIEST)

Your site is **already configured** for GitHub Pages! Just follow these steps:

### Prerequisites
- [x] GitHub repository exists at `github.com/politiboop/controversial-trump`
- [x] Site is configured in `docusaurus.config.js`
- [ ] Repository needs to be public (or you need GitHub Pro for private repo hosting)

### Deployment Steps

#### Option 1: Using Docusaurus Deploy Command (Recommended)

1. **Commit your current changes:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   cd website
   npm run build
   GIT_USER=<your-github-username> npm run deploy
   ```

   Example:
   ```bash
   GIT_USER=politiboop npm run deploy
   ```

3. **What this does:**
   - Builds your site
   - Creates/updates `gh-pages` branch
   - Pushes built site to GitHub Pages
   - Your site will be live at: `https://politiboop.github.io/controversial-trump/`

4. **Enable GitHub Pages (first time only):**
   - Go to your repo: https://github.com/politiboop/controversial-trump
   - Click **Settings** → **Pages**
   - Under "Source", select `gh-pages` branch
   - Click **Save**
   - Site will be live in 1-2 minutes!

#### Option 2: Using GitHub Actions (Automatic Deployments)

Set up automatic deployments whenever you push to main:

1. **Create `.github/workflows/deploy.yml`:**
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches:
         - main
     workflow_dispatch:

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: 18

         - name: Install dependencies
           run: cd website && npm ci

         - name: Build website
           run: cd website && npm run build

         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./website/build
   ```

2. **Commit and push:**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add automatic deployment workflow"
   git push origin main
   ```

3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Select `gh-pages` branch
   - Every push to `main` will now auto-deploy!

### ✅ Result
- **URL:** https://politiboop.github.io/controversial-trump/
- **Free forever**
- **Automatic HTTPS**
- **CDN included**

---

## 🌟 Alternative Option 1: Vercel (EASIEST + FASTEST)

Vercel is even easier and has better performance than GitHub Pages.

### Steps:

1. **Go to [vercel.com](https://vercel.com)**

2. **Sign up with GitHub** (free)

3. **Click "Import Project"**

4. **Select your `politiboop/controversial-trump` repository**

5. **Configure build settings:**
   - **Framework Preset:** Docusaurus 2
   - **Root Directory:** `website`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

6. **Click "Deploy"**

7. **Done!** Your site will be live at:
   - `https://controversial-trump.vercel.app`
   - Or custom domain if you add one

### ✅ Benefits:
- Automatic deployments on every git push
- Preview deployments for pull requests
- Better performance than GitHub Pages
- Automatic HTTPS and CDN
- Free forever for hobby projects

---

## 🔷 Alternative Option 2: Netlify

Very similar to Vercel, also excellent and free.

### Steps:

1. **Go to [netlify.com](https://netlify.com)**

2. **Sign up with GitHub** (free)

3. **Click "Add new site" → "Import an existing project"**

4. **Select your GitHub repo**

5. **Configure build settings:**
   - **Base directory:** `website`
   - **Build command:** `npm run build`
   - **Publish directory:** `website/build`

6. **Click "Deploy"**

7. **Done!** Your site will be at:
   - `https://controversial-trump.netlify.app`
   - Or custom domain

### ✅ Benefits:
- Automatic deployments
- Preview deployments
- Great performance
- Free tier is generous
- Easy custom domains

---

## ⚡ Alternative Option 3: Cloudflare Pages

Great performance with Cloudflare's global CDN.

### Steps:

1. **Go to [pages.cloudflare.com](https://pages.cloudflare.com)**

2. **Sign up** (free)

3. **Connect to GitHub**

4. **Select repository**

5. **Build settings:**
   - **Framework preset:** Docusaurus
   - **Root directory:** `website`
   - **Build command:** `npm run build`
   - **Build output directory:** `build`

6. **Deploy**

7. **Live at:** `https://controversial-trump.pages.dev`

---

## 📋 Comparison

| Feature | GitHub Pages | Vercel | Netlify | Cloudflare |
|---------|-------------|---------|---------|------------|
| **Cost** | Free | Free | Free | Free |
| **Setup Difficulty** | Medium | Easy | Easy | Easy |
| **Auto Deploy** | ⚠️ Manual* | ✅ Yes | ✅ Yes | ✅ Yes |
| **Preview Deploys** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **Custom Domain** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **HTTPS** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Performance** | Good | Excellent | Excellent | Excellent |
| **CDN** | GitHub's | Global | Global | Cloudflare |

*Auto deploy with GitHub Actions

---

## 🎯 My Recommendation

**For simplest setup:** Use **Vercel** or **Netlify**
- Literally 3 clicks to deploy
- Automatic deployments forever
- Great performance
- Preview deployments for testing

**If you prefer GitHub ecosystem:** Use **GitHub Pages**
- Already configured in your project
- Everything stays in GitHub
- Simple once set up

**For best performance:** Use **Cloudflare Pages**
- Fastest global CDN
- Great for high traffic

---

## 🔧 Before You Deploy

### 1. Update package.json build script (if needed)

Your `website/package.json` should have:
```json
{
  "scripts": {
    "build": "docusaurus build",
    "deploy": "docusaurus deploy"
  }
}
```

### 2. Test the build locally

```bash
cd website
npm run build
npm run serve
```

Visit http://localhost:3000/controversial-trump/ to verify everything works.

### 3. Commit all changes

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 4. Make sure data is synced

The `prestart` and `prebuild` scripts will automatically run `sync-data.js`, so your data will be synced automatically!

---

## 🌐 Custom Domain (Optional)

All hosting platforms support custom domains for free!

### If you have a domain:

1. **Buy a domain** (if you don't have one):
   - Namecheap, Google Domains, Cloudflare Registrar
   - Example: `trumpcontroversy.com` or similar

2. **Configure DNS:**

   **For Vercel/Netlify/Cloudflare:**
   - Add domain in hosting dashboard
   - Update DNS records (they'll tell you how)
   - HTTPS automatically configured

   **For GitHub Pages:**
   - Add `CNAME` file in `website/static/` with your domain
   - Update DNS to point to `politiboop.github.io`
   - Enable HTTPS in GitHub settings

---

## 🚨 Important Notes

### Data Privacy
- All code and data will be publicly visible (it's a static site)
- Make sure you're comfortable with all controversy data being public
- Source URLs and content will be visible to anyone

### Repository Visibility
- For **GitHub Pages free hosting**, repo must be **public**
- For Vercel/Netlify/Cloudflare, repo can be private

### Build Time
- First build: ~2-3 minutes
- Subsequent builds: ~1 minute
- Site updates appear in 30-60 seconds

### Costs
- **Hosting:** $0 (free forever on all platforms)
- **Custom domain:** ~$10-15/year (optional)
- **Bandwidth:** Unlimited on all free tiers
- **Storage:** More than enough for this site

---

## 📝 Post-Deployment Checklist

After deploying:

- [ ] Visit your live site and test navigation
- [ ] Check all categories load correctly
- [ ] Test controversy detail modals
- [ ] Verify timeline pages work
- [ ] Check on mobile device
- [ ] Test social sharing (if you add Open Graph tags later)
- [ ] Share the link!

---

## 🆘 Troubleshooting

### Build fails with "Module not found"
- Make sure `sync-data.js` runs before build
- Check that `prebuild` script exists in package.json

### 404 on routes
- GitHub Pages: Make sure `baseUrl: '/controversial-trump/'` is in config
- Vercel/Netlify: Should work automatically

### Site not updating
- Clear browser cache (Ctrl+Shift+R)
- Check deployment status in hosting dashboard
- Wait 1-2 minutes for CDN to update

### Images not loading
- Check paths are correct in components
- Make sure favicon.ico exists in `website/static/img/`

---

## 🎉 Ready to Deploy?

Pick your hosting platform and follow the steps above!

**Quickest path:**
1. Sign up for [Vercel](https://vercel.com)
2. Import your GitHub repo
3. Set root directory to `website`
4. Click Deploy
5. Share your link!

Your controversies tracker will be live in ~2 minutes! 🚀
