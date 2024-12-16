import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import "./styles/App.css";
import { ThemeProvider } from "./components/theme-provider";
import SignPage from "./pages/Sign";
function App() {
	return (
		<>
			{" "}
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
							<Route path="/sign" element={<SignPage />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
}

export default App;
