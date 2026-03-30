export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, customFields } = req.body;

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
    tags: ['arcade-tax-lead'],
    customFields,
  };

  try {
    const ghRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: GHL_HEADERS,
      body: JSON.stringify(contactBody),
    });

    if (ghRes.ok) {
      const data = await ghRes.json();
      return res.status(200).json({ success: true, contact: data });
    }

    const errData = await ghRes.json().catch(() => ({}));
    const msg = (errData.message || '').toLowerCase();

    // Handle duplicate contact — search and update
    if (ghRes.status === 400 && msg.includes('duplicate')) {
      const searchRes = await fetch(
        `https://services.leadconnectorhq.com/contacts/?locationId=${GHL_LOCATION_ID}&query=${encodeURIComponent(email)}`,
        { method: 'GET', headers: { 'Authorization': GHL_HEADERS.Authorization, 'Version': GHL_HEADERS.Version } }
      );
      const searchData = await searchRes.json().catch(() => ({}));
      const existing = searchData.contacts?.find(
        (c) => c.email?.toLowerCase() === email.toLowerCase()
      );

      if (existing?.id) {
        const updateBody = {
          firstName,
          lastName,
          phone,
          customFields,
        };
        const updateRes = await fetch(
          `https://services.leadconnectorhq.com/contacts/${existing.id}`,
          {
            method: 'PUT',
            headers: GHL_HEADERS,
            body: JSON.stringify(updateBody),
          }
        );
        if (!updateRes.ok) {
          const updateErr = await updateRes.json().catch(() => ({}));
          return res.status(500).json({ error: 'Failed to update existing contact', details: updateErr });
        }
        const updateData = await updateRes.json();

        // Re-add tag after update
        await fetch(
          `https://services.leadconnectorhq.com/contacts/${existing.id}/tags`,
          {
            method: 'POST',
            headers: GHL_HEADERS,
            body: JSON.stringify({ tags: ['arcade-tax-lead'] }),
          }
        ).catch(() => {});

        return res.status(200).json({ success: true, updated: true, contact: updateData });
      }

      return res.status(200).json({ success: true, note: 'Duplicate but could not find existing contact' });
    }

    return res.status(ghRes.status).json({ error: errData.message || 'GHL API error' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
