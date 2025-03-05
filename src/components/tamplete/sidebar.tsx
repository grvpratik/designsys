"use client";

import { Home, Briefcase, TrendingUp, Users } from "lucide-react";
import { useLocation } from "react-router-dom";
export default function Sidebar() {
	const pathname = useLocation().pathname;

	const isActive = (path: string) => {
		return pathname === path || (path !== "/" && pathname.startsWith(path));
	};

	return (
		<aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-gray-800/60 border-r border-border">
			<div className="p-6">
				<h1 className="text-xl font-bold">Crypto App</h1>
			</div>

			<nav className="flex-1 px-4 py-6">
				<ul className="space-y-2">
					<li>
						<a
							href="/"
							className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
								isActive("/")
									? "bg-primary/10 text-primary"
									: "text-white/70 hover:bg-card/80"
							}`}
						>
							<Home size={20} />
							<span>Home</span>
						</a>
					</li>

					<li>
						<a
							href="/pf"
							className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
								isActive("/pf")
									? "bg-primary/10 text-primary"
									: "text-white/70 hover:bg-card/80"
							}`}
						>
							<Briefcase size={20} />
							<span>Portfolio</span>
						</a>
					</li>

					<li>
						<a
							href="/rf"
							className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
								isActive("/rf")
									? "bg-primary/10 text-primary"
									: "text-white/70 hover:bg-card/80"
							}`}
						>
							<TrendingUp size={20} />
							<span>Reports</span>
						</a>
					</li>

					<li>
						<a
							href="/social"
							className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
								isActive("/social")
									? "bg-primary/10 text-primary"
									: "text-white/70 hover:bg-card/80"
							}`}
						>
							<Users size={20} />
							<span>Social</span>
						</a>
					</li>
				</ul>
			</nav>

			<div className="p-6 border-t border-border">
				<div className="text-sm text-white/50">v1.0.0</div>
			</div>
		</aside>
	);
}
