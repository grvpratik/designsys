import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion
import "./styles/App.css";
import { ThemeProvider } from "./components/theme-provider";

import RootLayout from "./layout/Homelayout";
import NotFoundPage from "./layout/NotFoundPage";

import Home from "./layout/HomePage";
import PFPage from "./layout/PfPage";
import PFDetailPage from "./layout/PfDetailsPage";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<BrowserRouter>
				<RoutesWrapper />
			</BrowserRouter>
		</ThemeProvider>
	);
}

function RoutesWrapper() {
	

	return (
		
			<Routes location={location}>
				<Route path="/" element={<RootLayout />}>
					<Route index element={<Home />} />
					<Route path="/discover" element={<PFPage />} />
					<Route path="/discover/:id" element={<PFDetailPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		
	);
}

export default App;
