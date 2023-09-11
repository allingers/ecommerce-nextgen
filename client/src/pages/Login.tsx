import  { useState } from 'react';
import "./Login.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
    
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
        if (response.ok) {
          console.log("LYCKAD INLOGGNING")
          navigate('/')

          // Inloggningen lyckades
          // Du kan utföra ytterligare åtgärder här, som att lagra användarens session
          // eller omdirigera användaren till en annan sida
        } else {
          // Inloggningen misslyckades, visa felmeddelande för användaren
          const data = await response.json();
          alert(data.error);
        }
      } catch (error) {
        console.error('Inloggningsfel:', error);
      }
    };
  

  return (
    <div className="login-container">
    <h2>Logga in</h2>
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">E-post</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Lösenord</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="login-button">
        Logga in
      </button>
    </form>
    {/* Länken till registreringssidan */}
    <p>
        Har du inget konto?{' '}
        <Link to="/register">Registrera dig här</Link>
      </p>
  </div>
);
};


export default Login;
