import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import { LoggedRoutes } from "./components/LoggedRoutes";
import Home from "./Pages/Home";
import Logout from "./components/Logout"; // ou le bon chemin

function App() {
  return (
    <Routes>
      {/* Route publique */}
      <Route path="/login" element={<Login />} />
      {/* Routes protégées */}
      <Route element={<LoggedRoutes />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />;
        </Route>
      </Route>
    </Routes>
  );
}
export default App;