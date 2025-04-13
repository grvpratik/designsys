"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Search } from "lucide-react";

// Default side menu data
const defaultSideMenu = [
	{
		title: "Main",
		items: [
			{ name: "Dashboard", icon: "📊" },
			{ name: "Projects", icon: "📁" },
			{ name: "Tasks", icon: "✓" },
		],
	},
	{
		title: "Settings",
		items: [
			{ name: "Profile", icon: "👤" },
			{ name: "Preferences", icon: "⚙️" },
		],
	},
];

// Reusable Tab component
function Tab({ label, isActive, onClick }) {
	return (
		<button
			className={`border rounded-xl py-2 px-6 mr-3 transition-colors whitespace-nowrap ${
				isActive
					? "bg-blue-100 border-blue-400 text-blue-600"
					: "border-gray-300 hover:bg-gray-100"
			}`}
			onClick={onClick}
		>
			{label}
		</button>
	);
}

// Reusable SideMenu component
function SideMenu({ title, items = [], activeItem, onItemClick }) {
	return (
		<div className="mb-6">
			<h2 className="text-xs  mb-1 px-1 uppercase text-gray-500">
				{title}
			</h2>
			<div className="space-y-1">
				{items.map((item, index) => (
					<button
						key={index}
						onClick={() => onItemClick(item.name)}
						className={`flex items-center justify-between w-full p-1.5 text-sm rounded-lg transition-colors text-left ${
							activeItem === item.name
								? "bg-blue-100 text-blue-600  "
								: "hover:bg-gray-100 text-gray-700"
						}`}
					>
						<div className="flex items-center">
							{item.icon ? (
								<span className="mr-3">{item.icon}</span>
							) : (
								<div className="w-5 h-5 mr-3 flex items-center justify-center rounded-md bg-gray-100">
									<span className="text-xs text-gray-500">
										{item.name.charAt(0)}
									</span>
								</div>
							)}
							<span>{item.name}</span>
						</div>
						<ChevronRight
							size={16}
							className={`transition-opacity ${
								activeItem === item.name ? "opacity-100" : "opacity-0"
							}`}
						/>
					</button>
				))}
			</div>
		</div>
	);
}

// Reusable SideBar component
function SideBar({ sideMenus = [], activeItem, onItemClick }) {
	return (
		<div className="h-full py-3 px-2">
			{sideMenus.map((menu, index) => (
				<SideMenu
					key={index}
					title={menu.title}
					items={menu.items || []}
					activeItem={activeItem}
					onItemClick={onItemClick}
				/>
			))}
		</div>
	);
}

// Mobile dropdown component
function MobileDropdown({
	items,
	selectedItem,
	onItemSelect,
	isOpen,
	onToggle,
}) {
	return (
		<div className="relative mb-4">
			<button
				onClick={onToggle}
				className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-xl bg-white shadow-sm"
			>
				<span>{selectedItem}</span>
				<ChevronDown
					size={18}
					className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg">
					{items.map((item, index) => (
						<button
							key={index}
							className={`w-full text-left p-3 hover:bg-gray-100 ${
								item.name === selectedItem ? "text-blue-600 font-medium" : ""
							}`}
							onClick={() => onItemSelect(item.name)}
						>
							<div className="flex items-center">
								{item.icon && <span className="mr-3">{item.icon}</span>}
								<span>{item.name}</span>
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	);
}

// Search component
function SearchBar() {
	return (
		<div className="mb-6 relative">
			<Search
				size={18}
				className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
			/>
			<input
				type="text"
				placeholder="Search..."
				className="w-full p-3 pl-10 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
			/>
		</div>
	);
}

// Main component
export default function Discover({ sideMenus = defaultSideMenu }) {
	const [activeTab, setActiveTab] = useState(0);
	const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
	const [activeItem, setActiveItem] = useState(
		sideMenus[0]?.items[0]?.name || ""
	);

	const tabs = ["Overview", "Activity", "Settings"];
	const allItems = sideMenus.flatMap((menu) => menu.items);

	const handleItemClick = (itemName) => {
		setActiveItem(itemName);
		setMobileDropdownOpen(false);
	};

	return (
		<div className="flex flex-col md:flex-row min-h-screen bg-gray-50">


			{/* Sidebar - hidden on mobile */}
			<div className="hidden md:block w-64 mx-2  bg-white">
				<h1 className="text-xl font-bold px-4 py-4">Discover</h1>
				<SideBar
					sideMenus={sideMenus}
					activeItem={activeItem}
					onItemClick={handleItemClick}
				/>
			</div>
			{/* Mobile header */}
			<div className="md:hidden flex items-center justify-between p-2 border-b border-gray-200 bg-white">
				<h1 className="text-xl font-bold">Discover</h1>
			</div>
			{/* Main content area */}
			<div className="flex-1 flex flex-col p-6 max-w-3xl  w-full">
				{/* Mobile dropdown - only shown on mobile */}
				<div className="md:hidden">
					<MobileDropdown
						items={allItems}
						selectedItem={activeItem}
						onItemSelect={handleItemClick}
						isOpen={mobileDropdownOpen}
						onToggle={() => setMobileDropdownOpen(!mobileDropdownOpen)}
					/>
				</div>

				{/* Search bar */}
				<SearchBar />

				{/* Tabs */}
				<div className="flex mb-6 overflow-x-auto">
					{tabs.map((tab, index) => (
						<Tab
							key={index}
							label={tab}
							isActive={activeTab === index}
							onClick={() => setActiveTab(index)}
						/>
					))}
				</div>

				{/* Content area */}
				<div className="flex-1 border border-gray-300 rounded-xl p-6 flex items-center justify-center bg-white shadow">
					<div className="text-center">
						<h2 className="text-xl font-semibold mb-2">{activeItem}</h2>
						<p className="text-gray-600">
							{tabs[activeTab]} content for {activeItem}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
