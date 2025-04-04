"use client";

import { useLocation, Link } from "react-router-dom";
import {
	DiscoverSVG,
	HomeSVG,
	SettingsSVG,
	UserCircleSVG,
	UserSVG,
	WalletSVG,
} from "../svg";
import { List } from "lucide-react";

const navItems = [
	{ label: "home", icon: HomeSVG, path: "/" },
	{ label: "history", icon:List, path: "/history" },
	{ label: "discover", icon: DiscoverSVG, path: "/discover" },
	{ label: "setting", icon: SettingsSVG, path: "/rf" },
	{ label: "wallet", icon: UserCircleSVG, path: "/social" },
];

export default function Navigation() {
	const { pathname } = useLocation();

	const isActive = (path: string) =>
		pathname === path || (path !== "/" && pathname.startsWith(path));

	return (
		<nav className="fixed bottom-0 z-5  flex flex-col  left-0 right-0 w-full   bg-black text-white  transition-transform duration-100 ease-in-out md:translate-y-[200%] translate-y-0">
			<div className="mob    mx-auto w-full flex-1 px-2 sm:px-4  pt-2 pb-3 flex justify-between items-center gap-2  ">
			
				{navItems.map(({ label, icon: Icon, path }) => {
					const active = isActive(path);
					return (
						<Link
							key={path}
							to={path}
							className={`flex py-3 justify-center flex-col items-center max-w-24 w-full text-xs rounded-xl  transition-all duration-300 ease-in-out text-opacity-60 hover:text-opacity-100 
								${
								active
									? "text-black bg-white text-opacity-100"
									: "text-white bg-opacity-0"
							} 
							
							`}
						>
							<Icon size={24} strokeWidth={active ? 2.5 : 2} />

							{/* <span className="text-xs mt-1">{label}</span> */}
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
