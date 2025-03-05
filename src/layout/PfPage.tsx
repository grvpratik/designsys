
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

export default function PFPage() {
	return (
		<div className="p-6 md:p-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-lg font-bold inline-block bg-card border border-border rounded-full px-5 py-2">
					pumpfun
				</h1>

				<button className="btn btn-secondary">
					<span className="text-sm">Filter</span>
				</button>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{pfItems.map((item) => (
					<a
						key={item.id}
						href={`/pf/${item.id}`}
						className="card hover:bg-card/80 transition-all duration-200 hover:scale-[1.02]"
					>
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-background rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
								<img
									src={item.image || "/placeholder.svg"}
									alt={item.name}
									width={48}
									height={48}
									className="rounded-xl object-cover"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<h3 className="font-medium truncate">{item.name}</h3>
								<p className="text-sm text-white/60 truncate">
									{item.description}
								</p>
							</div>
							<div
								className={`text-sm font-medium ${
									item.positive ? "text-success" : "text-red-500"
								}`}
							>
								{item.change}
							</div>
						</div>
					</a>
				))}
			</div>
		</div>
	);
}
