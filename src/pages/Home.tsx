import { FlameKindling, FlameKindlingIcon } from "lucide-react";
import {Button} from "../components/ui/button";
import { ModeToggle } from "../components/mode-toggle";

export default function HomePage() {
	return (
		<div className="flex gap-2 p-4 dark:bg-background-primary  ">
			<ModeToggle/>
			{/* <button className="custom-shadow inline-flex items-center h-[34px]  leading-[1.5] p-s rounded-button-sm font-medium text-black bg-white   hover:bg-gray-50 active:bg-gray-100 transition duration-200  ">
				Default
			</button> */}
			{/* <button className="custom-shadowx inline-flex items-center h-[34px]  leading-[1.5] p-s rounded-button-sm font-medium  bg-blue-600 text-white    active:bg-blue-700 transition duration-200  ">
				Primary
			</button> */}
			{/* <button className="custom-shadow inline-flex items-center h-[34px]  leading-[1.5] p-s rounded-button-sm font-medium  bg-white text-blue-600     transition duration-200  ">
				secndary
			</button> */}
			{/* 
			<button className="custom-shadow text-lg inline-flex items-center h-[42px]  leading-[2]  p-4 rounded-[calc(8/16*1rem)] font-medium text-gray-700 bg-white   hover:bg-gray-50 ">
				Default
			</button>
			<button className="custom-shadowx inline-flex items-center h-[34px]  leading-[1.5] p-s rounded-[calc(8/16*1rem)] font-medium text-gray-700 bg-white   hover:bg-gray-50 ">
				Default
			</button> */}
			<Button size="sm">Default</Button>
			<Button >Primary Medium</Button>
			<Button variant={"default"} size={'lg'}>Primary Large</Button>
			<Button variant={"destructive"}>destructive</Button>
			<Button variant={"ghost"}>ghost</Button>
			<Button variant={"link"}>link</Button>
			<Button variant={"outline"}>outline</Button>
			<Button variant={"secondary"}>secondary</Button>
			{/* <Button size="lg" variant="secondary" icon={FlameKindlingIcon}>
				Large Outline with Icon
			</Button>
			<Button className=" flex-shrink-0" icon={FlameKindling} isLoading>
				defalut
			</Button> */}
		</div>
	);
}
