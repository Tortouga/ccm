import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContext } from "@/context/authContext";
import { ArgentProvider } from "./context/argentContext";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<AuthContext>
				<ArgentProvider>
					<App />
				</ArgentProvider>
			</AuthContext>
		</BrowserRouter>
	</StrictMode>
);
