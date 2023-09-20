import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext"; // Importera useCart
import "./Menu.css";

const Menu: React.FC<{}> = () => {
  const { isLoggedIn } = useAuth();
  const { cart } = useCart(); // Hämta varukorgsinformationen

  // Beräkna antalet produkter i varukorgen
  const cartItemCount = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <nav className="navbar">
      <div className="logo">
        <h2 className="logo">
          Next<span>Gen</span>
        </h2>
      </div>
      <ul className="menulinks">
        <li>
          <NavLink to="/">Hem</NavLink>
        </li>
        {isLoggedIn ? (
          <li>
            <NavLink to="/min-sida">Min sida</NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/login">Logga in</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/varukorg">
            Varukorg ({cartItemCount})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
