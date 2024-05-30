// const Stripe = require('stripe');
// const stripe = new Stripe(
//   'sk_test_51OeN6FGAjY1gaWacRAC1ykBeWLoN2RLtqeJNfHc8q53l5XAQjnUWH74Q4tdCQ0HpdGkEDROTHKpIR4xjAk7pIaaV00M6RNzBI2'
// );

// const CreateSession = async (req, res) => {
//   const { lineItems } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: lineItems,
//       mode: 'payment',
//       success_url: 'http://localhost:3000/success',
//       cancel_url: 'http://localhost:3000/cancel',
//     });

//     res.json({ session });
//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// module.exports = CreateSession;

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
<<<<<<< HEAD
          quantity: 1
=======
          quantity: 1,
>>>>>>> c8fcf6953ad109de80b43f2315a41c0fa41030f9
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
<<<<<<< HEAD
          quantity: 1
=======
          quantity: 1,
>>>>>>> c8fcf6953ad109de80b43f2315a41c0fa41030f9
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ session });
  } catch (error) {
<<<<<<< HEAD
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Error creating checkout session" });
=======
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Error creating checkout session' });
>>>>>>> c8fcf6953ad109de80b43f2315a41c0fa41030f9
  }
};

module.exports = createSession;
