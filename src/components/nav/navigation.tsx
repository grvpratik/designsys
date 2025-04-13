"use client";

import { useLocation, Link } from "react-router-dom";
import {
	DiscoverSVG,
	HomeSVG,
	SettingsSVG,
	UserCircleSVG,
	WalletSVG,
} from "../svg";
import { List } from "lucide-react";

const navItems = [
	{ label: "Home", icon: HomeSVG, path: "/" },
	{ label: "History", icon: List, path: "/history" },
	{ label: "Discover", icon: DiscoverSVG, path: "/discover" },
	{ label: "Setting", icon: SettingsSVG, path: "/rf" },
	{ label: "Profile", icon: UserCircleSVG, path: "/social" },
];

export default function Navigation() {
	const { pathname } = useLocation();

	const isActive = (path: string) =>
		pathname === path || (path !== "/" && pathname.startsWith(path));

	return (
		<nav className="fixed bottom-0   h-16 flex flex-col left-0 right-0 w-full bg-black text-white shadow-lg transition-transform duration-300 ease-in-out md:translate-y-full translate-y-0">
			<div className="h-full mob max-w-md mx-auto w-full flex justify-between items-center px-4 py-1">
				{navItems.map(({ label, icon: Icon, path }) => {
					const active = isActive(path);
					return (
						<Link
							key={path}
							to={path}
							className={`flex flex-col items-center justify-center h-12 px-2 aspect-square rounded-lg transition-all duration-200 ease-in-out
                ${
									active
										? "text-black bg-white font-medium"
										: "text-white text-opacity-70 hover:text-opacity-100"
								}
              `}
							aria-current={active ? "page" : undefined}
						>
							<Icon size={22} strokeWidth={active ? 2 : 1.5} />
							<span className="text-xs mt-1 truncate max-w-16">{label}</span>
						</Link>
					);
				})}
			</div>
			<div className="h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50" />
		</nav>
	);
}
