/* eslint-disable react/prop-types */
import { useState } from "react";
import "../modal/Modal.css";

const Modal = ({ name, desc, handleCloseModal, handleEditTask }) => {
  const [edit, setEdit] = useState(true);

  const [editedName, setEditedName] = useState(name);
  const [editedDesc, setEditedDesc] = useState(desc);

  const handleSubmit = async (e) => {
    e.preventDefault();

    handleEditTask({ name: editedName, desc: editedDesc });
    handleCloseModal();
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  return (
    <div className="modal">
      {edit ? (
        <div className="modal-content">
          <span className="close-btn" onClick={handleCloseModal}>
            &times;
          </span>
          <h3>{name}</h3>
          <p>{desc}</p>
          <button className="edit-button" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      ) : (
        <div className="edit-modal modal-content">
          <span className="close-btn" onClick={handleCloseModal}>
            &times;
          </span>
          <h3>Edit Task</h3>
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="edit edit-name">
              <label htmlFor="editedName">Name:</label>
              <input
                type="text"
                id="editedName"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                required
              />
            </div>

            <div className="edit edit-desc">
              <label htmlFor="editedDesc">Description:</label>
              <textarea
                id="editedDesc"
                value={editedDesc}
                onChange={(e) => setEditedDesc(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="edit-btn-div"><button className="btn-save-changes" type="submit">
              Save
            </button></div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Modal;
