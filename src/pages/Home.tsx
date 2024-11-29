
import {Button} from "../components/ui/button";
import { ModeToggle } from "../components/mode-toggle";
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"

export default function HomePage() {
	
const MotionButton = motion(Button);
	return (
		<div className="flex gap-2 p-4 dark:bg-background-primary  flex-col ">
			<ModeToggle/>
<MotionButton variant="destructive" whileHover={{ scale: 1.1 }}>gg</MotionButton>
			<Button size="sm">Default</Button>
			<Button >Primary Medium</Button>
			<Button variant={"default"} size={'lg'}>Primary Large</Button>
			<Button variant={"destructive"}>destructive</Button>
			<Button variant={"ghost"}>ghost</Button>
			<Button variant={"link"}>link</Button>
			<Button variant={"outline"}>outline</Button>
			<Button variant={"secondary"}>secondary</Button>
		<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

		</div>
	);
}
