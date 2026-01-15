import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  const fetchTasks = async () => {
    try {
        const res = await axios.get("http://localhost:3001/api/tasks");
        setTasks(res.data);
    } catch (error) {
        console.error("Fetch tasks error:", error);
    }
    };



    useEffect(
        () => {
            fetchTasks();
        },
        []
    )

  const addTask = async () => {
    if (!title) return;

    await axios.post("http://localhost:3001/api/tasks", {
      title,
      priority
    });

    setTitle("");
    fetchTasks();
  };

  const markComplete = async (id) => {
    await axios.put(`http://localhost:3001/api/tasks/${id}`, {
      status: "Completed"
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3001/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h1>Tasks</h1>

        <div className="task-form">
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <div className="task-info">
                <h3>{task.title}</h3>

                <div className="task-meta">
                  <span className={`priority ${task.priority}`}>
                    {task.priority}
                  </span>

                  <span className="status">
                    {task.status}
                  </span>
                </div>
              </div>

              <div className="task-actions">
                {task.status !== "Completed" && (
                  <button
                    className="complete-btn"
                    onClick={() => markComplete(task._id)}
                  >
                    Complete
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Tasks;
