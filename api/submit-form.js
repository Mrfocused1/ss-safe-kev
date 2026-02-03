import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formType, email, name, role, sessionId, metadata } = req.body;

    // Validate required fields
    if (!formType || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate form type
    const validFormTypes = ['hero_signup', 'contact_form', 'gala_mailing'];
    if (!validFormTypes.includes(formType)) {
      return res.status(400).json({ error: 'Invalid form type' });
    }

    // Check for duplicate submissions (same email + form type within 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const duplicateCheck = await sql`
      SELECT id FROM form_submissions
      WHERE email = ${email}
        AND form_type = ${formType}
        AND created_at > ${fiveMinutesAgo.toISOString()}
      LIMIT 1
    `;

    if (duplicateCheck.rows.length > 0) {
      return res.status(429).json({ error: 'Duplicate submission detected. Please wait before submitting again.' });
    }

    // Insert form submission
    await sql`
      INSERT INTO form_submissions (form_type, email, name, role, session_id, metadata)
      VALUES (
        ${formType},
        ${email},
        ${name || null},
        ${role || null},
        ${sessionId || null},
        ${metadata ? JSON.stringify(metadata) : null}
      )
    `;

    return res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
