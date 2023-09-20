import React, { useEffect, useState } from 'react';

interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  products: {
    product: string;
    quantity: number;
    price: number;
    totalPrice: number;
    currency: string;
    discount: number;
  }[];
  orderTotal: number;
  orderDate: string;
}

interface OrderHistoryProps {
  customerId: string;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ customerId }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/get-orders/${customerId}`);
        if (response.ok) {
          const { orders } = await response.json();
          setOrders(orders);
        } else {
          console.error('Fel vid hämtning av användarens ordrar:', response.statusText);
        }
      } catch (error) {
        console.error('Fel vid hämtning av användarens ordrar:', error);
      }
    };

    fetchUserOrders();
  }, [customerId]);

  return (
    <div className='order-history'>
      <h2>Orderhistorik: </h2>
      {orders.length === 0 ? (
        <p>Inga tidigare ordrar.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h4>Order-ID: {order.id}</h4>
              <p>E-post: {order.customerEmail}</p>
              <p>Orderdatum: {new Date(order.orderDate).toLocaleDateString()}</p>
              <ul>
                {order.products.map((product, index) => (
                  <li key={index}>
                    <h4 className='product-name'>Produkt: {product.product}</h4> 
                    <p> Antal: {product.quantity}</p> 
                    <p> Pris: {product.price} {product.currency}</p>
                  </li>
                ))}
              </ul>
              <p className='order-totalPrice'>Totalt: {order.orderTotal} {order.products[0].currency}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
