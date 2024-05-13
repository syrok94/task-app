const asyncHandler = require("express-async-handler");
const Task = require("../../models/task.model");
const User = require("../../models/user.model");

//@desc get all tasks
//@route GET /tasks
//@access public

const getAllTasks = asyncHandler(async (req, res) => {

  try {
    //getting all the task in sorted order of time at which it is craeted
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    console.error("task not fetched!!", err);
    res.status(500).json({ message: "internal server error" });
  }
});

//@desc create task
//@route POST /tasks
//@access private

const createTask = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { name, desc } = req.body;

    //check if name and description is provided
    if (!name || !desc) {
      res.status(400);
      throw new Error("All Fiels are mandatory!");
    }

    const task = Task.create({
      name,
      desc,
    });

    console.log("Task Created!!");
    res.status(201).json(task);

  } catch (err) {
    console.error("task not created!!", err);
    res.status(500).json({ message: "internal server error" });
  }
});

//@desc get single tasks by id
//@route GET /tasks/:id
//@access public

const getSingleTask = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    console.error("task not found!!", err);
    res.status(500).json({ message: "internal server error" });
  }
});

//@desc update task
//@route PUT /tasks/:id:
//@access private

const updateTask = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task!!", err);
    res.status(500).json({ message: "internal server error" });
  }
});

//@desc delete tasks
//@route DELETE /tasks/:id
//@access private

const deleteTask = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await Task.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({ message: "Task Not Found!!" });
    }

    res.status(200).json({ message: "Task Deleted Succesfully !!" });
  } catch (err) {
    console.error("Error deleting data !!", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  getAllTasks,
  deleteTask,
  createTask,
  getSingleTask,
  updateTask,
};
