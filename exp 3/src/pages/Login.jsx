import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const success = login(email, password);

    if (success) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>EXP3 Authentication</h1>

        <p className="subtitle">
          JWT + Role-Based Access Control
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {error && (
            <p className="error">{error}</p>
          )}

          <button type="submit">
            Login
          </button>
        </form>

        <div className="demo-box">
          <h3>Demo Accounts</h3>

          <p>
            <b>Admin:</b> admin@example.com /
            admin123
          </p>

          <p>
            <b>Editor:</b> editor@example.com /
            editor123
          </p>

          <p>
            <b>Viewer:</b> viewer@example.com /
            viewer123
          </p>
        </div>
      </div>
    </div>
  );
}