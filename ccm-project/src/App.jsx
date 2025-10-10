import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import { ProtectedRoutes } from "./protectedRoutes";
import Home from "./Pages/Home";
import Logout from "./components/Logout"; // ou le bon chemin
import Poker from "./Pages/Poker";
import Roulette from "./pages/Roulette";
import Machine_à_sous from "./pages/Machine_à_sous";
import { ArgentProvider } from "@/context/ArgentContext";

function App() {
  return (
    <ArgentProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/poker" element={<Poker />} />
            <Route path="/roulette" element={<Roulette />} />
            <Route path="/machine" element={<Machine_à_sous />} />
          </Route>
        </Route>
      </Routes>
    </ArgentProvider>
  );
}
export default App;
