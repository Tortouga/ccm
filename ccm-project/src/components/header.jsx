import { Link } from "react-router-dom";
import { useAuth } from '@/context/authContext';

export function Header() {
    const { handleLogout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-red-700 text-white via-black to-yellow-500 text-gold-200 py-4 px-6 border-b border-yellow-400 font-serif shadow-[0_0_15px_gold]">
      <nav className="flex gap-6 justify-center text-sm tracking-widest uppercase">
        <Link to="/" className="hover:text-yellow-300 transition duration-200">
          🎲 Accueil
        </Link>
        <Link
          to="/profile/1"
          className="hover:text-yellow-300 transition duration-200"
        >
          🃏 Profil
        </Link>
        <button 
        type="button"
        onClick={handleLogout}
        className="hover:text-yellow-300 transition duration-200">
          💸 Déconnexion
        </button>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="bg-black text-yellow-300 text-center py-4 mt-auto font-serif border-t border-yellow-400 shadow-[0_0_15px_gold] text-xs tracking-widest uppercase">
      <p className="animate-pulse">🎰 NEXA CASINO</p>
    </footer>
  );
}