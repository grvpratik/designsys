import React from "react";
import { Locate, Map, PlayCircle } from "lucide-react";
import { ChevronRight } from "lucide-react"; // Using ChevronRight instead of IconRight

// Define a reusable ListItem component for better modularity
const ListItem = ({ icon: Icon, label, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="flex w-full items-center  bg-gray-100 h-[40px]  hover:bg-gray-200 transition-all duration-100 cursor-pointer 
            "
		>
			<div className="flex items-center justify-center mx-3 text-gray-700">
				{Icon && <Icon size={18} />}
			</div>
			<div className="flex-1 text-left font-medium text-sm">{label}</div>
			<div className="flex items-center justify-center text-gray-500 mr-3">
				<ChevronRight size={16} />
			</div>
		</button>
	);
};

// Main ListOptions component with props for customization
const ListOptions = ({
	items = [
		{ icon: Map, label: "Maps", onClick: () => console.log("Maps clicked") },
		{
			icon: PlayCircle,
			label: "Places",
			onClick: () => console.log("Places clicked"),
		},
		{
			icon: Locate,
			label: "Directions",
			onClick: () => console.log("Directions clicked"),
		},
	],
	className = "",
}) => {
	return (
		<div
			className={`flex flex-col max-w-xs w-full rounded-2xl overflow-hidden divide-y divide-gray-200 shadow-sm ${className}`}
		>
			{items.map((item, index) => (
				<ListItem
					key={`list-item-${index}`}
					icon={item.icon}
					label={item.label}
					onClick={item.onClick}
				/>
			))}
		</div>
	);
};

export default ListOptions;
