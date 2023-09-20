import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Home from './pages/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CartView from './components/Cart/CartView'; 
import UserProfile from './components/User/UserProfile';
import Confirmation from './pages/Confirmation';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/varukorg" element={<CartView />} /> {/* Använd CartView här */}
        <Route path="/min-sida" element={<UserProfile />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;


