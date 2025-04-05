"use client";

import { useState, useRef, useEffect } from "react";
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { format } from "date-fns";

// Generate mock price data for the last 30 days
const generateMockData = (days = 30, startPrice = 0.567, volatility = 0.1) => {
	const data = [];
	let currentPrice = startPrice;

	const now = new Date();

	for (let i = days; i >= 0; i--) {
		const date = new Date(now);
		date.setDate(date.getDate() - i);

		// Random price change with some volatility
		const change = (Math.random() - 0.5) * volatility;
		currentPrice = Math.max(0.001, currentPrice + change * currentPrice);

		data.push({
			date: date.getTime(),
			price: currentPrice,
		});
	}

	return data;
};

type TimeframeType = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";

export default function PriceChartDemo() {
	const [timeframe, setTimeframe] = useState<TimeframeType>("1M");
	const [chartData, setChartData] = useState(generateMockData());
	const [activePoint, setActivePoint] = useState<any>(null);
	const [isZoomed, setIsZoomed] = useState(false);
	const chartRef = useRef<any>(null);

	// Regenerate data when timeframe changes
	useEffect(() => {
		const days =
			timeframe === "1D"
				? 1
				: timeframe === "1W"
				? 7
				: timeframe === "1M"
				? 30
				: timeframe === "3M"
				? 90
				: timeframe === "1Y"
				? 365
				: 730;

		setChartData(generateMockData(days));
	}, [timeframe]);

	// Custom tooltip component
	const CustomTooltip = ({ active, payload }: any) => {
		if (active && payload && payload.length) {
			const data = payload[0].payload;
			return (
				<div className="bg-[#1a1a2e] p-2 rounded-md border border-purple-700/30 shadow-lg">
					<p className="text-xs text-gray-400">
						{format(new Date(data.date), "MMM d, yyyy, h:mm:ss a")}
					</p>
					<p className="text-sm font-medium">Price: ${data.price.toFixed(6)}</p>
				</div>
			);
		}
		return null;
	};

	// Handle mouse move on chart
	const handleMouseMove = (e: any) => {
		if (e && e.activePayload) {
			setActivePoint(e.activePayload[0].payload);
		}
	};

	// Handle mouse leave
	const handleMouseLeave = () => {
		setActivePoint(null);
	};

	// Reset zoom
	const handleResetZoom = () => {
		setIsZoomed(false);
		// Recharts doesn't have a direct way to reset zoom, so we regenerate data
		const days =
			timeframe === "1D"
				? 1
				: timeframe === "1W"
				? 7
				: timeframe === "1M"
				? 30
				: timeframe === "3M"
				? 90
				: timeframe === "1Y"
				? 365
				: 730;

		setChartData(generateMockData(days));
	};

	return (
		<div className=" flex items-center justify-center ">
			<div className="w-full max-w-3xl border border-gray-800 rounded-lg bg-black text-white p-3">
				{/* <h2 className="text-xl font-bold mb-4">$GIBLI Price Chart</h2> */}

				<div className="flex flex-col ">
					<span className="text-gray-400 text-sm">price</span>
					<span className="text-xl font-bold">
						{activePoint ? `$${activePoint.price.toFixed(6)}` : "$0.567"}
					</span>
					{/* {activePoint && (
						<span className="text-xs text-gray-400">
							{format(new Date(activePoint.date), "MMM d, yyyy, h:mm:ss a")}
						</span>
					)} */}
				</div>

				{/* Timeframe selector */}
				{/* <div className="flex flex-wrap gap-2 mb-4">
					{(["1D", "1W", "1M", "3M", "1Y", "ALL"] as TimeframeType[]).map(
						(time) => (
							<button
								key={time}
								onClick={() => setTimeframe(time)}
								className={`px-3 py-1 text-xs rounded-md transition-colors ${
									timeframe === time
										? "bg-purple-700/40 text-white"
										: "bg-gray-800/40 text-gray-400 hover:bg-gray-700/40"
								}`}
							>
								{time}
							</button>
						)
					)}
				</div> */}

				{/* Chart container with gradient background */}
				<div className="relative  h-36 w-96 rounded-lg overflow-hidden ">
					{/* <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/80 z-0"></div> */}

					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							data={chartData}
							margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
							onMouseMove={handleMouseMove}
							onMouseLeave={handleMouseLeave}
							ref={chartRef}
						>
							<defs>
								<linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
								</linearGradient>
							</defs>

							{/* <XAxis
								dataKey="date"
								tickFormatter={(tick) => format(new Date(tick), "MMM d")}
								axisLine={false}
								tickLine={false}
								tick={{ fill: "#6b7280", fontSize: 10 }}
								minTickGap={30}
								domain={["dataMin", "dataMax"]}
							/> */}
							{/* 
							<YAxis
								domain={["auto", "auto"]}
								axisLine={false}
								tickLine={false}
								tick={{ fill: "#6b7280", fontSize: 10 }}
								tickFormatter={(tick) => `$${tick.toFixed(3)}`}
								width={60}
							/> */}

							<Tooltip
								content={<CustomTooltip />}
								cursor={{ stroke: "#8884d8", strokeWidth: 1 }}
							/>

							<Area
								className=""
								type="monotone"
								dataKey="price"
								stroke="#8884d8"
								strokeWidth={2}
								fillOpacity={1}
								fill="url(#colorPrice)"
								activeDot={{
									r: 6,
									fill: "#4c1d95",
									stroke: "#fff",
									strokeWidth: 2,
								}}
							/>
						</AreaChart>
					</ResponsiveContainer>

					{/* Active point indicator */}
					{/* {activePoint && (
						<div
							className="absolute w-px h-full bg-purple-500/50 pointer-events-none"
							style={{
								left: `${
									chartRef.current?.state?.xAxisMap?.[0]?.scale(
										activePoint.date
									) || 0
								}px`,
								top: 0,
							}}
						/>
					)} */}
				</div>

				{/* Chart controls */}
				{/* <div className="flex justify-between mt-4">
					<div className="flex items-center gap-2">
						<span className="text-xs text-gray-400">
							{isZoomed
								? "Drag to pan, pinch/scroll to zoom"
								: "Click and drag to zoom"}
						</span>
					</div>
					<button
						onClick={handleResetZoom}
						className="text-xs text-gray-400 bg-gray-800/40 hover:bg-gray-700/40 px-3 py-1 rounded transition-colors"
					>
						Reset View
					</button>
				</div> */}

				{/* Additional stats */}
				{/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
					<div className="bg-gray-800/40 p-3 rounded-lg">
						<span className="text-xs text-gray-400">24h Change</span>
						<div className="text-green-400 font-medium">+5.23%</div>
					</div>
					<div className="bg-gray-800/40 p-3 rounded-lg">
						<span className="text-xs text-gray-400">24h Volume</span>
						<div className="font-medium">$1.2M</div>
					</div>
					<div className="bg-gray-800/40 p-3 rounded-lg">
						<span className="text-xs text-gray-400">Market Cap</span>
						<div className="font-medium">$10.5M</div>
					</div>
					<div className="bg-gray-800/40 p-3 rounded-lg">
						<span className="text-xs text-gray-400">All-time High</span>
						<div className="font-medium">$0.892</div>
					</div>
				</div> */}
			</div>
		</div>
	);
}
