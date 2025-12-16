const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

// Create a new task
exports.createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Title is required');
  }

  const task = await Task.create({
    title,
    description,
    userId: req.user._id
  });

  res.status(201).json(task);
});

// Get all tasks for logged-in user
exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
});

exports.getTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({
    _id: id,
    userId: req.user._id,
  });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.json(task);
});

// Update a task
exports.updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id, userId: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;

  await task.save();
  res.json(task);
});

// Delete a task
exports.deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id, userId: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.deleteOne();
  res.json({ message: 'Task removed' });
});
