const express = require("express");
const app = express();
require('dotenv').config();

app.use(express.static("public"));
app.use(express.json());

const port = process.env.PORT;
const stripe = require('stripe')(process.env.SECRET_KEY);

app.post('/create-checkout-session', async (req, res) => {
  const items = req.body.items;
  const line_items = items.map(item => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.itemProduct.title,
          description: item.itemProduct.description
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
    allow_promotion_codes: true,
    success_url: process.env.SUCCESS_DOMAIN,
    cancel_url: process.env.CANCEL_DOMAIN,
  });

  res.json({ url: session.url });

});


app.listen(port, () => console.log(`Node server listening on port ${process.env.PORT}!`));