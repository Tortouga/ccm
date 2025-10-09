import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export function LoggedRoutes() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
