import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import { LoggedRoutes } from "./components/LoggedRoutes";
import Home from "./Pages/Home";
import Logout from "./components/Logout"; // ou le bon chemin
import Poker from "./Pages/Poker";
import React, { useState } from "react";
import Game from "./pages/game";

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
          <Route path="/poker" element={<Poker />} />
          <Route path="/game" element={<div className="flex items-center justify-center min-h-screen bg-background"><Game /></div>}/>
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
