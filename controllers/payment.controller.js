const Stripe = require('stripe');

const stripe = new Stripe(
  'sk_test_51PItmKRsRQnMZ24SANI2Y1dPpChJfXRQoEZnPnlRaFt6w6yKTMOdcp5GVyBiJxVK2evis0CxGzvicADWoxB4o2mx00KkEleKsP'
);

const createSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
              description: 'Comfortable cotton t-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1
        },
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Mug',
              description: 'Durable ceramic mug',
            },
            unit_amount: 800,
          },
          quantity: 1
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ session });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Error creating checkout session" });
  }
};

module.exports = createSession;
