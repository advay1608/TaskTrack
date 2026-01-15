import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import Footer from "../components/footer";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get("http://localhost:3001/api/tasks");
      setTasks(res.data);
    };
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const pendingTasks = tasks.filter(t => t.status === "Pending").length;
  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h1>Dashboard</h1>
        <p className="welcome-text">
          Welcome to <strong>TaskTrack</strong> 👋  
          Here’s a quick overview of your tasks.
        </p>

        <div className="card-grid">
          <div className="summary-card">
            <h3>Total Tasks</h3>
            <p>{totalTasks}</p>
          </div>

          <div className="summary-card">
            <h3>Completed</h3>
            <p>{completedTasks}</p>
          </div>

          <div className="summary-card">
            <h3>Pending</h3>
            <p>{pendingTasks}</p>
          </div>
        </div>

        <div className="recent-section">
          <h2>Recent Tasks</h2>

          {recentTasks.length === 0 ? (
            <p className="muted">No tasks created yet.</p>
          ) : (
            <ul className="recent-list">
              {recentTasks.map(task => (
                <li key={task._id}>
                  <span>{task.title}</span>
                  <span className={`status ${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
