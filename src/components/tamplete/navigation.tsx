"use client";


import { Home, Briefcase, TrendingUp, Users } from "lucide-react";
import { useLocation } from "react-router-dom";


export default function Navigation() {
	const pathname = useLocation().pathname;

	const isActive = (path: string) => {
		return pathname === path || (path !== "/" && pathname.startsWith(path));
	};

	return (
		<nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card backdrop-blur-lg bg-opacity-80">
			<div className="max-w-md mx-auto flex justify-between px-6 py-4">
				<a
					href="/"
					className={`flex flex-col items-center ${
						isActive("/") ? "text-primary" : "text-white/70"
					}`}
				>
					<Home size={20} strokeWidth={isActive("/") ? 2.5 : 2} />
					<span className="text-xs mt-1">hm</span>
				</a>

				<a
					href="/pf"
					className={`flex flex-col items-center ${
						isActive("/pf") ? "text-primary" : "text-white/70"
					}`}
				>
					<Briefcase size={20} strokeWidth={isActive("/pf") ? 2.5 : 2} />
					<span className="text-xs mt-1">PF</span>
				</a>

				<a
					href="/rf"
					className={`flex flex-col items-center ${
						isActive("/rf") ? "text-primary" : "text-white/70"
					}`}
				>
					<TrendingUp size={20} strokeWidth={isActive("/rf") ? 2.5 : 2} />
					<span className="text-xs mt-1">RF</span>
				</a>

				<a
					href="/social"
					className={`flex flex-col items-center ${
						isActive("/social") ? "text-primary" : "text-white/70"
					}`}
				>
					<Users size={20} strokeWidth={isActive("/social") ? 2.5 : 2} />
					<span className="text-xs mt-1">Social</span>
				</a>
			</div>
		</nav>
	);
}
