"use client";

import { useState } from "react";

import { ArrowLeft, ExternalLink, Share2 } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

// Mock data for the detail view
const mockData = {
	pumpfun: {
		name: "PumpFun",
		description: "Decentralized meme token platform with community governance",
		image: "/placeholder.svg",
		change: "+12.5%",
		positive: true,
		onchain: {
			marketCap: "$10.5M",
			price: "$0.0042",
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
	},
	cryptokitties: {
		name: "CryptoKitties",
		description: "Digital collectible cats on blockchain",
		image: "/placeholder.svg",
		change: "-3.2%",
		positive: false,
		onchain: {
			marketCap: "$25M",
			price: "0.15 ETH",
			volume24h: "$0.8M",
			holders: "45,230",
			contractAddress: "0xabcd...efgh",
		},
		social: {
			twitter: "@cryptokitties",
			telegram: "t.me/cryptokitties",
			discord: "discord.gg/cryptokitties",
			followers: "120K",
			sentiment: "Neutral",
		},
	},
	"defi-protocol": {
		name: "DeFi Protocol",
		description: "Yield farming and liquidity pools",
		image: "/placeholder.svg",
		change: "+8.7%",
		positive: true,
		onchain: {
			marketCap: "$150M",
			price: "$4.25",
			volume24h: "$12M",
			holders: "32,100",
			contractAddress: "0x9876...5432",
		},
		social: {
			twitter: "@defiprotocol",
			telegram: "t.me/defiprotocol",
			discord: "discord.gg/defiprotocol",
			followers: "85K",
			sentiment: "Bullish",
		},
	},
	"nft-marketplace": {
		name: "NFT Marketplace",
		description: "Buy, sell, and trade digital collectibles",
		image: "/placeholder.svg",
		change: "+5.1%",
		positive: true,
		onchain: {
			marketCap: "$75M",
			price: "$2.15",
			volume24h: "$5.2M",
			holders: "18,750",
			contractAddress: "0xijkl...mnop",
		},
		social: {
			twitter: "@nftmarketplace",
			telegram: "t.me/nftmarketplace",
			discord: "discord.gg/nftmarketplace",
			followers: "65K",
			sentiment: "Bullish",
		},
	},
	"dao-governance": {
		name: "DAO Governance",
		description: "Decentralized autonomous organization",
		image: "/placeholder.svg",
		change: "-1.8%",
		positive: false,
		onchain: {
			marketCap: "$45M",
			price: "$1.75",
			volume24h: "$3.5M",
			holders: "8,900",
			contractAddress: "0xqrst...uvwx",
		},
		social: {
			twitter: "@daogovernance",
			telegram: "t.me/daogovernance",
			discord: "discord.gg/daogovernance",
			followers: "32K",
			sentiment: "Neutral",
		},
	},
};

export default function PFDetailPage() {
	const { id } = useParams<{ id: string }>();
	const [activeTab, setActiveTab] = useState<"onchain" | "social">("onchain");
const location =useLocation()
	// Get the data for the current ID
	const itemData = mockData[id as keyof typeof mockData];

	if (!itemData) {
		return <div className="p-6">Item not found</div>;
	}

	return (
		<motion.div
					key={location.key}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
		<div className="p-6 md:p-8 max-w-4xl mx-auto">
			<div className="flex items-center justify-between mb-6">
				<Link to="/discover" className="btn btn-secondary p-2">
					<ArrowLeft size={20} />
				</Link>

				<div className="flex gap-2">
					<button className="btn btn-secondary p-2">
						<Share2 size={20} />
					</button>
					<button className="btn btn-secondary p-2">
						<ExternalLink size={20} />
					</button>
				</div>
			</div>

			<div className="card mb-6">
				<div className="flex items-center gap-4">
					<div className="w-16 h-16 md:w-20 md:h-20 bg-background rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden">
						<img
							src={itemData.image || "/placeholder.svg"}
							alt={itemData.name}
							width={80}
							height={80}
							className="rounded-2xl object-cover"
						/>
					</div>
					<div className="flex-1">
						<div className="flex items-center gap-3">
							<h1 className="text-xl md:text-2xl font-bold">{itemData.name}</h1>
							<span
								className={`text-sm font-medium px-3 py-1 rounded-full ${
									itemData.positive
										? "bg-success/20 text-success"
										: "bg-red-500/20 text-red-500"
								}`}
							>
								{itemData.change}
							</span>
						</div>
						<p className="text-white/60 text-sm md:text-base mt-1">
							{itemData.description}
						</p>
					</div>
				</div>
			</div>

			<div className="flex gap-2 mb-6">
				<button
					onClick={() => setActiveTab("onchain")}
					className={`tab ${
						activeTab === "onchain" ? "tab-active" : "tab-inactive"
					}`}
				>
					onchain
				</button>
				<button
					onClick={() => setActiveTab("social")}
					className={`tab ${
						activeTab === "social" ? "tab-active" : "tab-inactive"
					}`}
				>
					social
				</button>
			</div>

			<div className="card">
				{activeTab === "onchain" && (
					<div className="space-y-4">
						<div className="flex justify-between items-center py-2 border-b border-border">
							<span className="text-white/60">Market Cap</span>
							<span className="font-medium">{itemData.onchain.marketCap}</span>
						</div>
						<div className="flex justify-between items-center py-2 border-b border-border">
							<span className="text-white/60">Price</span>
							<span className="font-medium">{itemData.onchain.price}</span>
						</div>
						<div className="flex justify-between items-center py-2 border-b border-border">
							<span className="text-white/60">24h Volume</span>
							<span className="font-medium">{itemData.onchain.volume24h}</span>
						</div>
						<div className="flex justify-between items-center py-2 border-b border-border">
							<span className="text-white/60">Holders</span>
							<span className="font-medium">{itemData.onchain.holders}</span>
						</div>
						<div className="flex justify-between items-center py-2">
							<span className="text-white/60">Contract</span>
							<span className="font-medium text-primary">
								{itemData.onchain.contractAddress}
							</span>
						</div>
					</div>
				)}

				{activeTab === "social" && (
					<div className="space-y-4">
						<div className="flex justify-between items-center py-2 border-b border-border">
							<span className="text-white/60">Twitter</span>
							<span className="font-medium text-primary">
								{itemData.social.twitter}
							</span>
						</div>
						<div className="flex justify-between items-center py-2 border-b border-border">
							<span className="text-white/60">Telegram</span>
							<span className="font-medium text-primary">
								{itemData.social.telegram}
							</span>
						</div>
						<div className="flex justify-between items-center py-2 border-b border-border">
							<span className="text-white/60">Discord</span>
							<span className="font-medium text-primary">
								{itemData.social.discord}
							</span>
						</div>
						<div className="flex justify-between items-center py-2 border-b border-border">
							<span className="text-white/60">Followers</span>
							<span className="font-medium">{itemData.social.followers}</span>
						</div>
						<div className="flex justify-between items-center py-2">
							<span className="text-white/60">Sentiment</span>
							<span
								className={`font-medium ${
									itemData.social.sentiment === "Bullish"
										? "text-success"
										: itemData.social.sentiment === "Bearish"
										? "text-red-500"
										: "text-warning"
								}`}
							>
								{itemData.social.sentiment}
							</span>
						</div>
					</div>
				)}
			</div>
		</div></motion.div>
	);
}
