import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const {
    user,
    token,
    logout,
    hasPermission
  } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="dashboard">
      <header className="header">
        <div>
          <h1>Dashboard</h1>
          <p>JWT + RBAC System</p>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="content">
        <section className="card welcome">
          <h2>
            Welcome, {user?.name}
          </h2>

          <div className="role-badge">
            Role: {user?.role}
          </div>
        </section>

        <section className="card">
          <h2>User Information</h2>

          <p>
            <strong>Name:</strong>{" "}
            {user?.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {user?.role}
          </p>
        </section>

        <section className="card">
          <h2>Your Permissions</h2>

          <div className="permissions">
            <p>
              View Posts:{" "}
              {hasPermission("view")
                ? "✅ Allowed"
                : "❌ Not Allowed"}
            </p>

            <p>
              Create Posts:{" "}
              {hasPermission("create")
                ? "✅ Allowed"
                : "❌ Not Allowed"}
            </p>

            <p>
              Edit Posts:{" "}
              {hasPermission("edit")
                ? "✅ Allowed"
                : "❌ Not Allowed"}
            </p>

            <p>
              Delete Posts:{" "}
              {hasPermission("delete")
                ? "✅ Allowed"
                : "❌ Not Allowed"}
            </p>

            <p>
              Manage Users:{" "}
              {hasPermission("manage-users")
                ? "✅ Allowed"
                : "❌ Not Allowed"}
            </p>
          </div>
        </section>

        <section className="card">
          <h2>Actions</h2>

          <div className="actions">
            {hasPermission("view") && (
              <button
                onClick={() =>
                  navigate("/posts")
                }
              >
                View Posts
              </button>
            )}

            {hasPermission("create") && (
              <button
                onClick={() =>
                  navigate("/posts")
                }
              >
                Create Post
              </button>
            )}

            {hasPermission("manage-users") && (
              <button
                onClick={() =>
                  navigate("/users")
                }
              >
                Manage Users
              </button>
            )}
          </div>
        </section>

        <section className="card">
          <h2>Decoded JWT</h2>

          <pre>
            {JSON.stringify(
              user,
              null,
              2
            )}
          </pre>
        </section>

        <section className="card">
          <h2>JWT Token</h2>

          <pre className="token">
            {token}
          </pre>
        </section>
      </main>
    </div>
  );
}