import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Only accept GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { period = '7d' } = req.query;

    // Calculate date range based on period
    let daysAgo;
    switch (period) {
      case '30d':
        daysAgo = 30;
        break;
      case '90d':
        daysAgo = 90;
        break;
      case '7d':
      default:
        daysAgo = 7;
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);

    // 1. Total page views
    const pageViewsResult = await sql`
      SELECT COUNT(*) as total
      FROM page_views
      WHERE created_at >= ${startDate.toISOString()}
    `;
    const totalPageViews = parseInt(pageViewsResult.rows[0].total);

    // 2. Unique visitors
    const uniqueVisitorsResult = await sql`
      SELECT COUNT(DISTINCT session_id) as total
      FROM page_views
      WHERE created_at >= ${startDate.toISOString()}
    `;
    const uniqueVisitors = parseInt(uniqueVisitorsResult.rows[0].total);

    // 3. Average time on site (from time_on_page events)
    const avgTimeResult = await sql`
      SELECT AVG((event_data->>'timeOnPage')::integer) as avg_time
      FROM analytics_events
      WHERE event_name = 'time_on_page'
        AND created_at >= ${startDate.toISOString()}
        AND event_data->>'timeOnPage' IS NOT NULL
    `;
    const avgTimeOnSite = Math.round(parseFloat(avgTimeResult.rows[0].avg_time) || 0);

    // 4. Bounce rate
    const bounceRateResult = await sql`
      SELECT
        COUNT(CASE WHEN is_bounce THEN 1 END) as bounces,
        COUNT(*) as total
      FROM sessions
      WHERE first_seen_at >= ${startDate.toISOString()}
    `;
    const bounces = parseInt(bounceRateResult.rows[0].bounces);
    const totalSessions = parseInt(bounceRateResult.rows[0].total);
    const bounceRate = totalSessions > 0 ? Math.round((bounces / totalSessions) * 100) : 0;

    // 5. Top pages
    const topPagesResult = await sql`
      SELECT page_path, COUNT(*) as views
      FROM page_views
      WHERE created_at >= ${startDate.toISOString()}
      GROUP BY page_path
      ORDER BY views DESC
      LIMIT 10
    `;
    const topPages = topPagesResult.rows.map(row => ({
      path: row.page_path,
      views: parseInt(row.views)
    }));

    // 6. Form submissions by type
    const formSubmissionsResult = await sql`
      SELECT form_type, COUNT(*) as count
      FROM form_submissions
      WHERE created_at >= ${startDate.toISOString()}
      GROUP BY form_type
    `;
    const formSubmissions = formSubmissionsResult.rows.reduce((acc, row) => {
      acc[row.form_type] = parseInt(row.count);
      return acc;
    }, {});

    // 7. Traffic sources (group by referrer domain)
    const trafficSourcesResult = await sql`
      SELECT
        CASE
          WHEN referrer = '' OR referrer IS NULL THEN 'Direct'
          WHEN referrer LIKE '%google%' THEN 'Google'
          WHEN referrer LIKE '%facebook%' THEN 'Facebook'
          WHEN referrer LIKE '%twitter%' OR referrer LIKE '%t.co%' THEN 'Twitter'
          WHEN referrer LIKE '%linkedin%' THEN 'LinkedIn'
          ELSE 'Other'
        END as source,
        COUNT(*) as count
      FROM page_views
      WHERE created_at >= ${startDate.toISOString()}
      GROUP BY source
      ORDER BY count DESC
    `;
    const trafficSources = trafficSourcesResult.rows.map(row => ({
      source: row.source,
      count: parseInt(row.count)
    }));

    // 8. Page views over time (daily)
    const pageViewsOverTimeResult = await sql`
      SELECT
        DATE(created_at) as date,
        COUNT(*) as views
      FROM page_views
      WHERE created_at >= ${startDate.toISOString()}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;
    const pageViewsOverTime = pageViewsOverTimeResult.rows.map(row => ({
      date: row.date,
      views: parseInt(row.views)
    }));

    // 9. Recent signups (last 50)
    const recentSignupsResult = await sql`
      SELECT
        id,
        form_type,
        email,
        name,
        role,
        created_at
      FROM form_submissions
      WHERE created_at >= ${startDate.toISOString()}
      ORDER BY created_at DESC
      LIMIT 50
    `;
    const recentSignups = recentSignupsResult.rows.map(row => ({
      id: row.id,
      formType: row.form_type,
      email: row.email,
      name: row.name,
      role: row.role,
      createdAt: row.created_at
    }));

    // Return all stats
    return res.status(200).json({
      period,
      startDate: startDate.toISOString(),
      metrics: {
        totalPageViews,
        uniqueVisitors,
        avgTimeOnSite,
        bounceRate,
        totalSignups: Object.values(formSubmissions).reduce((sum, count) => sum + count, 0)
      },
      topPages,
      formSubmissions,
      trafficSources,
      pageViewsOverTime,
      recentSignups
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
