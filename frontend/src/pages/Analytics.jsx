import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/Analytics.css";
import Footer from "../components/footer";
import anime from "animejs";


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
      const res = await axios.get("https://tasktrack-6tph.onrender.com/api/tasks");
      setTasks(res.data);
    };
    fetchTasks();

    anime({
      targets: ".analytics-card",
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(150),
      duration: 500,
      easing: "easeOutQuad"
    });
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
        <div className="page-header">
          <h1>Analytics</h1>
        </div>

        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Task Status</h3>
            <div className="chart-container">
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
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top"
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="analytics-card">
            <h3>Task Priority</h3>
            <div className="chart-container">
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
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Analytics;
