import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const users = [
  {
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "Admin"
  },
  {
    email: "editor@example.com",
    password: "editor123",
    name: "Editor User",
    role: "Editor"
  },
  {
    email: "viewer@example.com",
    password: "viewer123",
    name: "Viewer User",
    role: "Viewer"
  }
];

function createJWT(user) {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const payload = {
    email: user.email,
    name: user.name,
    role: user.role,
    iat: Date.now(),
    exp: Date.now() + 60 * 60 * 1000
  };

  const encode = (data) =>
    btoa(JSON.stringify(data))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  return `${encode(header)}.${encode(payload)}.mock-signature`;
}

function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];

    const base64 = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    sessionStorage.getItem("jwt_token")
  );

  const user = token ? decodeJWT(token) : null;

  const login = (email, password) => {
    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!foundUser) {
      return false;
    }

    const newToken = createJWT(foundUser);

    sessionStorage.setItem(
      "jwt_token",
      newToken
    );

    setToken(newToken);

    return true;
  };

  const logout = () => {
    sessionStorage.removeItem("jwt_token");
    setToken(null);
  };

  const hasRole = (roles) => {
    if (!user) return false;

    return roles.includes(user.role);
  };

  const hasPermission = (permission) => {
    if (!user) return false;

    const permissions = {
      Admin: [
        "view",
        "create",
        "edit",
        "delete",
        "manage-users"
      ],
      Editor: [
        "view",
        "create",
        "edit"
      ],
      Viewer: [
        "view"
      ]
    };

    return permissions[user.role]?.includes(
      permission
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        hasRole,
        hasPermission,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}