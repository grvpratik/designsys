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

// Interface for sidebar item props
interface SidebarItemProps {
	icon: React.ReactNode;
	label: string;
	path: string;
	notification?: boolean;
	isActive: boolean;
}
//sidebar-background,sidebar-text,sidebar-item:hover,item:active:background,text ,opacity

const SidebarItem: React.FC<SidebarItemProps> = ({
	icon,
	label,
	path,
	notification = false,
	isActive,
}) => {
	const itemBaseClasses =
		"flex flex-col items-center justify-center w-full py-2 px-4 select-none  ";
	const itemTransitionClasses =
		"transition-all duration-100 ease-in text-opacity-50 hover:text-opacity-100 text-white";
	const activeItemClasses = "bg-white bg-opacity-100 rounded-md";
	const inactiveItemClasses = "bg-white bg-opacity-0  rounded-md";
	const activeTextClasses = "text-black ";
	const inactiveTextClasses = " ";
	const labelBaseClasses = "text-xs mt-1 ";
	const activeLabelClasses = "text-black";
	const inactiveLabelClasses = "";

	return (
		<Link to={path} className="w-full text-decoration-none ">
			<div
				className={` 
          ${itemBaseClasses}
          ${itemTransitionClasses}
          ${isActive ? activeItemClasses : inactiveItemClasses}
        `}
			>
				<div
					className={`relative  ${
						isActive ? activeTextClasses : inactiveTextClasses
					}`}
				>
					{icon}
					{notification && (
						<span
							className={`absolute -top-1 -right-2 text-xs font-bold ${
								isActive ? activeTextClasses : inactiveTextClasses
							}`}
						>
							<div className=" size-2 rounded-full bg-green-500"></div>
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
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ items, pathname }) => {
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
					/>
				</div>
			))}
		</div>
	);
};

const Sidebar: React.FC = () => {
	const location = useLocation();
	const pathname = location.pathname;

	// Define sidebar items grouped by section
	const mainItems = [
		{
			icon: <HomeSVG size={20} />,
			label: "home",
			path: "/",
		},
		{
			icon:<DiscoverSVG size={20}/>,
			label: "discover",
			path: "/discover",
			notification: true,
		},
	];

	const utilityItems = [
		{
			icon: <SettingsSVG size={20} />,
			label: "settings",
			path: "/settings",
		},
		{
			icon: <Heart size={20} />,
			label: "donate",
			path: "/donate",
		},
		{
			icon: <WalletSVG size={20}  />,
			label: "wallet",
			path: "/wallet",
		},
		{
			icon: <UserCircleSVG size={20} />,
			label: "about",
			path: "/about",
		},
	];

	// Named Tailwind classes for sidebar layout
	const sidebarClasses =
		"flex-col items-center  bg-black text-white h-full w-24 py-4 flex  opacity-0 md:opacity-100 transition-opacity ";
	const logoClasses =
		"mb-4 cursor-pointer bg-blue-500 p-l  rounded-full hover:bg-blue-600 transition-colors duration-300";

	return (
		<div className={sidebarClasses}>
			{/* Logo/brand section */}
			<div className={logoClasses}>
				<ChevronRight size={24} />
			</div>

			{/* Main actions section */}
			<SidebarSection items={mainItems} pathname={pathname} />

			{/* Spacer */}
			<div className="flex-grow"></div>

			{/* Utility section */}
			<SidebarSection items={utilityItems} pathname={pathname} />
		</div>
	);
};

export default Sidebar;
