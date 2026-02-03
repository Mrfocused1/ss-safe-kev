import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Only accept GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Count distinct sessions with last_seen_at within last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const result = await sql`
      SELECT COUNT(DISTINCT session_id) as live_count
      FROM sessions
      WHERE last_seen_at >= ${fiveMinutesAgo.toISOString()}
    `;

    const liveCount = parseInt(result.rows[0].live_count) || 0;

    return res.status(200).json({ liveCount });
  } catch (error) {
    console.error('Error fetching realtime count:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
