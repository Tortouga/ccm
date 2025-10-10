import { Link } from "react-router-dom";
import { useAuth } from "@/context/authContext";

export function Home() {
    const { loggedInUser } = useAuth();

	return (
		<div className=" mx-auto bg-gradient-to-br from-red-900 via-black to-yellow-900 text-yellow-300 font-serif p-8">
			<h1 className="text-4xl font-bold text-center mb-10 animate-fade-in tracking-widest shadow-[0_0_10px_gold]">
				{loggedInUser?.name
					? `👋 Bienvenue ${loggedInUser.name} 👋`
					: "🎲 Accueil du Casino"}
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mt-16">
				{/* ♥ Carte Cœur */}
				<Link to="/game" className="relative bg-gradient-to-br from-white to-red-100 text-red-700 border-[6px] border-red-600 rounded-[1rem] shadow-[0_0_20px_rgba(255,0,0,0.4)] w-64 h-96 flex flex-col items-center justify-center font-serif hover:scale-105 transition duration-300">
					<div className="absolute top-4 left-4 text-3xl">♥</div>
					<div className="absolute bottom-4 right-4 text-3xl rotate-180">♥</div>
					<h2 className="text-2xl font-bold mb-2 mt-10">Roulette</h2>
					<p className="text-sm text-center px-4">Lance la roulette !</p>
				</Link>

				{/* ♠ Carte Pique */}
				<div className="relative bg-gradient-to-br from-white to-gray-200 text-black border-[6px] border-black rounded-[1rem] shadow-[0_0_20px_rgba(0,0,0,0.4)] w-64 h-96 flex flex-col items-center justify-center font-serif hover:scale-105 transition duration-300">
					<div className="absolute top-4 left-4 text-3xl">♠</div>
					<div className="absolute bottom-4 right-4 text-3xl rotate-180">♠</div>
					<h2 className="text-2xl font-bold mb-2 mt-10">Machine à sous</h2>
					<p className="text-sm text-center px-4">Tente ta chance !</p>
				</div>

				{/* ♦ Carte Carreau */}
				<Link
					to="/poker"
					className="relative bg-gradient-to-br from-white to-red-100 text-red-700 border-[6px] border-red-600 rounded-[1rem] shadow-[0_0_20px_rgba(255,0,0,0.4)] w-64 h-96 flex flex-col items-center justify-center font-serif hover:scale-105 transition duration-300">
					<div className="absolute top-4 left-4 text-3xl">♦</div>
					<div className="absolute bottom-4 right-4 text-3xl rotate-180">♦</div>
					<h2 className="text-2xl font-bold mb-2 mt-10">Poker</h2>
					<p className="text-sm text-center px-4">Entre à la table royale</p>
				</Link>

				{/* ♣ Carte Trèfle */}
				<div className="relative bg-gradient-to-br from-white to-green-100 text-black border-[6px] border-black rounded-[1rem] shadow-[0_0_20px_rgba(0,0,0,0.4)] w-64 h-96 flex flex-col items-center justify-center font-serif hover:scale-105 transition duration-300">
					<div className="absolute top-4 left-4 text-3xl">♣</div>
					<div className="absolute bottom-4 right-4 text-3xl rotate-180">♣</div>
					<h2 className="text-2xl font-bold mb-2 mt-10">À propos</h2>
					<p className="text-sm text-center px-4">Découvre l’univers Nexa Casino.</p>
				</div>
			</div>
		</div>
	);
}

export default Home;
