import React from "react";
import { useAuth } from "@/context/authContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Home } from "./pages/home";

export const ProtectedRoutes = () => {
	const { loggedInUser, loading } = useAuth();

	if (loading) {
		return <div>Chargement...</div>; // Ou un spinner
	}

	return loggedInUser ? <Outlet /> : <Navigate to="/login" />;
};
