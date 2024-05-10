import { useState } from "react";
import "../navbar/Navbar.css";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="nav-container">
      <div className="app-name">TASK MANAGEMENT APP</div>
      <div
        className={`menu-btn ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className={`menu-items ${menuOpen ? "open" : ""}`}>
        {!isLoggedIn && (
          <Link to="/register">
            <button className="btn reg">SignUp</button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/login">
            <button className="btn log">Login</button>
          </Link>
        )}

        {isLoggedIn && (
          <Link to="/">
            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
