import type React from "react";

import { useState } from "react";
import { Search } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle";

import SearchUI from "../components/ai/search";
import MessagesUI from "../components/ai/messages";
import GenerativeChat from "../components/ai/GenerativeChat";
export default function Home() {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle search functionality here
		console.log("Searching for:", searchQuery);
	};
	// h-[calc(100vh-78px)]
	return (
		<>
			<GenerativeChat id="lol" initialMessages={[]}/>
			{/* <div className="flex flex-col items-start gap-2">
					<h1 className=" title-h3">Hello,degen</h1>
					<span className="paragraph-md opacity-75">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut igendi
						maiores, eaque quas qui distinctio ad temporibus quidem hic aut
					</span>
				</div> */}
			{/* <div className=" grid w-full grid-cols-3 flex-1 gap-10">
					{" "}
					<div className=" bg-blue-400 rounded-2xl w-full"></div>
					<div className=" bg-blue-400 rounded-2xl w-full"></div>
					<div className=" bg-blue-400 rounded-2xl w-full"></div>
					<div className=" bg-blue-400 rounded-2xl w-full"></div>
					<div className=" bg-blue-400 rounded-2xl w-full"></div>
					<div className=" bg-blue-400 rounded-2xl w-full"></div>{" "}
				</div> */}

			{/* <SearchUI /> */}
		</>
	);
}
