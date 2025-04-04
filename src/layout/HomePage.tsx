import type React from "react";

import { useState } from "react";
import { Search } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle";
import { Button } from "../components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import SearchUI from "../components/ai/search";
export default function Home() {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle search functionality here
		console.log("Searching for:", searchQuery);
	};

	return (
		<div className="  pb-20 md:pb-6 max-w-5xl mx-auto w-full h-full px-4">
			
				<div className="mt-12 text-center ">
					<p>Search for crypto assets, NFTs, or tokens</p>
				</div><SearchUI/>
			
		</div>
	);
}
