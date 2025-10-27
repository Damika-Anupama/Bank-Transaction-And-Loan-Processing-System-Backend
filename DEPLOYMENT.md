# 🚀 Deployment Guide - Bank Transaction and Loan Processing System

This guide covers deploying the complete fullstack application using free cloud services.

## 📋 Deployment Architecture

```
Frontend (Angular)  → Vercel         (FREE Forever)
Backend (Node.js)   → Render.com     (FREE with limitations)
Database (MySQL)    → Aiven.io       (FREE Tier)
Keep-Alive Service  → UptimeRobot    (FREE)
```

---

## Step 1: Deploy MySQL Database on Aiven.io

### 1.1 Create Aiven Account

1. Visit https://aiven.io/
2. Click "Sign Up" and create account (GitHub login recommended)
3. Verify your email

### 1.2 Create MySQL Service

1. After login, click **"Create Service"**
2. Select **"MySQL"**
3. Choose plan: **"Startup"** (Free trial) or **"Hobbyist"** (if available)
4. Select region closest to you (e.g., `aws-us-east-1`)
5. Service name: `bank-mysql-db`
6. Click **"Create Service"**
7. Wait 3-5 minutes for provisioning

### 1.3 Get Connection Details

Once the service is running:

1. Go to your service **Overview** page
2. Note down these credentials:
   ```
   Host:     mysql-xxxxx.aivencloud.com
   Port:     XXXXX (e.g., 12345)
   User:     avnadmin
   Password: [auto-generated password]
   Database: defaultdb
   SSL:      Required
   ```

3. **Download CA Certificate:**
   - Scroll to "CA Certificate" section
   - Click "Download CA Certificate"
   - Save as `ca.pem` (optional, for local testing)

### 1.4 Import Database

#### Option A: Using MySQL Client

1. Install MySQL client locally (if not already):
   ```bash
   # Windows: Download from mysql.com
   # Mac: brew install mysql-client
   # Linux: sudo apt-get install mysql-client
   ```

2. Import the dump:
   ```bash
   mysql -h mysql-xxxxx.aivencloud.com \
         -P XXXXX \
         -u avnadmin \
         -p \
         --ssl-mode=REQUIRED \
         defaultdb < Backend/assets/Data/Dump20240216.sql
   ```

3. Enter the password when prompted

#### Option B: Using Aiven Console (Web UI)

1. In Aiven console, go to your MySQL service
2. Click "Query Editor" or "Database" tab
3. Copy/paste contents of `Dump20240216.sql`
4. Execute

### 1.5 Verify Import

```bash
mysql -h mysql-xxxxx.aivencloud.com -P XXXXX -u avnadmin -p --ssl-mode=REQUIRED defaultdb -e "SHOW TABLES;"
```

You should see 13 tables.

---

## Step 2: Deploy Backend to Render.com

### 2.1 Prepare Repository

1. Ensure your Backend code is pushed to GitHub
2. Make sure `.env` is in `.gitignore` (already done)
3. Push the `improvements` branch or merge to `main`

### 2.2 Create Render Account

1. Visit https://render.com/
2. Click "Get Started"
3. Sign up with GitHub (easiest)
4. Authorize Render to access your repositories

### 2.3 Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select the **Backend** repository
4. Configure:
   ```
   Name:               bank-backend-api
   Region:             Oregon (US West) or closest
   Branch:             improvements (or main)
   Root Directory:     Backend (if monorepo) or leave blank
   Environment:        Node
   Build Command:      npm install
   Start Command:      npm start
   Instance Type:      Free
   ```

### 2.4 Add Environment Variables

In the Render dashboard, go to **Environment** section and add:

```env
API_PORT=3000
JWT_SECRET=this-is-the-group7-secret-key
UV_THREADPOOL_SIZE=16

# Aiven MySQL Credentials
DB_HOST=mysql-xxxxx.aivencloud.com
DB_USER=avnadmin
DB_PASSWORD=[your-aiven-password]
DB_NAME=defaultdb
DB_PORT=[your-aiven-port]
DB_SSL=true

# Frontend URL (will update after Vercel deployment)
FRONTEND_URL=http://localhost:4200
```

**Important:** Replace the Aiven credentials with your actual values!

### 2.5 Deploy

1. Click **"Create Web Service"**
2. Render will automatically build and deploy
3. Wait for deployment (3-5 minutes)
4. Once deployed, note your backend URL: `https://bank-backend-api.onrender.com`

### 2.6 Test Backend

Visit: `https://bank-backend-api.onrender.com/`

You should see:
```json
{"message": "ok"}
```

**Note:** Free tier spins down after 15 minutes of inactivity. First request takes 30-60 seconds to wake up.

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Update Frontend Environment

Before deploying, update the API URL in Frontend:

1. Edit `Frontend/src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://bank-backend-api.onrender.com/api/v1/'
   };
   ```

2. Commit and push:
   ```bash
   cd Frontend
   git add src/environments/environment.prod.ts
   git commit -m "Update production API URL"
   git push origin improvements
   ```

### 3.2 Create Vercel Account

1. Visit https://vercel.com/
2. Click "Sign Up"
3. Sign up with GitHub (easiest)
4. Authorize Vercel

### 3.3 Deploy Frontend

#### Option A: Using Vercel Dashboard (Easiest)

1. Click **"Add New Project"**
2. Select your **Frontend** repository
3. Configure:
   ```
   Project Name:        bank-app-frontend
   Framework Preset:    Angular
   Root Directory:      Frontend (if monorepo) or ./
   Build Command:       ng build --configuration production
   Output Directory:    dist/Frontend (Angular 15+)
   Install Command:     npm install
   ```

