import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Uppdatera sökvägen
import "./Login.css"

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Använd den uppdaterade AuthContext för att hämta login-funktionen

  const handleSubmit = async (e: FormEvent) => {
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
        // Inloggningen lyckades
        // Anropa login-funktionen från AuthContext för att uppdatera användarstatusen
        login(email, password);

        // Navigera användaren till startsidan eller annan lämplig plats
        navigate('/min-sida');
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
      <p>
        Har du inget konto?{' '}
        <Link to="/register">Registrera dig här</Link>
      </p>
    </div>
  );
};

export default Login;
