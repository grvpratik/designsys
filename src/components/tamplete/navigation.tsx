"use client";


import { useLocation, Link } from "react-router-dom";
import { DiscoverSVG, HomeSVG, SettingsSVG, UserCircleSVG, UserSVG, WalletSVG } from "../svg";

const navItems = [
	{ label: "home", icon: HomeSVG, path: "/" },
	{ label: "discover", icon: DiscoverSVG, path: "/pf" },
	{ label: "setting", icon: SettingsSVG, path: "/rf" },
	{ label: "wallet", icon: UserCircleSVG, path: "/social" },
];

export default function Navigation() {
	const { pathname } = useLocation();

	const isActive = (path: string) =>
		pathname === path || (path !== "/" && pathname.startsWith(path));

	return (
		<nav className="fixed bottom-0 left-0 right-0 w-full border-t  py-2 border-border bg-black text-white backdrop-blur-lg transition-transform duration-100 ease-in-out md:translate-y-full translate-y-0">
			<div className="mx-auto flex justify-between items-center gap-2  ">
				{navItems.map(({ label, icon: Icon, path }) => {
					const active = isActive(path);
					return (
						<Link
							key={path}
							to={path}
							className={`flex flex-col items-center w-full  text-xs rounded-md py-2.5 mb-1 ${
								active ? "text-black bg-white" : "text-white bg-black"
							}`}
						>
						
							<Icon  	strokeWidth={active ? 2.5 : 2}/>
							{/* <span className="text-xs mt-1">{label}</span> */}
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
