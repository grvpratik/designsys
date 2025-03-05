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
		<div className="p-6 md:p-8">
			<div className="mb-10 md:mb-12">
				<div className="w-full h-1 bg-border mb-8"></div>
				<div className="flex justify-center mb-8">
					<div className="w-20 h-20 md:w-24 md:h-24 bg-card rounded-2xl flex items-center justify-center">
						<span className="text-3xl">🚀</span>
					</div>
                    <div><ModeToggle/></div>
				</div>
			</div>


<Button>animate</Button>
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
			</form>

			<div className="mt-12 text-center ">
				<p>Search for crypto assets, NFTs, or tokens</p>
			</div>
		</div>
	);
}
