import type React from "react";

import { Outlet } from "react-router-dom";
import { cn } from "../lib/utils";
import Sidebar from "../components/nav/sidebar";
import Navigation from "../components/nav/navigation";
import WalletProvider from "../components/wallet-provider";

type SidebarVariant = "full" | "compact";

const sidebarVarient: SidebarVariant = "compact";
export default function RootLayout() {
	return (
		<body className="antialiased bg-black">
			<div className="flex h-screen">
				<div
					className={cn(
						"min-h-screen fixed inset-y-0 left-0 -translate-x-full md:translate-x-0 transition-transform duration-100 ease-in-out z-20",
						sidebarVarient === "compact" ? "w-24" : "w-56"
					)}
				>
					<Sidebar variant={sidebarVarient} />
				</div>

				<main
					className={cn(
						"flex-1  relative flex pb-16  md:pb-0 flex-col w-full transition-all duration-100 ease-in-out overflow-y-auto h-full overflow-hidden rounded-l-md rounded-r-md  bg-gray-100",
						sidebarVarient === "compact" ? "md:ml-24" : "md:ml-56"
					)}
				>
					<Outlet />
					<Navigation />
				</main>
			</div>
		</body>
	);
}
