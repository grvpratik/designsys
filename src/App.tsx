import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion
import "./styles/App.css";
import { ThemeProvider } from "./components/theme-provider";

import RootLayout from "./layout/Homelayout";
import NotFoundPage from "./layout/NotFoundPage";

import Home from "./layout/HomePage";
import Discover from "./layout/DiscoverPage";
import PFDetailPage from "./layout/PfDetailsPage";

import ChatDetailsPage from "./layout/ChatDetails";
import SettingsPage from "./layout/SettingsPage";

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
				<Route path="/chat/:id" element={<ChatDetailsPage />} />
				<Route path="/discover" element={<Discover />} />
				<Route path="/discover/:id" element={<PFDetailPage />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}

export default App;
