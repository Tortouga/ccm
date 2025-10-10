import React, { useState, createContext, useEffect, useContext } from "react";
import { account, ID } from "@/lib/appwrite";
import { Profile } from "@/lib/functions/profile";

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
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		checkUser();
	}, []);

	async function handleLogin(email, password) {
		try {
			await account.createEmailPasswordSession(email, password);
			const user = await account.get();
			setLoggedInUser(user);
		} catch (error) {
			console.error("Erreur de connexion:", error);
			throw error;
		}
	}

	async function handleRegister(userInfos) {
		const id = ID.unique();
		const response = await account.create({
			userId: id,
			email: userInfos.email,
			password: userInfos.password,
			name: userInfos.username,
		});
		if (response) {
			handleLogin(userInfos.email, userInfos.password);
			Profile.createProfile({ id: id, ...userInfos });
		}
	}

	async function handleLogout() {
		try {
			await account.deleteSession({
				sessionId: "current",
			});
			setLoggedInUser(null);
		} catch (error) {
			console.error("Erreur de déconnexion:", error);
			throw error;
		}
	}

	return (
		<Auth.Provider value={{ loggedInUser, handleLogin, handleLogout, loading, handleRegister }}>
			{children}
		</Auth.Provider>
	);
};

export const useAuth = () => useContext(Auth);
