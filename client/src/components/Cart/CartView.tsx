import React from 'react';
import Cart from './Cart';
import { useCart } from '../../context/CartContext';
import "../Cart/Cart.css"

const CartView: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="cart-view">
      <Cart cart={cart} removeFromCart={removeFromCart} />

      {/* Annat innehåll här */}
    </div>
  );
};

export default CartView;



