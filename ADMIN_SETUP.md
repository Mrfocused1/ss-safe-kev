# Admin Dashboard Setup Guide

This guide will help you set up the Sickle Safe Admin Dashboard with Vercel Postgres.

## Prerequisites

- Vercel account
- Node.js 18+ installed
- Git repository connected to Vercel

## Step 1: Create Vercel Postgres Database

1. Go to your Vercel project dashboard
2. Navigate to the "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Choose a name (e.g., "sickle-safe-analytics")
6. Select a region close to your users
7. Click "Create"

## Step 2: Get Database Connection String

1. After the database is created, go to the ".env.local" tab
2. Copy the `POSTGRES_URL` value
3. You'll need this in the next step

## Step 3: Initialize Database Schema

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Pull environment variables
vercel env pull

# Install dependencies
npm install

# Connect to your database and run the schema
psql "$(grep POSTGRES_URL .env.local | cut -d '=' -f2 | tr -d '"')" < scripts/init-db.sql
```

### Option B: Using Vercel Dashboard

1. Go to your Vercel Postgres database dashboard
2. Click on the "Query" tab
3. Copy the contents of `scripts/init-db.sql`
4. Paste and execute in the query editor

## Step 4: Configure Environment Variables

1. In your Vercel project dashboard, go to "Settings" → "Environment Variables"
2. The `POSTGRES_URL` should already be set by Vercel
3. No additional variables are needed (password hash is in the code for simplicity)

## Step 5: Deploy

```bash
# Deploy to Vercel
vercel --prod
```

Or push to your connected Git repository to trigger automatic deployment.

## Step 6: Access the Dashboard

1. Visit `https://your-domain.vercel.app/admin`
2. Enter the default password: **password**
3. You should see the admin dashboard!

## Changing the Admin Password

The default password is "password". To change it:

1. Generate a SHA-256 hash of your new password at: https://emn178.github.io/online-tools/sha256.html
2. Open `js/admin.js`
3. Replace the `ADMIN_PASSWORD_HASH` value on line 4
4. Deploy the changes

Example:
```javascript
// For password "mySecurePassword123"
const ADMIN_PASSWORD_HASH = 'your-sha256-hash-here';
```

## Testing Locally

To test the dashboard locally:

```bash
# Install dependencies
npm install

# Pull environment variables from Vercel
vercel env pull

# Start a local development server
npx vercel dev
```

Then visit `http://localhost:3000/admin`

## Dashboard Features

### KPI Metrics
- **Total Page Views** - Number of page visits in selected period
- **Unique Visitors** - Distinct visitors (by session ID)
- **Avg Time on Site** - Average time users spend on the site (in seconds)
- **Live Visitors** - Number of visitors active in the last 5 minutes

### Charts
- **Traffic Sources** - Doughnut chart showing where visitors come from
- **Page Views Over Time** - Line chart showing daily page views

### Form Submissions
- View all signups from:
  - Hero signup form (homepage)
  - Contact form (homepage)
  - Gala mailing list (gala page)
- Filter by form type
- Export to CSV

### Real-time Updates
- Stats refresh every 30 seconds
- Live visitor count refreshes every 10 seconds

## Analytics Tracking

The analytics system automatically tracks:

- **Page Views** - Every page load
- **Scroll Depth** - 25%, 50%, 75%, 100% scroll markers
- **Button Clicks** - All button clicks on the site
- **External Links** - Clicks on external links
- **Time on Page** - Duration spent on each page

### Privacy

- Respects "Do Not Track" browser setting
- No third-party cookies
- No personal data collected (only session IDs)
- Session IDs are random UUIDs stored in localStorage

## Troubleshooting

### "Method not allowed" errors
- Make sure you're using POST for form submissions
- Check that the API endpoints are deployed correctly

### "Internal server error"
- Check Vercel function logs in the dashboard
- Verify `POSTGRES_URL` is set correctly
- Ensure database tables are created (run init-db.sql)

### Charts not rendering
- Check browser console for JavaScript errors
- Ensure Chart.js CDN is accessible
- Verify data is being returned from `/api/admin/stats`

### No data showing
- Visit your website pages to generate analytics data
- Submit test forms to create signup data
- Wait a few seconds for data to propagate

## Database Maintenance

### Viewing Data

Use the Vercel Postgres dashboard query editor or connect via psql:

```sql
-- View recent page views
SELECT * FROM page_views ORDER BY created_at DESC LIMIT 10;

-- View all signups
SELECT * FROM form_submissions ORDER BY created_at DESC;

-- View active sessions
SELECT * FROM sessions WHERE last_seen_at > NOW() - INTERVAL '5 minutes';
```

### Cleaning Old Data

To keep your database within free tier limits (60K rows):

```sql
-- Delete page views older than 90 days
DELETE FROM page_views WHERE created_at < NOW() - INTERVAL '90 days';

-- Delete old analytics events
DELETE FROM analytics_events WHERE created_at < NOW() - INTERVAL '90 days';

-- Clean up old sessions
DELETE FROM sessions WHERE last_seen_at < NOW() - INTERVAL '90 days';
```

## Production Security Notes

⚠️ **The current password implementation is NOT production-secure**

For a production deployment with sensitive data:

1. Move to server-side authentication with Vercel Edge Middleware
2. Implement proper session management
3. Use environment variables for password hashes
4. Add rate limiting
5. Enable HTTPS only
6. Consider adding two-factor authentication

The current implementation is acceptable for:
- Internal dashboards
- Non-sensitive analytics
- MVP/prototype stages
- Low-risk environments

## Support

If you encounter issues:
1. Check Vercel function logs
2. Review browser console for errors
3. Verify database connection with a test query
4. Check that all API endpoints return 200 OK

## Files Created

This implementation added:
- `/admin` - Dashboard page
- `/js/admin.js` - Dashboard logic
- `/js/analytics.js` - Client-side tracker
- `/api/track-page-view.js` - Page view API
- `/api/track-event.js` - Event tracking API
- `/api/submit-form.js` - Form submission API
- `/api/admin/stats.js` - Dashboard stats API
- `/api/admin/signups.js` - CSV export API
- `/api/admin/realtime.js` - Live count API
- `/scripts/init-db.sql` - Database schema

Modified files:
- `/index.html` - Added analytics + updated hero form
- `/gala.html` - Added analytics + updated mailing form
- `/problem.html` - Added analytics
- `/js/main.js` - Updated contact form
- `/package.json` - Added @vercel/postgres
- `/.gitignore` - Added .vercel
- `/vercel.json` - Added functions config
