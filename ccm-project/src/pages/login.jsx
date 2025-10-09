import React, { useState } from "react";
import { account, ID } from "@/lib/appwrite";
import { useAuth } from "@/context/authContext";
import { Navigate } from "react-router";

export const Login = () => {
	// const [loggedInUser, setLoggedInUser] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const { login, loggedInUser, logout } = useAuth();

	  if (loggedInUser) {
			return <Navigate to="/home" />;
		}

	return (
		<div>
			<p>
				{loggedInUser ? `Logged in as ${loggedInUser.name}` : "Not logged in"}
			</p>

			<form>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<button type="button" onClick={() => login(email, password)}>
					Login
				</button>

				<button
					type="button"
					onClick={async () => {
						await account.create({
							userId: ID.unique(),
							email,
							password,
							name,
						});
						login(email, password);
					}}
				>
					Register
				</button>

				<button type="button" onClick={logout}>
					Logout
				</button>
			</form>
		</div>
	);
};

export default Login;
