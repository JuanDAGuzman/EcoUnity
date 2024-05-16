const Stripe = require('stripe');

const stripe = new Stripe(
  'sk_test_51OeN6FGAjY1gaWacRAC1ykBeWLoN2RLtqeJNfHc8q53l5XAQjnUWH74Q4tdCQ0HpdGkEDROTHKpIR4xjAk7pIaaV00M6RNzBI2'
);

const CreateSession = async (req, res) => {
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
  })
  return res.json({ session})
}

module.exports = CreateSession;
