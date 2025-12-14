import React, { useState, useEffect } from "react";
import api from "../services/api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      setMessage({ type: "error", text: "Failed to fetch tasks" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD / UPDATE TASK
  const saveTask = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);
      if (editId) {
        await api.put(`/tasks/${editId}`, { title });
        setMessage({ type: "success", text: "Task updated successfully" });
        setEditId(null);
      } else {
        await api.post("/tasks", { title });
        setMessage({ type: "success", text: "Task added successfully" });
      }
      setTitle("");
      fetchTasks();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to save task",
      });
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      setLoading(true);
      await api.delete(`/tasks/${id}`);
      setMessage({ type: "success", text: "Task deleted successfully" });
      fetchTasks();
    } catch {
      setMessage({ type: "error", text: "Failed to delete task" });
    } finally {
      setLoading(false);
    }
  };

  // TOGGLE STATUS (✔ FIXED)
  const toggleComplete = async (task) => {
    const newStatus =
      task.status === "completed" ? "pending" : "completed";

    try {
      setLoading(true);
      await api.put(`/tasks/${task._id}`, { status: newStatus });
      fetchTasks();
    } catch {
      setMessage({ type: "error", text: "Failed to update task status" });
    } finally {
      setLoading(false);
    }
  };

  const editTask = (task) => {
    setTitle(task.title);
    setEditId(task._id);
  };

  // FILTER + SEARCH (✔ FIXED)
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && task.status === "completed") ||
      (filter === "Pending" && task.status === "pending");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container">
      <h2>Tasks</h2>

      {message && (
        <div className={message.type === "error" ? "error" : "success"}>
          {message.text}
        </div>
      )}

      {/* ADD / EDIT */}
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />
      <button onClick={saveTask} disabled={loading}>
        {editId ? "Update Task" : "Add Task"}
      </button>

      {/* SEARCH & FILTER */}
      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* LIST */}
      {loading && <p>Loading...</p>}
      {!loading && filteredTasks.length === 0 && <p>No tasks found</p>}

      <ul>
        {filteredTasks.map((task) => (
          <li key={task._id} style={{ marginTop: 10 }}>
            <input
              type="checkbox"
              checked={task.status === "completed"}
              onChange={() => toggleComplete(task)}
            />

            <span
              style={{
                marginLeft: 10,
                textDecoration:
                  task.status === "completed" ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>

            <button
              onClick={() => editTask(task)}
              disabled={loading}
              style={{ marginLeft: 10 }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              disabled={loading}
              style={{ marginLeft: 5 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
