import React from "react";
import {
	ChevronRight,
	Download,
	Settings,
	Heart,
	MessageSquareDashed,
	Info,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { DiscoverSVG, HomeSVG, SettingsSVG, UserCircleSVG, UserSVG, WalletSVG } from "../svg";
import { MagicWandIcon } from "@radix-ui/react-icons";

// Interface for sidebar item props
interface SidebarItemProps {
	icon: React.ReactNode;
	label: string;
	path: string;
	notification?: boolean;
	isActive: boolean;
	variant: "compact" | "full";
}

// Interface for sidebar props
interface SidebarProps {
	variant?: "compact" | "full";
}

const SidebarItem: React.FC<SidebarItemProps> = ({
	icon,
	label,
	path,
	notification = false,
	isActive,
	variant,
}) => {
	const itemBaseClasses = "flex select-none w-full py-2 px-3";
	const itemTransitionClasses =
		"transition-all  ease-in text-opacity-50 hover:text-opacity-100 text-white";
	const activeItemClasses = "bg-white bg-opacity-100 rounded-md";
	const inactiveItemClasses = "bg-white bg-opacity-0 rounded-md";
	const activeTextClasses = "text-black";
	const inactiveTextClasses = "";
	
	// Layout classes based on variant
	const layoutClasses = 
		variant === "compact" 
			? "flex-col items-center justify-center" 
			: "flex-row items-center space-x-3";
	
	// Label classes based on variant
	const labelBaseClasses = 
		variant === "compact" 
			? "text-xs mt-1" 
			: "text-sm font-medium";
	
	const activeLabelClasses = "text-black";
	const inactiveLabelClasses = "";

	return (
		<Link to={path} className="w-full text-decoration-none">
			<div
				className={`
          ${itemBaseClasses}
          ${layoutClasses}
          ${itemTransitionClasses}
          ${isActive ? activeItemClasses : inactiveItemClasses}
        `}
			>
				<div
					className={`relative ${
						isActive ? activeTextClasses : inactiveTextClasses
					}`}
				>
					{icon}
					{notification && variant === "compact" && (
						<span
							className={`absolute -top-1 -right-2 ${
								isActive ? activeTextClasses : inactiveTextClasses
							}`}
						>
							<div className="size-2 rounded-full bg-green-500"></div>
						</span>
					)}
				</div>
				<span
					className={`
            ${labelBaseClasses}
            ${isActive ? activeLabelClasses : inactiveLabelClasses}
          `}
				>
					{label}
				</span>
				{notification && variant === "full" && (
					<div className="ml-auto">
						<div className="size-2 rounded-full bg-green-500"></div>
					</div>
				)}
			</div>
		</Link>
	);
};

// Sidebar section component for grouping similar items
interface SidebarSectionProps {
	items: {
		icon: React.ReactNode;
		label: string;
		path: string;
		notification?: boolean;
	}[];
	pathname: string;
	variant: "compact" | "full";
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ items, pathname, variant }) => {
	return (
		<div className="flex flex-col items-center w-full px-2 space-y-1">
			{items.map((item) => (
				<div key={item.path} className="w-full">
					<SidebarItem
						icon={item.icon}
						label={item.label}
						path={item.path}
						notification={item.notification}
						isActive={pathname === item.path}
						variant={variant}
					/>
				</div>
			))}
		</div>
	);
};

const Sidebar: React.FC<SidebarProps> = ({ variant = "compact" }) => {
	const location = useLocation();
	const pathname = location.pathname;

	// Define sidebar items grouped by section
	const mainItems = [
		{
			icon: <HomeSVG size={20} />,
			label: "Home",
			path: "/",
		},
		{
			icon: <DiscoverSVG size={20} />,
			label: "Discover",
			path: "/discover",
			notification: true,
		},
	];

	const utilityItems = [
		{
			icon: <SettingsSVG size={20} />,
			label: "Settings",
			path: "/settings",
		},
		{
			icon: <Heart size={20} />,
			label: "Donate",
			path: "/donate",
		},
		{
			icon: <WalletSVG size={20} />,
			label: "Wallet",
			path: "/wallet",
		},
		{
			icon: <UserCircleSVG size={20} />,
			label: "About",
			path: "/about",
		},
	];

	// Named Tailwind classes for sidebar layout
	const sidebarBaseClasses = 
		"flex flex-col items-center bg-black text-white h-full pb-4 opacity-0 md:opacity-100 transition-opacity";
	
	const sidebarWidthClasses = 
		variant === "compact" ? "w-24" : "w-56";
	
	const logoClasses =
		"cursor-pointer bg-black flex items-center justify-center my-4 transition-colors";

	return (
		<div className={`${sidebarBaseClasses} ${sidebarWidthClasses}`}>
			{/* Logo/brand section */}
			<div className={logoClasses}>
				{/* <MagicWandIcon className="size-8 p-2"/> */}
			</div>

			{/* Main actions section */}
			<SidebarSection items={mainItems} pathname={pathname} variant={variant} />

			{/* Spacer */}
			<div className="flex-grow"></div>

			{/* Utility section */}
			<SidebarSection items={utilityItems} pathname={pathname} variant={variant} />
		</div>
	);
};

export default Sidebar;