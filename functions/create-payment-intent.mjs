require('dotenv').config()
const stripe = require("stripe")(process.env.VITE_AUTH0_STRIPE_SECRET_KEY);

export async function handler(event) {
  if(event.body) {
    try {
      const { cart, total_amount, shipping_fee } = JSON.parse(event.body);

      const calculateOrderAmount = () => {
        return total_amount + shipping_fee;
      };

      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "inr",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        statusCode: 200,
        body : JSON.stringify({clientSecret: paymentIntent.client_secret})
      }
    } catch (error) {
      return{
        statusCode : 500,
        body : JSON.stringify({error : error.message})
      }
    }
  }
  return {
    statusCode: 200,
    body: 'create payment intent'
  }
}