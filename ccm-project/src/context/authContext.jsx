import React, { useState, createContext, useEffect, useContext } from "react";
import { account, ID } from "@/lib/appwrite";

export const Auth = createContext();

export const AuthContext = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkUser = async () => {
			try {
				const user = await account.get();
				setLoggedInUser(user);
			} catch (error) {
				setLoggedInUser(null);
			} finally {
				setLoading(false);
			}
		};
		checkUser();
	}, []);

	async function login(email, password) {
  try {
		// Vérifie s'il y a déjà une session active
		await account.get(); // Si ça réussit, une session est déjà active
		console.log("Session déjà active");
	} catch (error) {
		// Si aucune session active, on peut en créer une
		await account.createEmailPasswordSession(email, password);
		const user = await account.get();
		setLoggedInUser(user);
	}
	}
	  async function logout() {
			await account.deleteSession({
				sessionId: "current",
			});
			setLoggedInUser(null);
		}

	return (
		<Auth.Provider value={{ loggedInUser, login, logout }}>{children}</Auth.Provider>
	);
};

export const useAuth = () => useContext(Auth);
