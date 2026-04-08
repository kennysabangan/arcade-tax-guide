async function sendGA4Event(clientId) {
  const measurementId = process.env.GA_MEASUREMENT_ID || 'G-G6VD432JZL';
  const apiSecret = process.env.GA_API_SECRET;
  if (!apiSecret || !clientId) return;
  // Fire and forget - don't await
  fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        events: [{
          name: 'generate_lead',
          params: { event_category: 'lead', event_label: 'arcade_landing_page', value: 1 },
        }],
      }),
    }
  ).catch(() => {});
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-GA-Client-ID');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, customFields, source, leadScore, ref } = req.body;
  
  // Extract custom fields for Google Sheet
  const filingStatus = customFields?.find(f => f.id === '2SUP1cLPoUkecnIj0fNh')?.value;
  const income = customFields?.find(f => f.id === 'xtYbdtKV2GB7KFBMZIJj')?.value;
  const taxOwed = customFields?.find(f => f.id === 'iYCMxRDLqgbQaIYiGoCk')?.value;
  let gaClientId = req.headers['x-ga-client-id'];
  if (!gaClientId) {
    // Fallback: read _ga cookie directly from headers
    const cookies = req.headers.cookie || '';
    const match = cookies.match(/_ga=GA\d+\.\d+\.(\d+\.\d+)/);
    if (match) gaClientId = match[1];
  }
  // Debug: log presence (remove after confirm)
  console.log('GA clientId:', gaClientId || 'none', 'hasSecret:', !!process.env.GA_API_SECRET);
  console.log('Form submission:', { email, firstName, lastName, phone });

  // Determine tags based on referral ref
  let tags = ['arcade-tax-lead'];
  if (ref === 'svconsulting') {
    tags = ['partner-svconsulting'];
  } else if (ref === '1000banks') {
    tags = ['partner-1000banks'];
  }

  const GHL_HEADERS = {
    'Authorization': 'Bearer pit-c118366a-df44-44f2-a257-52c8c8934353',
    'Version': '2021-07-28',
    'Content-Type': 'application/json',
  };
  const GHL_LOCATION_ID = 'Mp6SVlSkhbup63EKVSvb';

  const contactBody = {
    firstName,
    lastName,
    email,
    phone,
    locationId: GHL_LOCATION_ID,
    tags,
    source: source || 'Arcade Funnel Page',
    customFields,
  };

  try {
    console.log('Attempting GHL contact creation...', { email, firstName });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    const ghRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: GHL_HEADERS,
      body: JSON.stringify(contactBody),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    console.log('GHL Response status:', ghRes.status);

    if (ghRes.ok) {
      const data = await ghRes.json();
      console.log('GHL Success:', data.id);
      sendGA4Event(gaClientId);
      // Append to Google Sheet (fire and forget)
      appendToSheet({ email, firstName, lastName, phone, source, leadScore, filingStatus, income, taxOwed }).catch(() => {});
      return res.status(200).json({ success: true, contact: data });
    }
    
    const errData = await ghRes.json().catch(() => ({}));
    const msg = (errData.message || '').toLowerCase();
    console.log('GHL Error:', errData);

    // Handle duplicate contact — search and update
    if (ghRes.status === 400 && msg.includes('duplicate')) {
      // Try to extract existing contact ID from error metadata
      let existingContactId = errData.meta?.contactId;
      if (!existingContactId) {
        // Fallback: search by email
        const searchRes = await fetch(
          `https://services.leadconnectorhq.com/contacts/?locationId=${GHL_LOCATION_ID}&query=${encodeURIComponent(email)}`,
          { method: 'GET', headers: { 'Authorization': GHL_HEADERS.Authorization, 'Version': GHL_HEADERS.Version } }
        );
        const searchData = await searchRes.json().catch(() => ({}));
        const existing = searchData.contacts?.find(
          (c) => c.email?.toLowerCase() === email.toLowerCase()
        );
        existingContactId = existing?.id;
      }

      if (existingContactId) {
        const updateBody = {
          firstName,
          lastName,
          phone,
          customFields,
        };
        const updateController = new AbortController();
        const updateTimeout = setTimeout(() => updateController.abort(), 10000);
        
        const updateRes = await fetch(
          `https://services.leadconnectorhq.com/contacts/${existingContactId}`,
          {
            method: 'PUT',
            headers: GHL_HEADERS,
            body: JSON.stringify(updateBody),
            signal: updateController.signal,
          }
        );
        clearTimeout(updateTimeout);
        if (!updateRes.ok) {
          const updateErr = await updateRes.json().catch(() => ({}));
          return res.status(500).json({ error: 'Failed to update existing contact', details: updateErr });
        }
        const updateData = await updateRes.json();

        // Re-add tag after update
        await fetch(
          `https://services.leadconnectorhq.com/contacts/${existingContactId}/tags`,
          {
            method: 'POST',
            headers: GHL_HEADERS,
            body: JSON.stringify({ tags }),
          }
        ).catch(() => {});

        sendGA4Event(gaClientId);
        // Append to Google Sheet (fire and forget)
        appendToSheet({ email, firstName, lastName, phone, source, leadScore, filingStatus, income, taxOwed }).catch(() => {});
        return res.status(200).json({ success: true, updated: true, contact: updateData });
      }

      return res.status(200).json({ success: true, note: 'Duplicate but could not find existing contact' });
    }

    return res.status(ghRes.status).json({ error: errData.message || 'GHL API error' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}

// Helper function to append row to Google Sheet
async function appendToSheet(row) {
  const SHEET_ID = process.env.GOOGLE_SHEET_ID;
  const SHEET_RANGE = 'Leads!A:J'; // Adjust range as needed
  const API_KEY = process.env.GOOGLE_API_KEY;
  
  if (!SHEET_ID || !API_KEY) {
    console.log('Google Sheet config missing - skipping sheet append');
    return;
  }
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_RANGE}:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;
  
  console.log('Appending to Google Sheet...');
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        values: [[
          row.email,
          row.firstName,
          row.lastName,
          row.phone,
          row.source,
          new Date().toISOString(),
          row.leadScore || '',
          row.filingStatus || '',
          row.income || '',
          row.taxOwed || ''
        ]]
      })
    });
    console.log('Sheet append response:', response.status);
  } catch (err) {
    console.log('Sheet append failed:', err.message);
  }
}
