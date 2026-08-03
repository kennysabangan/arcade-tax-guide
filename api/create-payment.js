export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const SWISSPAY_KEY = process.env.SWISSPAY_SECRET_KEY;
  if (!SWISSPAY_KEY) return res.status(500).json({ error: 'SwissPay key not configured' });

  const { productId, firstName, lastName, email, phone, referral, cardNumber, expMonth, expYear, cvc, holderName, address, city, state, zip, country } = req.body;

  const PRODUCTS = {
    'one-unit': { amount: 2865000, name: 'Arcade Machine — 1 Unit' },
    'two-unit': { amount: 5730000, name: 'Arcade Machines — 2 Units' },
  };

  const product = PRODUCTS[productId];
  if (!product) return res.status(400).json({ error: 'Invalid product' });

  const origin = req.headers.origin || `https://${req.headers.host}`;
  const idempotencyKey = req.headers['idempotency-key'] || crypto.randomUUID();

  // Log what we're sending (minus full card number)
  console.log('SwissPay request:', JSON.stringify({
    productId, amount: product.amount, currency: 'usd',
    cardLast4: cardNumber.replace(/\s/g, '').slice(-4),
    expMonth, expYear, cvc, holderName
  }));

  // Log what we're sending (minus full card number)
  console.log('SwissPay request:', JSON.stringify({
    productId, amount: product.amount, currency: 'usd',
    cardLast4: cardNumber.replace(/\s/g, '').slice(-4),
    expMonth, expYear, cvc, holderName
  }));

  try {
    const swissRes = await fetch('https://app.swisspay.ai/api/v1/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SWISSPAY_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify({
        amount: product.amount,
        currency: 'usd',
        reference: `${productId}_${Date.now()}`,
        success_url: `${origin}/checkout?product=${productId}&status=success`,
        failure_url: `${origin}/checkout?product=${productId}&status=failed`,
        customer: email ? { email, name: `${firstName} ${lastName}` } : undefined,
        metadata: {
          product_id: productId,
          referral: referral || '',
          phone: phone || '',
        },
        payment_method: {
          type: 'card',
          number: cardNumber.replace(/\s/g, ''),
          exp_month: parseInt(expMonth, 10),
          exp_year: parseInt(expYear, 10),
          cvc,
          holder_name: holderName,
        },
      }),
    });

    const data = await swissRes.json();

    if (!swissRes.ok && swissRes.status !== 200) {
      return res.status(swissRes.status).json({ error: data.error?.message || 'SwissPay error' });
    }

    // Check for 3DS redirect
    if (data.status === 'requires_action' && data.next_action?.redirect_url) {
      return res.status(200).json({ requiresAction: true, redirectUrl: data.next_action.redirect_url });
    }

    // Check for failure
    if (data.status === 'failed') {
      return res.status(200).json({ error: data.failure?.reason || 'Payment declined' });
    }

    // Success
    return res.status(200).json({ success: true, paymentId: data.id });
  } catch (err) {
    console.error('SwissPay error:', err.message);
    return res.status(500).json({ error: 'Payment processing failed' });
  }
}
