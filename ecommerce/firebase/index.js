const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.static("public"));
app.use(express.json());

var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const stripe = require("stripe")(process.env.SECRET_KEY);

app.get("/", (req, res) => {
    res.status(200).send("Hello World")
})

app.post("/create-checkout-session", async (req, res) => {
  const items = req.body.items;
  const line_items = items.map(item => {
    return {
      price_data: {
        currency: "usd",
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
    mode: "payment",
    invoice_creation: { enabled: true },
    allow_promotion_codes: true,
    payment_method_types: ["card"],
    success_url: process.env.STRIPE_PAYMENT_CHECKOUT_SUCCESS,
    cancel_url: process.env.BACK_TO_CART,
  });
  res.json({ url: session.url });
});

app.listen(5001, () => console.log(`Node server listening on port!`));
