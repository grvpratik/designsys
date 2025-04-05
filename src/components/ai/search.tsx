import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import {
	ArrowUp,
	Globe,
	Option,
	OptionIcon,
	Plus,
	Sparkle,
	Sparkles,
} from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { GlobeSVG, ImageFrameSVG, NewChatSVG, ReloadSVG } from "../svg";

const SearchUI = ({
	maxHeight = 140,
	className,
	onSubmit,
	disabled = false,
	disableAutosize = false,
	placeholder = "What does this code do?",
	title = "Working with Xcode & Terminal",
	subtitle = "Focused on lines 78 -103",
	...props
}) => {
	const textareaRef = useRef(null);
	const [value, setValue] = useState("");

	useEffect(() => {
		if (disableAutosize) return;
		if (!textareaRef.current) return;

		textareaRef.current.style.height = "auto";
		textareaRef.current.style.height =
			typeof maxHeight === "number"
				? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`
				: `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`;
	}, [value, maxHeight, disableAutosize]);

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSubmit?.();
		}
		props.onKeyDown?.(e);
	};

	return (
		<div className="flex w-full max-w-3xl mx-auto">
			<div className="w-full bg-black/90 rounded-3xl p-1  overflow-hidden backdrop-blur-sm  custom-shadowx">
				{/* Header */}
				{/* <div className="flex items-center px-4 py-3 rounded-t-[20px] rounded-b-sm gap-3 border-b bg-white/20  backdrop-blur-md border-slate-700/30">
					<div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-5 h-5 text-white transition-all"
						>
							<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
						</svg>
					</div>
					<div className="flex-1">
						<div className="font-medium text-white transition-all text-sm">
							{title}
						</div>
						<div className="text-slate-400 text-xs">{subtitle}</div>
					</div>
					<button className="px-3 py-1 rounded-md text-sm text-white transition-all bg-slate-700 hover:bg-slate-600">
						Stop
					</button>
				</div> */}

				{/* Content */}
				<div className="px-4 pt-3 pb-2">
					<textarea
						ref={textareaRef}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder={placeholder}
						className={cn(
							"w-full rounded-lg custom-scrollbar min-h-[44px] resize-none border-none bg-transparent text-white transition-all placeholder:text-slate-500 text-base outline-none",
							className
						)}
						rows={1}
						disabled={disabled}
						{...props}
					/>
				</div>

				{/* Footer */}
				<div className="flex items-center w-full   justify-between pl-3 pr-1 pb-1 border-t pt-1 rounded-b-[20px] border-slate-700/30">
					<div className="flex gap-3 h-8 items-center">
						<button className="size-6 p-1  flex items-center justify-center rounded-full text-white transition-all opacity-60 hover:opacity-100 ">
							<ImageFrameSVG />
						</button>
						<button className="size-6 p-1  flex items-center justify-center rounded-full text-white transition-all opacity-60 hover:opacity-100 ">
							<GlobeSVG />
						</button>
						<button className="size-6 p-1  flex items-center justify-center rounded-full text-white transition-all opacity-60 hover:opacity-100 ">
							<ReloadSVG />
						</button>
						<button className="size-6 p-1  flex items-center justify-center rounded-full text-white transition-all opacity-60 hover:opacity-100 ">
							<NewChatSVG className="" />
						</button>
					</div>
					<button className=" size-8 aspect-square flex items-center justify-center rounded-full bg-white">
						<Sparkles className="text-black p-0.5" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default SearchUI;
