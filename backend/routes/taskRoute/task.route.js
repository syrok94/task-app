const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../../middleware/auth.js");
const {
  getAllTasks,
  getSingleTask,
  deleteTask,
  updateTask,
  createTask,
} = require("./task.controller.js");


router.get("/", getAllTasks)
router.get("/:id", getSingleTask)
router.post("/", createTask)
router.put("/:id",authenticateToken, updateTask)
router.delete("/:id", authenticateToken , deleteTask);

module.exports = router;
