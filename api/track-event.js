import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId, eventName, eventData, pagePath } = req.body;

    // Validate required fields
    if (!sessionId || !eventName || !pagePath) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert event
    await sql`
      INSERT INTO analytics_events (event_name, event_data, session_id, page_path)
      VALUES (${eventName}, ${JSON.stringify(eventData || {})}, ${sessionId}, ${pagePath})
    `;

    // Update session last_seen_at
    await sql`
      UPDATE sessions
      SET last_seen_at = NOW()
      WHERE session_id = ${sessionId}
    `;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
