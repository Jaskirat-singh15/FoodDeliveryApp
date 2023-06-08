const router = require("express").Router();
let express = require("express");
const admin = require("firebase-admin");
// const retrieve = require("retrieve");
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/create", async (req, res) => {
  try {
    const id = Date.now();
    const data = {
      productId: id,
      product_name: req.body.product_name,
      product_category: req.body.product_category,
      product_price: req.body.product_price,
      imageURL: req.body.imageURL,
    };
    const response = await db.collection("products").doc(`/${id}/`).set(data);
    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

// get all the products
router.get("/all", async (req, res) => {
  (async () => {
    try {
      let query = db.collection("products");
      let response = [];
      await query.get().then((querysnap) => {
        let docs = querysnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error :${err}` });
    }
  })();
});

// delete a product
router.delete("/delete/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    await db
      .collection("products")
      .doc(`/${productId}/`)
      .delete()
      .then((result) => {
        return res.status(200).send({ success: true, data: result });
      });
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

// create a cart
router.post("/addToCart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.productId;

  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();

    if (doc.data()) {
      const quantity = doc.data().quantity + 1;
      const updatedItem = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .update({ quantity });
      return res.status(200).send({ success: true, data: updatedItem });
    } else {
      const data = {
        productId: productId,
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        product_price: req.body.product_price,
        imageURL: req.body.imageURL,
        quantity: 1,
      };
      const addItems = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .set(data);
      return res.status(200).send({ success: true, data: addItems });
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

// update cart to increase decrease the quantity
router.post("/updateCart/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  const productId = req.query.productId;
  const type = req.query.type;

  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();

    if (doc.data()) {
      if (type === "increment") {
        const quantity = doc.data().quantity + 1;
        const updatedItem = await db
          .collection("cartItems")
          .doc(`/${userId}/`)
          .collection("items")
          .doc(`/${productId}/`)
          .update({ quantity });
        return res.status(200).send({ success: true, data: updatedItem });
      } else {
        if (doc.data().quantity === 1) {
          await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .delete()
            .then((result) => {
              return res.status(200).send({ success: true, data: result });
            });
        } else {
          const quantity = doc.data().quantity - 1;
          const updatedItem = await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .update({ quantity });
          return res.status(200).send({ success: true, data: updatedItem });
        }
      }
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

// get all the cartItems for that user
router.get("/getCartItems/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  (async () => {
    try {
      let query = db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items");
      let response = [];
      await query.get().then((querysnap) => {
        let docs = querysnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error :${err}` });
    }
  })();
});

router.post("/create-checkout-session", async (req, res) => {  // card -> 4242 4242 4242
  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.body.data.user.user_id,
      cart: JSON.stringify(req.body.data.cart),
      total: req.body.data.total,
    },
  });

  const line_items = req.body.data.cart.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product_name,
          images: [item.imageURL],      // use url shortener for deployment
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.product_price * 100,
      },
      quantity: item.quantity,
    };
  });
  // const coupon = await stripe.coupons.create({
  //   percent_off: 20,
  //   duration: 'once',
  // });
  const session = await stripe.checkout.sessions.create({
    // paymemt_method_types:["card"],
    shipping_address_collection: { allowed_countries: ["IN", "US", "CA"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "inr" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "hour", value: 3 },
            maximum: { unit: "hour", value: 5 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 100 * 100, currency: "inr" },
          display_name: "express",
          delivery_estimate: {
            minimum: { unit: "hour", value: 1 },
            maximum: { unit: "hour", value: 1 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },

    line_items,
    mode: "payment",
    customer: customer.id,
    // subscription_data: {
    //   trial_settings: {
    //     end_behavior: {
    //       missing_payment_method: 'cancel',
    //     },
    //   },
    //   trial_period_days: 30,
    // },
    // payment_method_collection: 'if_required',
    // });
    // discounts: [{
    //   coupon: '{{COUPON_ID}}',
    // }],
    success_url: `${process.env.CLIENT_URL}checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}`,
  });

  res.send({ url: session.url });
});


let endpointSecret=  process.env.WEBHOOK_SECRET;
router.post(                                                             // stripe listen --forward-to http://127.0.0.1:5001/feastexpress-4b58f/us-central1/app/api/products/webhook
                                                                           // stripe trigger payment_intent.succeeded
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let eventType;
    let data;

    if (endpointSecret) {
      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      console.log(data);
      stripe.customers.retrieve(data.customer).then((customer) => {
        // console.log("customerDetails",customer);
        // console.log("Data",data);
        createOrder(customer, data, res);
      });
    }

    // switch (event.type) {
    //   case 'payment_intent.succeeded':
    //     const paymentIntentSucceeded = event.data.object;
    //     // Then define and call a function to handle the event payment_intent.succeeded
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }

    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
  }
);
const createOrder = async (customer, intent, res) => {
  try {
    const orderId = Date.now();
    const data = {
      intentId: intent.id,
      orderId: orderId,
      amount: intent.amount_total,
      created: intent.created,
      payment_method_types: intent.payment_method_types,
      status: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      userId: customer.metadata.user_id,
      items: JSON.parse(customer.metadata.cart),
      total: customer.metadata.total,
      sts: "preparing",
    };
    await db.collection("order").doc(`/${orderId}/`).set(data);
    deleteCart(customer.metadata.user_id, JSON.parse(customer.metadata.cart));
    console.log("000000000000000000000000000000000");

    return res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
  }
};
const deleteCart = async (userId, items) => {                             // if payment is successful, delete the cart items
  // console.log(userId);
  console.log("**************************************");
  items.map(async (data) => {
    console.log("--------------------inside-------", userId, data.productId);
    await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`${data.productId}`)
      .delete()
      .then(() => console.log("--------------------success_____"));
  });
};
// orders
router.get("/orders", async (req, res) => {
  (async () => {
    try {
      let query = db.collection("order");
      let response = [];
      await query.get().then((querysnap) => {
        let docs = querysnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error :${err}` });
    }
  })();
});

// update the order sts

router.post("/updateOrder/:order_id", async (req, res) => {
  const order_id = req.params.order_id;
  const sts = req.query.sts;

  try {
    const updatedItem = await db

      .collection("order")
      .doc(`/${order_id}/`)
      .update({ sts });

    return res.status(200).send({ success: true, data: updatedItem });
  } catch (error) {
    return res.send({ success: false, msg: `Error : ,${error}` });
  }
});

module.exports = router;
