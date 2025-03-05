import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/App.css";
import { ThemeProvider } from "./components/theme-provider";

import RootLayout from "./layout/Homelayout";
import NotFoundPage from "./layout/NotFoundPage";
import PFPage from "./layout/PfPage";
import PFDetailPage from "./layout/PfDetailsPage";

import Home from "./layout/HomePage";

function App() {
	return (
		<>
			{" "}
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<RootLayout />}>
							<Route index element={<Home/>} />
							<Route path="/pf" element={<PFPage />} />
							<Route path="/pf/:id" element={<PFDetailPage />} />
							<Route path="*" element={<NotFoundPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
}

export default App;
