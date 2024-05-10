import { useState } from "react";
import "../form/Form.css";
import { API_ENDPOINT } from "../../constants/endpoint";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async(e) => {
    // add to backend logic
    e.preventDefault();
    
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({name , desc})
    });

    if(!response.ok){
      console.log("Error creating task");
    }



    } catch (error) {
      console.log("Error creating task" , error);
    }

    console.log(`task : ${name} - Desc : ${desc}`);

    setName("");
    setDesc("");

    navigate("/");
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Add Task</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <textarea
            type="text"
            placeholder="Enter Task Description..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>

        <button className="add-btn" type="submit">Add Task </button>
      </form>
    </div>
  );
};

export default Form;
