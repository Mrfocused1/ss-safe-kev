import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId, pagePath, referrer, userAgent, screenWidth } = req.body;

    // Validate required fields
    if (!sessionId || !pagePath) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert page view
    await sql`
      INSERT INTO page_views (session_id, page_path, referrer, user_agent, screen_width)
      VALUES (${sessionId}, ${pagePath}, ${referrer || ''}, ${userAgent || ''}, ${screenWidth || null})
    `;

    // Update or create session
    const existingSession = await sql`
      SELECT id, page_count FROM sessions WHERE session_id = ${sessionId}
    `;

    if (existingSession.rows.length > 0) {
      // Update existing session
      const newPageCount = existingSession.rows[0].page_count + 1;
      await sql`
        UPDATE sessions
        SET last_seen_at = NOW(),
            page_count = ${newPageCount},
            is_bounce = ${newPageCount === 1}
        WHERE session_id = ${sessionId}
      `;
    } else {
      // Create new session
      await sql`
        INSERT INTO sessions (session_id, first_seen_at, last_seen_at, page_count, is_bounce)
        VALUES (${sessionId}, NOW(), NOW(), 1, true)
      `;
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error tracking page view:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
