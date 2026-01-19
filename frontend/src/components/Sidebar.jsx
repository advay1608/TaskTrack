import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};


  return (
    <>
      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div className={`sidebar ${open ? "open" : ""}`}>
        <h2>TaskTrack</h2>

        <nav>
          <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/tasks" onClick={() => setOpen(false)}>Tasks</Link>
          <Link to="/analytics" onClick={() => setOpen(false)}>Analytics</Link>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
