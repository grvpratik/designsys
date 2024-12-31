import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import "./styles/App.css";
import { ThemeProvider } from "./components/theme-provider";
import SignPage from "./pages/Sign";
import AnalysisDisplay from "./pages/Dev";
function App() {
	return (
		<>
			{" "}
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/sign" element={<SignPage />} />
						<Route path="/dev" element={<AnalysisDisplay />} />

					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
}

export default App;
