import { NavLink } from "react-router-dom";
import "./Menu.css"

const Menu: React.FC <{}> = () => {

    return (
        <nav className="navbar"> 
            <div className="logoContainer">
                <h2 className="logo">Next<span>Gen</span></h2>
            </div>
            <ul className="menulinks">
                <li>
                    <NavLink to="/">Hem</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Logga in</NavLink>
                </li>
                <li>
                {/* <ShoppingCartOutlined /> */}
                    <NavLink to="/varukorg">Varukorg</NavLink>
                </li>
            </ul>    
        </nav>
    )
}

export default Menu;