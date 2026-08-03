import Stripe from 'stripe';

const stripe = new Stripe(process.env.SWISSPAY_SECRET_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { productId, email, referral } = req.body;

  const PRODUCTS = {
    'one-unit': { amount: 2865000, name: 'Arcade Machine — 1 Unit' },
    'two-unit': { amount: 5730000, name: 'Arcade Machines — 2 Units' },
  };

  const product = PRODUCTS[productId];
  if (!product) return res.status(400).json({ error: 'Invalid product' });

  const origin = req.headers.origin || `https://${req.headers.host}`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: product.name },
            unit_amount: product.amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        product_id: productId,
        referral: referral || '',
      },
      success_url: `${origin}/checkout?product=${productId}&status=success`,
      cancel_url: `${origin}/checkout?product=${productId}&status=failed`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe Checkout error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
