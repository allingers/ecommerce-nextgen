const express = require('express');
const router = express.Router();
const fs = require('fs');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Sökväg till JSON-fil där du sparar ordrar
const ordersFilePath = 'orders.json';

const getOrders = () => {
  try {
    const ordersData = fs.readFileSync(ordersFilePath, 'utf8');
    return JSON.parse(ordersData);
  } catch (error) {
    // Om filen inte finns eller inte kan läsas, börja med en tom lista
    return [];
  }
};

const saveOrders = (orders) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf8');
};

const generateOrderId = () => {
  return Math.random().toString(36).substring(2, 15);
};

router.post('/verify-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
    console.log(session.payment_status)
    if (session.payment_status !== "paid") {
      return res.status(400).json({ verified: false });
    }
    const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId);
    console.log('Session:', session); 
    const order = {
      customerName: session.customer_details.name,
      customerEmail: session.customer_details.email,
      products: line_items.data.map(item => {
        return {
          product: item.description,
          quantity: item.quantity,
          price: item.price.unit_amount / 100,
          totalPrice: item.amount_total * item.quantity / 100,
          currency: session.currency,
          discount: session.amount_discount
        };
      }),
      orderTotal: session.amount_total / 100
    };

    console.log('Order:', order);

    // Skapa ordern direkt här inuti verify-session
    const orders = getOrders();
    const newOrder = {
      id: generateOrderId(),
      ...order,
      orderDate: new Date().toISOString(),
    };
    orders.push(newOrder);
    saveOrders(orders);

    res.status(201).json({ newOrder });
  } catch (error) {
    console.error('Fel vid skapande av order:', error);
    res.status(500).json('Det gick inte att skapa ordern.');
  }
});

module.exports = router;





// const express = require('express');
// const router = express.Router();
// const fs = require('fs');
// const { disconnect } = require('process');
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// // Sökväg till JSON-fil där du sparar ordrar
// const ordersFilePath = 'orders.json';

// const getOrders = () => {
//     try {
//       const ordersData = fs.readFileSync(ordersFilePath, 'utf8');
//       return JSON.parse(ordersData);
//     } catch (error) {
//       // Om filen inte finns eller inte kan läsas, börja med en tom lista
//       return [];
//     }
//   };

//   const saveOrders = (orders) => {
//     fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf8');
//   };

// const generateOrderId = () => {
//     return Math.random().toString(36).substring(2, 15);
//   };

//   // Funktion för att skapa en ny order
// const createOrder = (ordersData) => {
//     const orders = getOrders();
//     const newOrder = {
//       id: generateOrderId(), 
//       ...ordersData,
//       orderDate: new Date().toISOString(),
//     };
//     orders.push(newOrder);
//     saveOrders(orders);
//     return newOrder;
//   };


// router.post('/verify-session', async (req, res) => {
//  try {
//     const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
//     if(session.payment_status !== "paid" ){
//         return res.status(400).json({verified: false})
//     }
//     const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId)
//     const order ={
//         customerName: session.customer_details.name,
//         customerEmail: session.customer_details.email,
//         products: line_items.data.map(item=> {
//             return {
//                 product: item.description,
//                 quantity: item.quantity,
//                 price: item.price.unit_amount /100,
//                 totalPrice: item.amount_total * item.quantity /100,
//                 currency: session.currency,
//                 discount: session.amount_discount
//             }
//         }),
//         orderTotal: session.amount_total /100
//     }
//     console.log('hÄÄÄÄÄÄÄR', line_items.data, line_items)
//     const newOrder = createOrder(ordersData); // Skapa ordern med funktionen createOrder
//     res.status(201).json({ newOrder}); 
//   } catch (error) {
//     console.error('Fel vid skapande av order:', error);
//     res.status(500).json('Det gick inte att skapa ordern.');
//   }
// })



// module.exports = router;
