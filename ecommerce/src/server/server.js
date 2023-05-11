const express = require("express");
const app = express();
require('dotenv').config();

app.use(express.static("public"));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = process.env.PORT || 8000;
const stripe = require('stripe')(process.env.SECRET_KEY);

app.post('/create-checkout-session', async (req, res) => {
  const items = req.body.items;
  const line_items = items.map(item => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.itemProduct.title,
          images: [item.itemProduct.image]
        },
        unit_amount: item.itemProduct.price * 100,
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 100,
      },
      quantity: item.itemQuantity,
    }
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    invoice_creation: { enabled: true },
    allow_promotion_codes: true,
    payment_method_types: ["card"],
    success_url: process.env.STRIPE_PAYMENT_CHECKOUT_SUCCESS,
    cancel_url: process.env.BACK_TO_CART,
  });
  res.json({ url: session.url });
});

app.listen(port, () => console.log(`Node server listening on port ${process.env.PORT}!`));