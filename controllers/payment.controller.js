const Stripe = require('stripe');
const stripe = new Stripe(
  'sk_test_51OeN6FGAjY1gaWacRAC1ykBeWLoN2RLtqeJNfHc8q53l5XAQjnUWH74Q4tdCQ0HpdGkEDROTHKpIR4xjAk7pIaaV00M6RNzBI2'
);

const CreateSession = async (req, res) => {
  const { lineItems } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ session });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = CreateSession;
