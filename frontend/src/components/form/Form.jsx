import { useState } from "react";
import "../form/Form.css";
import { API_ENDPOINT } from "../../constants/endpoint";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    // add to backend logic
    e.preventDefault();

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, desc }),
      });

      if (!response.ok) {
        toast.error("You need to login first !!");
        console.log("Error creating task");
        return;
      }
      
    } catch (error) {
      toast.error("Error Creating Task!!");
      console.log("Error creating task", error);
    }

    console.log(`task : ${name} - Desc : ${desc}`);

    toast.success("Task Created Succesfully!!");
    setName("");
    setDesc("");
    window.location.reload();
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

        <button className="add-btn" type="submit">
          Add Task{" "}
        </button>
      </form>

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

export default Form;
