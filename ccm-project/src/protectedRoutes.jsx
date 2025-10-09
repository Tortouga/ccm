import React from "react";
import { useAuth } from "@/context/authContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Home } from "./pages/home";

export const ProtectedRoutes = () => {
	const { loggedInUser } = useAuth();

	return loggedInUser ? <Home /> : <Navigate to="/login" />;
};
