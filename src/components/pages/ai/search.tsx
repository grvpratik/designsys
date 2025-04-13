import { useEffect, useRef, type FC } from "react";
import { cn } from "../../../lib/utils";
import { Sparkles, XIcon } from "lucide-react";
import { GlobeSVG, ImageFrameSVG, NewChatSVG, ReloadSVG } from "../../svg";

const SearchBtn =
	"size-6 p-1 flex items-center justify-center rounded-full text-white transition-all opacity-60 hover:opacity-100";

// Status type for the component
export type SearchStatus = "ready" | "streaming" | "submitted" | "error";

// Props interface with better typing
interface SearchUIProps {
	input: string;
	handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	setError: (error: Error | null) => void;
	className?: string;
	onSubmit?: () => void;
	status: SearchStatus;
	disabled?: boolean;
	disableAutosize?: boolean;
	maxHeight?: number | string;
	placeholder?: string;
	title?: string;
	subtitle?: string;
	showHeader?: boolean;
	
	customFooterButtons?: React.ReactNode;
	onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	stop: () => void;
}

const SearchUI: FC<SearchUIProps> = ({
	maxHeight = 140,
	setError,
	input,
	handleInputChange,
	className = "",
	onSubmit,
	status,
	disabled = false,
	disableAutosize = false,
	placeholder = "What does this code do?",
	title = "Working with Xcode & Terminal",
	subtitle = "Focused on lines 78 -103",
	showHeader = false,
	
	customFooterButtons,
	onKeyDown,
	stop,
	...props
}) => {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (disableAutosize || !textareaRef.current) return;

		textareaRef.current.style.height = "auto";
		textareaRef.current.style.height =
			typeof maxHeight === "number"
				? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`
				: `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`;
	}, [input, maxHeight, disableAutosize]);

	const handleKeyDownInternal = (
		e: React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (disabled) return;
			setError(null);
			onSubmit?.();
		}
		onKeyDown?.(e);
	};
	interface FormSubmitEvent {
		preventDefault: () => void;
	}

	const handleSubmit = (e: FormSubmitEvent): void => {
		e.preventDefault();
		if (disabled) return;
		setError(null);
		onSubmit?.();
	};
	return (
		<div className="flex w-full max-w-2xl mx-auto pb-1 px-1">
			<div className="w-full bg-black/90 rounded-3xl p-1 overflow-hidden ">
			
				{showHeader && (
					<div className="flex items-center px-4 py-3 rounded-t-[20px] rounded-b-sm gap-3 border-b bg-white/20 backdrop-blur-md border-slate-700/30">
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
					</div>
				)}
				<form
					className="pl-4 pr-2 pt-3 pb-2"
					action="search-submit"
					onSubmit={handleSubmit}
				>
					<textarea
						ref={textareaRef}
						value={input}
						onChange={handleInputChange}
						onKeyDown={handleKeyDownInternal}
						placeholder={placeholder}
						className={cn(
							"w-full rounded-lg custom-scrollbar min-h-[24px] resize-none border-none bg-transparent text-white transition-all placeholder:text-gray-200 text-base outline-none ",
							className
						)}
						rows={1}
						{...props}
					/>
				</form>
				<div className="flex items-center w-full justify-between pl-3 pr-1 pb-1 border-t pt-1 rounded-b-[20px] border-slate-700/30">
					<div className="flex gap-3 h-8 items-center">
						{customFooterButtons || (
							<>
								<button className={SearchBtn}>
									<ImageFrameSVG />
								</button>
								<button className={SearchBtn}>
									<GlobeSVG />
								</button>
								<button className={SearchBtn}>
									<ReloadSVG />
								</button>
								<button className={SearchBtn}>
									<NewChatSVG />
								</button>
							</>
						)}
					</div>

					<button
						onClick={handleSubmit}
						disabled={disabled}
						type="submit"
						form="search-submit"
						aria-label="Submit"
						className=" z-10 size-8 cursor-pointer flex items-center justify-center rounded-full bg-white disabled:cursor-not-allowed hover:cursor-pointer"
					>
						<Sparkles
							className={cn(
								"text-black p-0.5 cursor-pointer",
								status === "submitted" ? "p-1 animate-pulse" : ""
							)}
							strokeWidth={1.25}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SearchUI;
