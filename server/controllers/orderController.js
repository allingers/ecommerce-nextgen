const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const fs = require('fs');

const ordersFilePath = 'orders.json';

const getOrders = () => {
  try {
    const ordersData = fs.readFileSync(ordersFilePath, 'utf8');
    return JSON.parse(ordersData);
  } catch (error) {
    return [];
  }
};

const saveOrders = (orders) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf8');
};

const generateOrderId = () => {
  return Math.random().toString(36).substring(2, 15);
};

router.post('/create-order', async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

      const order = {
        id: generateOrderId(),
        customerId: session.customer,
        customerName: session.customer_details.name,
        customerEmail: session.customer_details.email,
        products: lineItems.data.map((item) => {
          return {
            product: item.description,
            quantity: item.quantity,
            price: item.price.unit_amount / 100,
            totalPrice: item.amount_total * item.quantity / 100,
            currency: session.currency,
            discount: session.amount_discount,
          };
        }),
        orderTotal: session.amount_total / 100,
        orderDate: new Date().toISOString()
      };

      const orders = getOrders();
      orders.push(order);
      saveOrders(orders);

      res.status(201).json({ order });
    } else {
      res.status(400).json({ message: 'Betalningen är inte verifierad.' });
    }
  } catch (error) {
    console.error('Fel vid skapande av order:', error);
    res.status(500).json({ message: 'Det gick inte att skapa ordern.' });
  }
});

router.get('/get-orders', (req, res) => {
    try {
      const orders = getOrders();
  
      res.status(200).json({ orders });
    } catch (error) {
      console.error('Fel vid hämtning av ordrar:', error);
      res.status(500).json({ message: 'Det gick inte att hämta ordrar.' });
    }
  });

  router.get('/get-orders/:customerId', (req, res) => {
    const customerId = req.params.customerId;
    const orders = getOrders(); 
    
    const userOrders = orders.filter((order) => order.customerId === customerId);
    res.status(200).json({ orders: userOrders });
    
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
