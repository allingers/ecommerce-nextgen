import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from "./components/Menu/Menu"
import Home from './pages/Home';


function App() {
  return (
    <Router>
        <Menu></Menu>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Lägg till fler routes här om du har fler sidor */}
      </Routes>
    </Router>
  );
}

export default App;