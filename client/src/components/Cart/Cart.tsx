import React, { useState } from 'react';
import LoginMessage from '../Messages/LoginMessage';
import { useAuth } from '../../context/AuthContext'; 
import { useCart } from '../../context/CartContext';

import '../Cart/Cart.css';

interface CartProps {
  removeFromCart: (productId: string) => void;
}

const Cart: React.FC<CartProps> = ({ removeFromCart }) => {
  const [showLoginMessage, setShowLoginMessage] = useState<boolean>(false);
  const { isLoggedIn } = useAuth(); // Använd useAuth för att hämta användarstatusen
  const { cart } = useCart();
  const isCartEmpty = cart.length === 0;

  const handleStripeCheckout = async () => {
    if (!isLoggedIn) {
      setShowLoginMessage(true); // Visa meddelandet om användaren inte är inloggad
      return;
    }

    try {
      const customerData = localStorage.getItem('userData')
      // Skicka en förfrågan till backend för att skapa en Checkout-session
      const response = await fetch('http://localhost:3000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart, customerData:customerData }),
      });

      if (!response.ok) {
        console.error('Det gick inte att skapa en Checkout-session.');
        return;
      }

      const { url, sessionId } = await response.json();
      localStorage.setItem('sessionId', sessionId)

      // Omdirigera användaren till Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Ett fel uppstod vid hantering av Stripe Checkout:', error);
    }
  };

  return (
    <div className="cart">
      <h2>Varukorg</h2>
      {isCartEmpty ? (
        <p className="empty-cart-txt">Varukorgen är tom</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.price}>
              <div className="product-info">
                <img src={item.image} alt={`Bild på ${item.name}`} />
                <span>{item.name}</span>
                <span className="cartitem-price">
                  {item.defaultPrice.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' })}
                </span>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Ta bort</button>
            </li>
          ))}
        </ul>
      )}
      <div className="checkoutBtn">
        <button
          onClick={handleStripeCheckout}
          disabled={isCartEmpty}
        >
          Slutför köp
        </button>
      </div>
      <div className="loginMessage-container">
        {showLoginMessage && !isLoggedIn && <LoginMessage />}
      </div>
    </div>
  );
};

export default Cart;








