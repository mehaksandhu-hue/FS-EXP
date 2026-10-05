import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Users() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <header className="header">
        <div>
          <h1>User Management</h1>
          <p>Admin Panel</p>
        </div>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Dashboard
        </button>
      </header>

      <main className="content">
        <section className="card">
          <h2>Users</h2>

          <div className="user-row">
            <strong>Admin User</strong>
            <span>Admin</span>
          </div>

          <div className="user-row">
            <strong>Editor User</strong>
            <span>Editor</span>
          </div>

          <div className="user-row">
            <strong>Viewer User</strong>
            <span>Viewer</span>
          </div>

          <p>
            Logged in as:{" "}
            <strong>{user?.role}</strong>
          </p>
        </section>
      </main>
    </div>
  );
}