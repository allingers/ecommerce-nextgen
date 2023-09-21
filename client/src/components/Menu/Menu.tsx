import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext"; 
import "./Menu.css";

const Menu: React.FC<{}> = () => {
  const { isLoggedIn } = useAuth();
  const { cart } = useCart(); 

  const cartItemCount = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <>
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
    <div className="discount-banner">
        <p>Använd koden <span>RABATT10</span> för 10% rabatt på hela sortimentet</p>
      </div>
    </>
  );
};

export default Menu;
