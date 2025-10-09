import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom";
import Game from "./pages/game";

function App() {
  return (
    <Routes>
      <Route
        path="/game"
        element={
          <div className="flex items-center justify-center min-h-screen bg-background">
            <Game />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
