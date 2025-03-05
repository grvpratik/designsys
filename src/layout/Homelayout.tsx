import type React from "react";

import Navigation from "../components/tamplete/navigation";
import Sidebar from "../components/tamplete/sidebar";
import { Outlet, Link } from "react-router-dom";



export default function RootLayout() {
	return (
		<html lang="en">
			<body className={` bg-gray-800/60`}>
				<div className="flex min-h-screen">
					{/* Sidebar for larger screens */}
					<Sidebar />

					{/* Main content area */}
					<div className="flex-1 flex flex-col w-full md:ml-64">
						<main className="flex-1 overflow-auto pb-20 md:pb-6 max-w-5xl mx-auto w-full">
							<Outlet/>
						</main>

						{/* Bottom navigation for mobile only */}
						<Navigation />
					</div>
				</div>
			</body>
		</html>
	);
}
