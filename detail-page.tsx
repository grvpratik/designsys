import { useState } from "react";
import { ExternalLink, Share2 } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { IconButton } from "./components/icon-button";
import { InfoCard } from "./components/info-card";
import { TabGroup } from "./components/tab-group";
import { DataRow } from "./components/data-row";
import { CryptoLogo } from "./components/crypto-logo";
import { Badge } from "./components/badge";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

// Mock data for the detail view
const mockData = {
	gibli: {
		name: "$GIBLI",
		description: "gibli art coin",
		contractAddress: "B7k187TwPF2k39704a8f38Frq1Y9bzfCFk9Ynj1qpmpp",
		image: "/placeholder.svg",
		change: "+12.5%",
		positive: true,
		price: "$0.0004",
		onchain: {
			marketCap: "$10.5M",
			volume24h: "$1.2M",
			holders: "12,450",
			contractAddress: "B7k187TwPF2k39704a8f38Frq1Y9bzfCFk9Ynj1qpmpp",
		},
		social: {
			twitter: "@gibliartcoin",
			telegram: "t.me/gibliartcoin",
			discord: "discord.gg/gibliartcoin",
			followers: "24.5K",
			sentiment: "Bullish",
		},
		category: "Art",
		rating: "4.5",
	},
	pumpfun: {
		name: "PumpFun",
		description: "Decentralized meme token platform with community governance",
		image: "/placeholder.svg",
		change: "+12.5%",
		positive: true,
		price: "$0.0042",
		onchain: {
			marketCap: "$10.5M",
			volume24h: "$1.2M",
			holders: "12,450",
			contractAddress: "0x1234...5678",
		},
		social: {
			twitter: "@pumpfun",
			telegram: "t.me/pumpfun",
			discord: "discord.gg/pumpfun",
			followers: "24.5K",
			sentiment: "Bullish",
		},
		category: "Meme",
		rating: "4.2",
	},
};

export default function PFDetailPage() {
	const { id } = useParams<{ id: string }>();
	const [activeTab, setActiveTab] = useState<"onchain" | "social">("onchain");
	const location = useLocation();

	// Get the data for the current ID or default to gibli
	const itemId = id as keyof typeof mockData;
	const itemData = mockData[itemId] || mockData.gibli;

	return (
		<motion.div
			key={location.key}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="bg-black text-white min-h-screen"
		>
			<div className="p-4 max-w-3xl mx-auto">
				{/* Header with navigation buttons */}
				<div className="flex items-center justify-between mb-6">
					<IconButton
						as={Link}
						to="/discover"
						icon={<ArrowLeftIcon size={20} />}
					/>
					<div className="flex gap-2">
						<IconButton icon={<Share2 size={20} />} onClick={() => {}} />
						<IconButton icon={<ExternalLink size={20} />} onClick={() => {}} />
					</div>
				</div>

				{/* Coin Logo and Basic Info */}
				<div className="flex flex-col items-start mb-6">
					<CryptoLogo />
					<h1 className="text-2xl font-bold mt-4">{itemData.name}</h1>
					<p className="text-gray-400">{itemData.description}</p>
					<div className="text-xs text-gray-500 mt-1 w-full text-start break-all">
						{itemData.contractAddress}
					</div>

					{/* Category and Rating */}
					<div className="flex gap-4 mt-4">
						<div className="flex flex-col">
							<span className="text-gray-400 text-sm">category</span>
							<Badge>{itemData.category}</Badge>
						</div>
						<div className="flex flex-col">
							<span className="text-gray-400 text-sm">rating</span>
							<Badge>{itemData.rating}</Badge>
						</div>
					</div>
				</div>

				{/* Price Chart Section */}
				<InfoCard className="mb-6">
					<div className="flex flex-col">
						<span className="text-gray-400 text-sm">price</span>
						<span className="text-xl font-bold">{itemData.price}</span>
					</div>

					{/* Simple SVG Chart */}
					<div className="mt-2 h-16">
						<svg width="100%" height="100%" viewBox="0 0 300 60">
							<path
								d="M0,30 C20,40 40,20 60,25 C80,30 100,35 120,30 C140,25 160,15 180,10 C200,5 220,20 240,35 C260,50 280,45 300,40"
								fill="none"
								stroke="white"
								strokeWidth="2"
							/>
						</svg>
					</div>
				</InfoCard>

				{/* Tabs */}
				<TabGroup
					tabs={[
						{ id: "onchain", label: "onchain" },
						{ id: "social", label: "social" },
					]}
					activeTab={activeTab}
					onChange={(tab) => setActiveTab(tab as "onchain" | "social")}
				/>

				{/* Tab Content */}
				<InfoCard>
					{activeTab === "onchain" && (
						<div className="space-y-2">
							<DataRow label="Market Cap" value={itemData.onchain.marketCap} />
							<DataRow label="24h Volume" value={itemData.onchain.volume24h} />
							<DataRow label="Holders" value={itemData.onchain.holders} />
							<DataRow
								label="Contract"
								value={`${itemData.onchain.contractAddress.substring(
									0,
									10
								)}...`}
								valueClassName="text-green-500 text-sm"
							/>
						</div>
					)}

					{activeTab === "social" && (
						<div className="space-y-2">
							<DataRow
								label="Twitter"
								value={itemData.social.twitter}
								valueClassName="text-green-500"
							/>
							<DataRow
								label="Telegram"
								value={itemData.social.telegram}
								valueClassName="text-green-500"
							/>
							<DataRow
								label="Discord"
								value={itemData.social.discord}
								valueClassName="text-green-500"
							/>
							<DataRow label="Followers" value={itemData.social.followers} />
							<DataRow
								label="Sentiment"
								value={itemData.social.sentiment}
								valueClassName="text-green-500"
							/>
						</div>
					)}
				</InfoCard>
			</div>
		</motion.div>
	);
}
