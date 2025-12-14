const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

router.route("/")
  .post(protect, createTask)
  .get(protect, getTasks);

router.route("/:id")
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
