import { Router } from 'express';
import { stripe } from '../lib/stripe';

const router = Router();

router.post('/create-checkout-session', async (req, res) => {
  const { cartItems, userEmail, isSubscription } = req.body;

  try {
    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
        ...(item.isSubscription && {
          recurring: { interval: item.duration || 'month' },
        }),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      customer_email: userEmail,
      line_items: lineItems,
success_url: `${process.env.FRONTEND_URL}/checkout/confirmation`,
cancel_url: `${process.env.FRONTEND_URL}/checkout`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Erreur Stripe:', error);
    res.status(500).json({ error: 'Erreur lors de la création de session Stripe' });
  }
});

export default router;
