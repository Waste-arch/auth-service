import { Link } from "react-router-dom";
import "../Assets/Styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar border-slate-700 border-b-2">
            <div className="navbar-brand">
                <Link to="/">Auth Service</Link>{" "}
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/file">Auth Service</Link>
                </li>{" "}
                <li>
                    <Link to="/login">Login</Link>
                </li>{" "}
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>{" "}
                <li>
                    <Link to="/profile">Profile</Link>
                </li>{" "}
            </ul>
        </nav>
    );
};

export default Navbar;
