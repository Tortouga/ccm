import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { Navigate } from "react-router";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [mode, setMode] = useState("login"); // "login" ou "register"
	const navigate = useNavigate();
	const { handleLogin, loggedInUser, handleRegister } = useAuth();

	// Redirection si déjà connecté
	useEffect(() => {
		if (loggedInUser) {navigate("/");}
	}, [loggedInUser, navigate]);

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			if (mode === "login") {
				await handleLogin(email, password);
			} else {
				await handleRegister({ email, password, username });
			}
			navigate("/");
		} catch (error) {
			alert("⚠️ Accès refusé. Identifiants invalides.");
			console.error(error);
		}
	};

	// 🎲 Effet jetons dynamiques
	useEffect(() => {
		const handleMouseMove = (e) => {
			const tokens = document.querySelectorAll(".token");
			tokens.forEach((token) => {
				const offsetX = (e.clientX / window.innerWidth - 0.5) * 10;
				const offsetY = (e.clientY / window.innerHeight - 0.5) * 10;
				token.style.transform = `rotate(15deg) translate(${offsetX}px, ${offsetY}px)`;
			});
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<div className="relative min-h-screen bg-gradient-to-br from-red-900 via-black to-yellow-900 flex items-center justify-center font-serif overflow-hidden">
			{/* 🎰 Jetons dynamiques */}
			<div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
				{[...Array(25)].map((_, i) => {
					const colors = ["bg-yellow-400", "bg-red-500", "bg-white"];
					const color = colors[Math.floor(Math.random() * colors.length)];
					return (
						<span
							key={i}
							className={`token ${color} rounded-full w-2 h-2 absolute shadow-lg`}
							style={{
								top: `${Math.random() * 100}%`,
								left: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 5}s`,
								animationDuration: `${2 + Math.random() * 3}s`,
							}}
						/>
					);
				})}
			</div>

			{/* 🃏 Formulaire Casino */}
			<form
				onSubmit={onSubmit}
				className="relative z-10 bg-black/80 border border-yellow-400 rounded-xl shadow-[0_0_20px_gold] p-8 w-full max-w-md text-yellow-200"
			>
				<h2 className="text-4xl font-bold mb-6 text-center text-yellow-300 tracking-widest">
					{mode === "login"
						? "🎰 Connexion au Casino"
						: "📝 Inscription au Casino"}
				</h2>

				{mode === "register" && (
					<>
						<label className="block mb-2 text-sm font-medium text-yellow-200">
							🎭 Nom d'utilisateur
						</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full mb-4 px-4 py-2 rounded-lg bg-red-950 border border-yellow-400 text-yellow-100 placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
							placeholder="Nom d'utilisateur"
							required
						/>
					</>
				)}

				{/* <label className="block mb-2 text-sm font-medium text-yellow-200">
					🎲 Identifiant
				</label> */}
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full mb-4 px-4 py-2 rounded-lg bg-red-950 border border-yellow-400 text-yellow-100 placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
					placeholder="ID"
					required
				/>

				<label className="block mb-2 text-sm font-medium text-yellow-200">
					💰 Mot de passe
				</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full mb-6 px-4 py-2 rounded-lg bg-red-950 border border-yellow-400 text-yellow-100 placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"	placeholder="password"required
				/>

				<button
					type="submit"
					className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-lg transition duration-300 shadow-[0_0_10px_gold]"
				>
					{mode === "login" ? "🎲 Let's Play! 🎲" : "📝 S'inscrire"}
				</button>
				<p className="mt-4 text-center text-sm">
					{mode === "login" ? "Pas encore inscrit ?" : "Déjà un compte ?"}{" "}
					<button
						type="button"
						onClick={() => setMode(mode === "login" ? "register" : "login")}
						className="underline text-yellow-300 hover:text-yellow-400"
					>
						{mode === "login" ? "Créer un compte" : "Se connecter"}
					</button>
				</p>
			</form>
		</div>
	);
}

export default Login;
