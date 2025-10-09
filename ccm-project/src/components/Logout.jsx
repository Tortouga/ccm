import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // 🧼 Nettoyage des données de session
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");

    // ✅ Redirection vers la page de login
    navigate("/login");
  }, [navigate]);

  return null; // Pas d'affichage nécessaire
}

export default Logout;
