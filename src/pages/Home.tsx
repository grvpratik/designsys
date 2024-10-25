import { FlameKindling, FlameKindlingIcon } from "lucide-react";
import {Button} from "../components/ui/button";
import { ModeToggle } from "../components/mode-toggle";

export default function HomePage() {
	return (
		<div className="flex gap-2 p-4 dark:bg-background-primary  ">
			<ModeToggle/>

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
