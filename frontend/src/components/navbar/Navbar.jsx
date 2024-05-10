import { useState } from "react";
import "../navbar/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
        <Link to="/register">
          <button className="btn reg">SignUp</button>
        </Link>
        <Link to="/login">
          <button className="btn log">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
