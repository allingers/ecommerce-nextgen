import  { useState } from 'react';
import "./Login.css"
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      // Implementera din inloggningslogik här
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
