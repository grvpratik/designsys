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
export default function Home() {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle search functionality here
		console.log("Searching for:", searchQuery);
	};

	return (
		<div className="  pb-20 md:pb-6 max-w-5xl mx-auto w-full h-full px-4">
		<div className="p-6 md:p-8  ">
			<ModeToggle/>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae maxime quo minus necessitatibus, odio explicabo et totam fugit repellat voluptatibus illum? Quasi alias corporis consequuntur dolor temporibus inventore debitis doloremque!
Repellendus  Vero nulla facilis mollitia repudiandae aperiam delectus deserunt minus nobis voluptatibus! In facilis assumenda nisi fugiat ab dolorem voluptatum. Incidunt nostrum beatae commodi rem ipsa quas. Illum.
Voluptas aspernatur accusantium veniam fugiat molestiae sint rerum architecto incidunt vero quos magni pariatur officiis mollitia fuga ea laudantium error maiores esse totam saepe adipisci, corrupti accusamus neque! Molestiae, quo?
Culpa 
			{/* <Button>animate</Button>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">Edit Profile</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input id="name" value="Pedro Duarte" className="col-span-3" />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="username" className="text-right">
								Username
							</Label>
							<Input id="username" value="@peduarte" className="col-span-3" />
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<form onSubmit={handleSearch} className="flex gap-3 max-w-xl mx-auto">
				<input
					type="text"
					placeholder="search.."
					className="input flex-1"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<button type="submit" className="btn btn-primary">
					<Search size={20} />
				</button>
			</form> */}

			<div className="mt-12 text-center ">
				<p>Search for crypto assets, NFTs, or tokens</p>
			</div>
		</div></div>
	);
}
