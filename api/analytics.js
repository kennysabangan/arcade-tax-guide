export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GHL_HEADERS = {
    'Authorization': 'Bearer pit-c118366a-df44-44f2-a257-52c8c8934353',
    'Version': '2021-07-28',
  };
  const GHL_LOCATION_ID = 'Mp6SVlSkhbup63EKVSvb';

  try {
    // Fetch all contacts with pagination support
    let allContacts = [];
    let startAfterId = undefined;
    let startAfter = undefined;

    do {
      let url = `https://services.leadconnectorhq.com/contacts/?locationId=${GHL_LOCATION_ID}&limit=100`;
      if (startAfterId) url += `&startAfterId=${startAfterId}`;
      if (startAfter) url += `&startAfter=${startAfter}`;

      const ghRes = await fetch(url, { headers: GHL_HEADERS });

      if (!ghRes.ok) {
        const errData = await ghRes.json().catch(() => ({}));
        return res.status(ghRes.status).json({ error: errData.message || 'GHL API error' });
      }

      const data = await ghRes.json();
      const contacts = data.contacts || [];
      allContacts = allContacts.concat(contacts);

      // Check for next page
      if (contacts.length === 100) {
        const last = contacts[contacts.length - 1];
        startAfterId = last.id;
        startAfter = last.dateAdded ? new Date(last.dateAdded).getTime() : undefined;
      } else {
        startAfterId = undefined;
      }
    } while (startAfterId);

    // Filter for arcade-tax-lead tag
    const leads = allContacts.filter(c =>
      c.tags?.some(t => t.toLowerCase() === 'arcade-tax-lead')
    );

    // Calculate this week's leads
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const thisWeekLeads = leads.filter(c => {
      if (!c.dateAdded) return false;
      return new Date(c.dateAdded) >= sevenDaysAgo;
    });

    // Build recent leads list (sorted by date descending)
    const sortedLeads = [...leads].sort((a, b) =>
      new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0)
    );

    const recentLeads = sortedLeads.slice(0, 10).map(c => ({
      name: `${c.firstName || ''} ${c.lastName || ''}`.trim() || 'Unknown',
      email: c.email || '',
      phone: c.phone || '',
      dateAdded: c.dateAdded || '',
    }));

    return res.status(200).json({
      totalLeads: leads.length,
      thisWeekLeads: thisWeekLeads.length,
      recentLeads,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
