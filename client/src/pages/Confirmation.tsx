import { useEffect, useState } from 'react';

function Confirmation() {
  const [isPaymentVerified, setIsPaymentVerified] = useState<boolean>(false);

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    
    const verifyPayment = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/verify-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ sessionId: sessionId }),
        });

        if (response.ok) {
          const { verified } = await response.json();
          setIsPaymentVerified(verified);
          
          if (verified) {
            localStorage.removeItem('sessionId');
          }
        } else {
          console.error('Fel vid verifiering av session:', response.statusText);
          setIsPaymentVerified(false);
        }
      } catch (error) {
        console.error('Fel vid verifiering av session:', error);
        setIsPaymentVerified(false);
      }
    };

    verifyPayment();
  }, []);

  return (
    <>
      {isPaymentVerified ? <h2>Tack för ditt köp!</h2> : <h2>Något gick fel</h2>}
    </>
  );
}

export default Confirmation;




