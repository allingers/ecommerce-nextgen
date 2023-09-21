import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Home from './pages/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CartView from './components/Cart/CartView'; 
import UserProfile from './components/UserProfile/UserProfile';
import Confirmation from './pages/Confirmation';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/varukorg" element={<CartView />} />
          <Route path="/min-sida" element={<UserProfile />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;




