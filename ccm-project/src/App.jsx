import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Game } from "./pages/game";
import { ProtectedRoutes } from "./protectedRoutes";
import { MainLayout } from "./components/mainLayout";



function App() {
	return (
		<Routes>
			<Route element={<ProtectedRoutes />}>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/game" element={<Game />} />
			</Route>
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}

export default App;
