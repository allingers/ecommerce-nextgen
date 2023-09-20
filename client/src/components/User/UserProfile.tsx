import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderHistory from '../OrderHistory/OrderHistory';
import { useAuth } from '../../context/AuthContext'

import './UserProfile.css';

interface UserData {
  user: {
    stripeCustomerId: string;
  };
}

const UserProfile: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        logout();
        navigate('/');
      } else {
        console.error('Utloggning misslyckades');
      }
    } catch (error) {
      console.error('Något gick fel:', error);
    }
  };

  // Hämta userData från localStorage
  const userDataJson = localStorage.getItem('userData');
  const userData: UserData | null = userDataJson ? JSON.parse(userDataJson) : null;

  return (
    <div className='user-profile'>
      <h2>Min sida</h2>
      <button onClick={handleLogout}>Logga ut</button>
      {userData && <OrderHistory customerId={userData.user.stripeCustomerId} />}

    </div>
  );
};

export default UserProfile;