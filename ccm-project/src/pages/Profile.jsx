import { useAuth } from "@/context/authContext";

function Profile() {
	const { loggedInUser } = useAuth();

	if (!loggedInUser) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-black to-yellow-900 text-yellow-300 font-serif">
				<p className="text-xl">⏳ Chargement du profil...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-yellow-900 text-yellow-300 font-serif flex items-center justify-center px-4 py-12">
			<div className="relative bg-black/80 border border-yellow-400 rounded-[1rem] shadow-[0_0_20px_gold] p-8 w-full max-w-xl text-yellow-200">
				<h1 className="text-4xl font-bold text-center mb-6 tracking-widest text-yellow-300">
					🎲 Mon profil 🎲
				</h1>

				<div className="space-y-4 text-lg">
					<p>
						<span className="font-semibold">👤 Nom :</span> {loggedInUser.name}
					</p>
					<p>
						<span className="font-semibold">📧 Email :</span>{" "}
						{loggedInUser.email}
					</p>
					{/* Si tu veux afficher des infos de profil étendu (table users), ajoute ici */}
					<p>
						<span className="font-semibold">🏆 Victoires :</span>{" "}
						{loggedInUser.profile?.victories}
					</p>
					<p>
						<span className="font-semibold">💥 Défaites :</span>{" "}
						{loggedInUser.profile?.defeats}
					</p>
				</div>
			</div>
		</div>
	);
}

export default Profile;
