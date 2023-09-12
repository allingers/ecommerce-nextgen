import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CartView from './components/Cart/CartView'; 

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/varukorg" element={<CartView />} /> {/* Använd CartView här */}
      </Routes>
    </Router>
  );
}

export default App;


