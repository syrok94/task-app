import { useEffect, useState } from "react";
import "../tasks/Task.css";
import { API_ENDPOINT } from "../../constants/endpoint.js";
import Modal from "../modal/Modal.jsx";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await fetch(API_ENDPOINT);
      if (!res.ok) {
        throw new Error("Error fetching tasks");
      }
      const data = await res.json();
      setTasks(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (task) => {
    const DELETE_API = `${API_ENDPOINT}/${task._id}`;

    try {
      const res = await fetch(DELETE_API, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        return;
      }

      await fetchData();

      res.send("task deleted succesfully!!");
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const handleEditTask = async (editedTask) => {
    const EDIT_API = `${API_ENDPOINT}/${selectedTask._id}`;
    try {
      const res = await fetch(EDIT_API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedTask),
      });

      // console.log(token);

      if (!res.ok) {
        throw new Error("Error updating task");
      }

      await fetchData();
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  const handleView = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="tasks-container">
      <h2 className="task-header">All Tasks</h2>
      <div className="tt-mid">
        {tasks.length > 0 &&
          tasks.map((task) => (
            <div className="task" key={task._id}>
              <p className="task-name">{task.name}</p>
              <div className="action-buttons">
                <button className="btn-view" onClick={() => handleView(task)}>
                  View
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(task)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        {tasks.length === 0 && <p>No tasks found.</p>}
      </div>

      {showModal && selectedTask && (
        <Modal
          name={selectedTask.name}
          desc={selectedTask.desc}
          handleCloseModal={handleCloseModal}
          handleEditTask={handleEditTask}
        />
      )}
    </div>
  );
};

export default Task;
