import { useState } from "react";
import { Link } from "react-router-dom";
import PriceChartDemo from "../components/temp-chart";
import ListOptions from "../components/settings/list-options";
import { SearchSVG } from "../components/svg";
import { Input } from "../components/ui/input";

// Mock data for the PF list
const pfItems = [
	{
		id: "pumpfun",
		name: "PumpFun",
		description: "Decentralized meme token platform",
		image: "/placeholder.svg",
		change: "+12.5%",
		positive: true,
	},
	{
		id: "cryptokitties",
		name: "CryptoKitties",
		description: "Digital collectible cats on blockchain",
		image: "/placeholder.svg",
		change: "-3.2%",
		positive: false,
	},
	{
		id: "defi-protocol",
		name: "DeFi Protocol",
		description: "Yield farming and liquidity pools",
		image: "/placeholder.svg",
		change: "+8.7%",
		positive: true,
	},
	{
		id: "nft-marketplace",
		name: "NFT Marketplace",
		description: "Buy, sell, and trade digital collectibles",
		image: "/placeholder.svg",
		change: "+5.1%",
		positive: true,
	},
	{
		id: "dao-governance",
		name: "DAO Governance",
		description: "Decentralized autonomous organization",
		image: "/placeholder.svg",
		change: "-1.8%",
		positive: false,
	},
];

// Mock data for other tabs
const raydiumItems = [
	{
		id: "ray-swap",
		name: "RAY Swap",
		description: "Automated market maker on Solana",
		image: "/placeholder.svg",
		change: "+9.3%",
		positive: true,
	},
	{
		id: "ray-farms",
		name: "RAY Farms",
		description: "Yield farming protocol on Solana",
		image: "/placeholder.svg",
		change: "+4.7%",
		positive: true,
	},
];

const extraItems = [
	{
		id: "solana-nft",
		name: "Solana NFT",
		description: "NFT marketplace on Solana",
		image: "/placeholder.svg",
		change: "-2.1%",
		positive: false,
	},
	{
		id: "solana-defi",
		name: "Solana DeFi",
		description: "DeFi protocols on Solana",
		image: "/placeholder.svg",
		change: "+6.2%",
		positive: true,
	},
];

export default function Discover() {
	const [activeTab, setActiveTab] = useState("pf");

	// Function to get data based on active tab
	const getTabData = () => {
		switch (activeTab) {
			case "raydium":
				return raydiumItems;
			case "extra":
				return extraItems;
			case "pf":
			default:
				return pfItems;
		}
	};

	return (
		<div className="flex w-full h-full">
			<div className="max-w-xs mx-4 w-full flex flex-col items-start my-6">
				<div className="w-full max-w-xs items-start title-h5 my-2 flex-col text-start flex">
					<span className="text-2xl font-semibold mb-2">Discover</span>
					<div className="w-full">
						<span className="text-sm text-gray-500 mb-2 block">
							Select category
						</span>
						{/* Tab buttons with active states */}
						<div className="flex gap-2 mt-1">
							<button
								onClick={() => setActiveTab("pf")}
								className={`px-4 py-1.5 rounded-full text-sm transition-all ${
									activeTab === "pf"
										? "bg-blue-500 text-white"
										: "bg-gray-200 hover:bg-gray-300 text-gray-700"
								}`}
							>
								PF
							</button>
							<button
								onClick={() => setActiveTab("raydium")}
								className={`px-4 py-1.5 rounded-full text-sm transition-all ${
									activeTab === "raydium"
										? "bg-blue-500 text-white"
										: "bg-gray-200 hover:bg-gray-300 text-gray-700"
								}`}
							>
								Raydium
							</button>
							<button
								onClick={() => setActiveTab("extra")}
								className={`px-4 py-1.5 rounded-full text-sm transition-all ${
									activeTab === "extra"
										? "bg-blue-500 text-white"
										: "bg-gray-200 hover:bg-gray-300 text-gray-700"
								}`}
							>
								Extra
							</button>
						</div>
					</div>
				</div>
				{/* <div className="w-full mt-4">
					
					<div className="space-y-2 w-full">
						{getTabData().map((item) => (
							<div
								key={item.id}
								className="p-3 rounded-lg bg-white border border-gray-200 hover:border-blue-300 cursor-pointer transition-all"
							>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
										<img
											src={item.image}
											alt={item.name}
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="flex-1">
										<h3 className="font-medium">{item.name}</h3>
										<p className="text-xs text-gray-500">{item.description}</p>
									</div>
									<div
										className={`text-sm font-medium ${
											item.positive ? "text-green-500" : "text-red-500"
										}`}
									>
										{item.change}
									</div>
								</div>
							</div>
						))}
					</div>
				</div> */}
			</div>
			<div className="flex flex-col flex-1 overflow-y-auto">
				<div className="max-w-xl  flex flex-col mx-4 my-3 w-full gap-3">
					<div className="w-full rounded-full bg-gray-200/60 hover:bg-gray-200 transition-all duration-100 delay-75 ease-linear group">
						<div className="flex w-full h-12 px-4 items-center">
							<SearchSVG
								strokeWidth={2.5}
								// size={16}
								className="mr-2 p-0.5 group-hover:opacity-60 opacity-60 transition-all duration-100 delay-75 ease-linear"
							/>
							<input
								placeholder="Search"
								className="bg-transparent text-base w-full py-1 flex-1"
							/>
						</div>
					</div>
					<div className="bg-emerald-200 h-36 w-full rounded-3xl flex items-center px-4"></div>

					{/* Tab content container */}
					<div className="mt-4">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-xl font-semibold">
								{activeTab === "pf" && "PumpFun Projects"}
								{activeTab === "raydium" && "Raydium Projects"}
								{activeTab === "extra" && "Extra Projects"}
							</h2>
							<div className="flex gap-2">
								<button className="text-sm bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200">
									Filter
								</button>
								<button className="text-sm bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200">
									Sort
								</button>
							</div>
						</div>

						{/* Grid layout for tab content */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{getTabData().map((item) => (
								<div
									key={item.id}
									className="p-4 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all"
								>
									<div className="flex items-center gap-3 mb-3">
										<div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
											<img
												src={item.image}
												alt={item.name}
												className="w-full h-full object-cover"
											/>
										</div>
										<div>
											<h3 className="font-semibold">{item.name}</h3>
											<p className="text-sm text-gray-500">
												{item.description}
											</p>
										</div>
									</div>
									<div className="flex justify-between items-center mt-3">
										<span className="text-sm text-gray-500">24h Change</span>
										<span
											className={`font-medium ${
												item.positive ? "text-green-500" : "text-red-500"
											}`}
										>
											{item.change}
										</span>
									</div>
									<div className="mt-3 pt-3 border-t border-gray-100">
										<button className="w-full py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
											<Link to={"/discover/pumpfun"}> View Details</Link>
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
