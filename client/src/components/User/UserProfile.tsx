import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./UserProfile.css"


const UserProfile: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/logout', {
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

  return (
    <div className='user-profile'>
      <h2>Min sida</h2>
      <p>Välkommen</p>
      <button onClick={handleLogout}>Logga ut</button> {/* Logga ut-knappen */}
    </div>
    
  );
};

export default UserProfile;
