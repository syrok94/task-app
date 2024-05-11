import { useState } from "react";
import "../Register/Register.css";
import { AUTH_ENDPOINT } from "../../constants/endpoint";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const REGISTER_ENDPOINT = `${AUTH_ENDPOINT}/register`;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(REGISTER_ENDPOINT, {
        method: "POST",
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({ name, email, password }), 
      });
  
      if (!response.ok) {
        const errorData = await response.json(); 
        console.error("Error registering user:", errorData.message);
        toast.error("Register Again!!");
        return;
      }
      

      toast.success("User Registered Successfully !!");
      console.log("User registered successfully!");
      navigate("/login");
     
    } catch (error) {
      console.error("Server Error:", error);

    }
  
    setName("");
    setEmail("");
    setPassword("");
  };
  

  return (
    <div className="register-container">
      <div className="container">
        <h2 className="register-header">Register Here </h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            SignUp
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Register;
