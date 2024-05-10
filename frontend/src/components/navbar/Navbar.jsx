/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "../navbar/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_ENDPOINT } from "../../constants/endpoint";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [userName, setUserName] = useState("");
  const token = localStorage.getItem("token");
  
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(`${AUTH_ENDPOINT}/current`,{
        method:"GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      });

      const currentUser = await response.json();

      if (!currentUser) {
        console.log("No user name present");
      }

        console.log(currentUser);

      setUserName(currentUser.username);

    } catch (error) {
      console.log("unable to fech current user!!");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
     localStorage.clear();
      navigate("/");
      window.location.reload();
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

        {isLoggedIn && <div className="profile">
          <p>Hello🖐,{userName}</p>
        </div>}

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
