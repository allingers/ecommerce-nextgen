import React from 'react';
import { Product } from '../../Intefaces/productTypes';
import "../Cart/Cart.css"

interface CartProps {
  cart: Product[]; // Uppdatera attributnamnet till 'cart'
  removeFromCart: (productId: string) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart }) => {
  return (
    <div className="cart">
      <h2>Varukorg</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <div className="product-info">
              <img src={item.image} alt={`Bild på ${item.name}`} />
              <span>{item.name}</span>
              <span className='cartitem-price'>{item.price.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' })}</span>
            </div>
            <button onClick={() => removeFromCart(item.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
      {/* ... */}
    </div>
  );
};

export default Cart;