4. Click **"Deploy"**
5. Wait for build (2-3 minutes)
6. Once deployed, note your URL: `https://bank-app-frontend.vercel.app`

#### Option B: Using Vercel CLI

```bash
cd Frontend
npm install -g vercel
vercel login
vercel --prod
```

Follow the prompts.

### 3.4 Update Backend CORS

Now that you have the Vercel URL, update the Backend environment variable:

1. Go to Render dashboard
2. Navigate to your Backend service
3. Go to **Environment** tab
4. Update `FRONTEND_URL`:
   ```env
   FRONTEND_URL=https://bank-app-frontend.vercel.app
   ```
5. Save changes (Render will auto-redeploy)

### 3.5 Test Frontend

Visit: `https://bank-app-frontend.vercel.app`

Try logging in with test credentials:
- Customer: damikaanupama@gmail.com / 1234
- Employee: nimalnimal@gmail.com / 4567
- Manager: jkesoni@alexa.com / Jewelle

---

## Step 4: Set Up Keep-Alive Service (Prevent Backend Sleep)

Render free tier spins down after 15 minutes. To keep it active for interviews:

### 4.1 Create UptimeRobot Account

1. Visit https://uptimerobot.com/
2. Sign up (free tier: 50 monitors)
3. Verify email

### 4.2 Add Monitor

1. Click **"Add New Monitor"**
2. Configure:
   ```
   Monitor Type:     HTTP(s)
   Friendly Name:    Bank Backend Keep-Alive
   URL:              https://bank-backend-api.onrender.com/
   Monitoring Interval: Every 5 minutes (free tier)
   ```

3. Click **"Create Monitor"**

**Result:** UptimeRobot will ping your backend every 5 minutes, keeping it awake during the day.

**Note:** Free tier still has some downtime, but greatly reduces cold starts.

---

## Step 5: Custom Domain (Optional)

### For Frontend (Vercel):
1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain (e.g., `bank-app.yourdomain.com`)
4. Follow DNS configuration instructions

### For Backend (Render):
1. Go to Render service settings
2. Click "Custom Domain"
3. Add your custom domain (e.g., `api.yourdomain.com`)
4. Configure DNS with provided values

---

## 📊 Deployment Checklist

### Backend Deployment
- [ ] Aiven MySQL service created and running
- [ ] Database dump imported successfully
- [ ] Render account created
- [ ] Backend repository connected
- [ ] Environment variables configured
- [ ] Backend deployed and accessible
- [ ] API endpoint returns `{"message": "ok"}`

### Frontend Deployment
- [ ] Production API URL updated in `environment.prod.ts`
- [ ] Vercel account created
- [ ] Frontend repository connected
- [ ] Build configuration set correctly
- [ ] Frontend deployed successfully
- [ ] Can access welcome page

### Integration
- [ ] Backend CORS updated with Vercel URL
- [ ] Login works for all 3 user types
- [ ] Customer dashboard loads
- [ ] Employee dashboard loads
- [ ] Manager dashboard loads
- [ ] Transactions work end-to-end

### Monitoring
- [ ] UptimeRobot monitor created
- [ ] Backend stays awake during business hours
- [ ] Email alerts configured (optional)

---

## 🔧 Troubleshooting

### Backend Issues

**Error: "connect ECONNREFUSED"**
- Check Aiven MySQL credentials
- Ensure `DB_SSL=true` for Aiven
- Verify port number is correct

**Error: "Access denied for user"**
- Double-check DB_PASSWORD
- Ensure user has proper permissions in Aiven

**CORS errors from Frontend**
- Verify FRONTEND_URL in Backend environment variables
- Check it matches your Vercel URL exactly
- Redeploy Backend after changing

### Frontend Issues

**Error: "HttpErrorResponse 0 Unknown Error"**
- Backend is sleeping (wait 30-60 seconds)
- Backend URL is incorrect
- CORS not configured properly

**Login doesn't work**
- Check Network tab in browser DevTools
- Verify API calls go to correct backend URL
- Check backend logs in Render dashboard

### Database Issues

**Tables not found**
- Re-import database dump
- Check database name is `defaultdb`
- Verify connection with MySQL client

---

## 📈 Monitoring & Maintenance

### Check Backend Health
```bash
curl https://bank-backend-api.onrender.com/
```

### Check Frontend
Visit: `https://bank-app-frontend.vercel.app`

### View Backend Logs
1. Go to Render dashboard
2. Select your service
3. Click "Logs" tab

### View Frontend Analytics
1. Go to Vercel dashboard
2. Select your project
3. Click "Analytics"

---

## 💰 Cost Analysis

| Service | Free Tier | Limitations | Cost After Free |
|---------|-----------|-------------|-----------------|
| **Vercel** | Unlimited | 100GB bandwidth/month | $20/month |
| **Render** | 750 hrs/month | Spins down after 15min | $7/month |
| **Aiven** | 90 days trial | 5GB storage | $0-10/month |
| **UptimeRobot** | 50 monitors | 5-min intervals | $7/month |

**Total Cost (Free Tier):** $0/month
**Total Cost (Paid):** ~$35-45/month (if needed after trials)

---

## 🎯 For Your Resume

Add these links to your resume:

```
Project: Bank Transaction and Loan Processing System
Live Demo: https://bank-app-frontend.vercel.app
API: https://bank-backend-api.onrender.com
GitHub: [Your GitHub repo links]

Test Credentials:
Customer: damikaanupama@gmail.com / 1234
Employee: nimalnimal@gmail.com / 4567
Manager: jkesoni@alexa.com / Jewelle
```

---

## 📞 Support

If you encounter issues:
1. Check Render/Vercel logs
2. Verify environment variables
3. Test database connection
4. Review CORS configuration

For service-specific help:
- Aiven: https://docs.aiven.io/
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
