import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Menu.css"

const Menu: React.FC <{}> = () => {
    const { isLoggedIn } = useAuth();

    return (
        <nav className="navbar"> 
            <div className="logo">
                <h2 className="logo">Next<span>Gen</span></h2>
            </div>
            <ul className="menulinks">
                <li>
                    <NavLink to="/">Hem</NavLink>
                </li>
                {isLoggedIn ? ( // Visa "Min sida" om användaren är inloggad
          <li>
            <NavLink to="/min-sida">Min sida</NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/login">Logga in</NavLink>
          </li>
        )}
                <li>
                {/* <ShoppingCartOutlined /> */}
                    <NavLink to="/varukorg">Varukorg</NavLink>
                </li>
            </ul>    
        </nav>
    )
}

export default Menu;