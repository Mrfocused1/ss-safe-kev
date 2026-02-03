import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Only accept GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formType = 'all' } = req.query;

    // Build query based on form type filter
    let signupsResult;
    if (formType === 'all') {
      signupsResult = await sql`
        SELECT
          id,
          form_type,
          email,
          name,
          role,
          created_at
        FROM form_submissions
        ORDER BY created_at DESC
      `;
    } else {
      signupsResult = await sql`
        SELECT
          id,
          form_type,
          email,
          name,
          role,
          created_at
        FROM form_submissions
        WHERE form_type = ${formType}
        ORDER BY created_at DESC
      `;
    }

    // Generate CSV
    const csvRows = [];

    // Header row
    csvRows.push('ID,Form Type,Email,Name,Role,Created At');

    // Data rows
    signupsResult.rows.forEach(row => {
      const csvRow = [
        row.id,
        row.form_type,
        `"${row.email}"`, // Wrap email in quotes to handle commas
        row.name ? `"${row.name}"` : '',
        row.role ? `"${row.role}"` : '',
        new Date(row.created_at).toISOString()
      ];
      csvRows.push(csvRow.join(','));
    });

    const csvContent = csvRows.join('\n');

    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="signups-${formType}-${new Date().toISOString().split('T')[0]}.csv"`);

    return res.status(200).send(csvContent);
  } catch (error) {
    console.error('Error exporting signups:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
