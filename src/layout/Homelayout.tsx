import type React from "react";
import Navigation from "../components/tamplete/navigation";
import Sidebar from "../components/tamplete/sidebar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
	return (
		<html lang="en">
			<body className=" overflow-hidden ">
				<div className="flex h-screen ">
					{/* Fixed Sidebar for larger screens */}
					<div className="-translate-x-full h-screen fixed inset-y-0 left-0 w-24 md:translate-x-0 transition-transform duration-100 ease-in-out">
						<Sidebar />
					</div>

					{/* Main content area */}
					<main className="flex-1 flex flex-col w-full md:ml-24 transition-all duration-100 ease-in-out overflow-y-auto custom-scrollbar  overflow-hidden bg-gray-50">
						<Outlet />

						{/* Bottom navigation for mobile only */}
						
							<Navigation />
						
					</main>
				</div>
			</body>
		</html>
	);
}
