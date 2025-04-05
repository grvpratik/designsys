import type React from "react";
import Navigation from "../components/tamplete/navigation";
import Sidebar from "../components/tamplete/sidebar";
import { Outlet } from "react-router-dom";
import { cn } from "../lib/utils";

type SidebarVariant = "full" | "compact";

const sidebarVarient: SidebarVariant = "compact"; // Change this to "full" for full sidebar
export default function RootLayout() {

	return (
		<html lang="en">
			<body className="antialiased bg-black">
				<div className="flex h-screen">
					<div
						className={cn(
							"min-h-screen fixed inset-y-0 left-0 -translate-x-full md:translate-x-0 transition-transform duration-100 ease-in-out z-40",
							sidebarVarient === "compact" ? "w-24" : "w-56"
						)}
					>
						<Sidebar variant={sidebarVarient} />
					</div>

					<main
						className={cn(
							"flex-1 relative flex mb-16 rounded-l-2xl md:mb-0 flex-col w-full transition-all duration-100 ease-in-out overflow-y-auto h-full overflow-hidden bg-stone-100",
							sidebarVarient === "compact" ? "md:ml-24" : "md:ml-56"
						)}
					>
						<Outlet />
						<Navigation />
					</main>
				</div>
			</body>
		</html>
	);
}
