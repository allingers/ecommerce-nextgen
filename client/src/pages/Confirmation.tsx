import { useEffect, useState } from 'react';
import './Confirmation.css';

function Confirmation() {
  const [isPaymentVerified, setIsPaymentVerified] = useState<boolean | null>(null);
  const sessionId = localStorage.getItem('sessionId');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setIsPaymentVerified(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/check-payment-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ sessionId: sessionId }),
        });

        if (response.ok) {
          const { status } = await response.json();
          setIsPaymentVerified(status === 'paid');
        } else {
          console.error('Fel vid verifiering av betalningsstatus:', response.statusText);
          setIsPaymentVerified(false);
        }
      } catch (error) {
        console.error('Fel vid verifiering av betalningsstatus:', error);
        setIsPaymentVerified(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  useEffect(() => {
    const createOrder = async () => {
      if (isPaymentVerified && sessionId) {
        try {
          const response = await fetch('http://localhost:3000/api/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ sessionId: sessionId }),
          });

          if (response.ok) {
            localStorage.removeItem('sessionId');
          } else {
            console.error('Fel vid skapande av order:', response.statusText);
            localStorage.removeItem('sessionId');
          }
        } catch (error) {
          console.error('Fel vid skapande av order:', error);
        }
      }
    };

    createOrder();
  }, [sessionId, isPaymentVerified]);


  return (
    <div className="confirmation-container">
    {isPaymentVerified === null ? (
      <h2>Väntar på verifiering av betalning...</h2>
    ) : isPaymentVerified ? (
      <h2>Tack för ditt köp!</h2>
    ) : (
      <h2>Något gick fel</h2>
    )}

    <p>
      <a href="/min-sida">Fortsätt till "Min sida"</a>
    </p>
  </div>
);
}

export default Confirmation;
