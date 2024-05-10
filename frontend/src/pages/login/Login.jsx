import { useState } from "react";
import "../login/Login.css";
import { AUTH_ENDPOINT } from "../../constants/endpoint";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  
  const LOGIN_ENDPOINT = `${AUTH_ENDPOINT}/login`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return response.status(404).json({ message: "error login user" });
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn" , true);

      console.log("User Login successfully!");

      navigate("/");
    } catch (error) {
      console.log("Server Error");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="container">
        <h2 className="register-header">Login Here </h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="submit" type="submit">
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
