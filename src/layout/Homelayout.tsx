import type React from "react";
import Navigation from "../components/tamplete/navigation";
import Sidebar from "../components/tamplete/sidebar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
	return (
		<html lang="en">
			<body className=" antialiased bg-black">
				<div className="flex h-screen ">
					<div className="-translate-x-full h-screen fixed inset-y-0 left-0 w-24 md:translate-x-0 transition-transform duration-100 ease-in-out">
						<Sidebar />
					</div>

					<main className="flex-1 flex mb-16 rounded-l-xl  md:mb-0 flex-col w-full md:ml-24 transition-all duration-100 ease-in-out overflow-y-auto  overflow-hidden bg-slate-50">
						<Outlet />

						<Navigation />
					</main>
				</div>
			</body>
		</html>
	);
}
