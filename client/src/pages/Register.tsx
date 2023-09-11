import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Lösenorden matchar inte.');
      return;
    }

    // Skicka användaruppgifterna till din backend för registrering
    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          });
          
      if (response.ok) {
        // Användaren har registrerats framgångsrikt
        // Du kan nu logga in användaren om det behövs
        alert('Registreringen lyckades! Logga in för att fortsätta.');
        navigate('/login')
      } else {
        // Något gick fel vid registreringen
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.error('Registreringsfel:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Registrera dig</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Namn</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Upprepa lösenord</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">
          Registrera
        </button>
      </form>
      <p className="login-link">
        Har du redan ett konto?{' '}
        <Link to="/login">Logga in här</Link>
      </p>
    </div>
  );
};

export default Register;


// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Register.css';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSubmit = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     // Implementera din registreringslogik här
//     // Kontrollera att lösenordet och upprepningen matchar innan registrering
//     if (password === confirmPassword) {
//       // Registrera användaren här
//     } else {
//       alert('Lösenorden matchar inte.');
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Registrera dig</h2>
//       <form className="register-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Namn</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">E-post</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Lösenord</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="confirmPassword">Upprepa lösenord</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="register-button">
//           Registrera
//         </button>
//       </form>
//       <p className="login-link">
//         Har du redan ett konto?{' '}
//         <Link to="/login">Logga in här</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;
