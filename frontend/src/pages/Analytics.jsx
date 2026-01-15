import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/Analytics.css";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";
import "../styles/dashboard.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Analytics = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get("http://localhost:3001/api/tasks");
      setTasks(res.data);
    };
    fetchTasks();
  }, []);

  const pending = tasks.filter(t => t.status === "Pending").length;
  const completed = tasks.filter(t => t.status === "Completed").length;

  const high = tasks.filter(t => t.priority === "High").length;
  const medium = tasks.filter(t => t.priority === "Medium").length;
  const low = tasks.filter(t => t.priority === "Low").length;

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h1>Analytics</h1>

        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Task Status</h3>
            <Pie
              data={{
                labels: ["Pending", "Completed"],
                datasets: [
                  {
                    data: [pending, completed],
                    backgroundColor: ["#f59e0b", "#10b981"]
                  }
                ]
              }}
            />
          </div>

          <div className="task-card">
            <h3>Task Priority</h3>
            <Bar
              data={{
                labels: ["High", "Medium", "Low"],
                datasets: [
                  {
                    label: "Tasks",
                    data: [high, medium, low],
                    backgroundColor: "#2563eb"
                  }
                ]
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
