const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/Task');
const { protect } = require('../middleware/authMiddleware'); // ✅ correct import

// Get all tasks
router.get('/', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single task
router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: 'Invalid task ID' });

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ message: 'Unauthorized' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create task
router.post('/', protect, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const newTask = new Task({ title, description, userId: req.user.id });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update task
router.put('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: 'Invalid task ID' });

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ message: 'Unauthorized' });

    if (title) task.title = title;
    if (description) task.description = description;
    if (status && ['pending', 'completed'].includes(status)) task.status = status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete task
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: 'Invalid task ID' });

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ message: 'Unauthorized' });

    await task.remove();
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
