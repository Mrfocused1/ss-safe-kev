export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { organizationName, website, description, programs, contact, opportunity } = req.body;

    // Validate required fields
    if (!organizationName || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return res.status(500).json({ error: 'AI service not configured' });
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a professional outreach specialist for Sickle Safe, a health technology organization focused on supporting young people with sickle cell disease through digital education and safety tools.

Your task is to write personalized, compelling outreach emails to potential partners and funders. The emails should:
- Be professional yet warm and personable
- Clearly articulate Sickle Safe's mission and impact
- Demonstrate knowledge of the recipient organization
- Propose specific, actionable partnership opportunities
- Be concise (250-350 words)
- Include a clear call-to-action
- Use British English spelling

Do NOT include:
- Subject lines (just the email body)
- Sender signature (it will be added separately)
- Generic placeholders like [Your Name] or [Date]`
          },
          {
            role: 'user',
            content: `Write a personalized outreach email to ${organizationName}.

Organization Details:
- Name: ${organizationName}
- Website: ${website || 'Not provided'}
- Description: ${description}
- Relevant Programs: ${programs || 'Not specified'}
- Contact: ${contact?.team || 'Partnership team'}
- Partnership Opportunity: ${opportunity}

Write an engaging outreach email that:
1. Opens with a genuine connection to their work
2. Introduces Sickle Safe and our mission (supporting young people with sickle cell disease through digital health tools and education)
3. Proposes the specific partnership opportunity mentioned above
4. Explains mutual benefits
5. Ends with a clear next step

Keep it authentic, specific to this organization, and compelling.`
          }
        ],
        temperature: 0.7,
        max_tokens: 600
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return res.status(response.status).json({
        error: 'Failed to generate outreach email',
        details: errorData
      });
    }

    const data = await response.json();
    const emailBody = data.choices[0].message.content.trim();

    // Add signature
    const fullEmail = `${emailBody}\n\nWarm regards,\n\nThe Sickle Safe Team\n\n---\nSickle Safe | Empowering Young Lives with Sickle Cell Disease\nWebsite: sicklesafe.co.uk\nEmail: hello@sicklesafe.co.uk`;

    return res.status(200).json({
      success: true,
      email: fullEmail,
      organizationName
    });

  } catch (error) {
    console.error('Error generating outreach:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
