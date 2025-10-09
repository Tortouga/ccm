import { useEffect, useState } from "react";

function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <h1 className="text-2xl font-bold animate-fade-in">
      {username ? `Bienvenue ${username} 👋` : "Accueil"}
    </h1>
  );
}

export default Home;