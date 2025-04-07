import { Message } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { MemoizedMarkdown } from "./memoized-markdown";
import { cn } from "../../lib/utils";
import { ExternalLink, Sparkles, User } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import img from "../../assets/glow.jpg";
export const MessageContent = ({
    message,
    isStreaming,
    lastMessage,
    hasToolInvocations,
    onSourceClick,
}: {
    message: Message;
    isStreaming: boolean;
    lastMessage: boolean;
    hasToolInvocations: boolean;
    onSourceClick?: () => void;
}) => {
    return (
			<div className="flex flex-col">
				{/* Message */}
				<motion.div
					initial={{ y: 5, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					
					className="flex items-start gap-4"
				>
					{/* Icon - Different icons for user vs AI */}
					{message.role === "user" ? (
						<><div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
							<User className="h-6 w-6" />
						</div></>
					) : (
						
						<div className="w-10 h-10 flex-shrink-0  rounded-full flex items-center justify-center text-white">
							{isStreaming ? (
								<Sparkles className="h-5 w-5 animate-pulse" />
							) : (
								<img src={img} className="h-5 w-5  rounded-full overflow-hidden" height={20} width={20} />
							)}
						</div>
					)}

					{/* Message Bubble */}

					<div className="max-w-3xl flex-1 paragraph-md">
						<p className="whitespace-pre-wrap">
							<div
								className={cn(
									"prose ",
									message.role === "user"
										? "text-slate-900 border-gray-500/40 border-2  rounded-lg border-solid bg-gray-200/50 p-2"
										: "text-slate-950"
								)}
							>
								<MemoizedMarkdown id={message.id} content={message.content} />
							</div>
						</p>

						{/* Source button for messages with tool invocations */}
						{message.role === "assistant" &&
							hasToolInvocations &&
							onSourceClick && (
								<div className="mt-2">
									<Button
										variant="outline"
										size="sm"
										onClick={onSourceClick}
										className="text-xs flex items-center gap-1"
									>
										<ExternalLink className="h-3 w-3" />
										View Sources
									</Button>
								</div>
							)}

						{!lastMessage && <Separator className="w-full my-6 rounded-xl" />}
					</div>
				</motion.div>
			</div>
		);
};