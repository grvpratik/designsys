import { Message } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { Clapperboard, ExternalLink, Loader, User, User2 } from "lucide-react";
import { ReactNode } from "react";
import { MemoizedMarkdown } from "./memoized-markdown";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import defaultAvatar from "../../../assets/react.svg";

type MessageIconProps = {
	role: "user" | "assistant";
	isStreaming: boolean;
	avatarSrc?: string;
	userIcon?: ReactNode;
	assistantIcon?: ReactNode;
	iconClassName?: string;
};

const MessageIcon = ({
	role,
	isStreaming,
	avatarSrc = defaultAvatar,
	userIcon,
	assistantIcon,
	iconClassName,
}: MessageIconProps) => {
	const baseIconClasses =
		"w-10 h-10 flex-shrink-0 flex items-center justify-center";

	if (role === "user") {
		return (
			<div className={cn(baseIconClasses, iconClassName)}>
				{userIcon || <Clapperboard className="h-6 w-6" />}
			</div>
		);
	}

	return (
		<div
			className={cn(baseIconClasses, "rounded-full text-white", iconClassName)}
		>
			{isStreaming ? (
				<Loader className="h-5 w-5 animate-pulse" />
			) : (
				assistantIcon || (
					<img
						src={avatarSrc}
						className="h-5 w-5 rounded-full overflow-hidden"
						height={20}
						width={20}
						alt="Assistant avatar"
					/>
				)
			)}
		</div>
	);
};

type MessageBubbleProps = {
	role: "user" | "assistant";
	content: string;
	messageId: string;
	className?: string;
	userClassName?: string;
	assistantClassName?: string;
};

const MessageBubble = ({
	role,
	content,
	messageId,
	className,
	userClassName,
	assistantClassName,
}: MessageBubbleProps) => {
	const roleSpecificClass =
		role === "user"
			? cn(
					"text-slate-900  font-semibold paragraph-md py-2 overflow-x-auto   rounded-2xl",
					userClassName
			  )
			: cn("text-blue-950 paragraph-md", assistantClassName);

	return (
		<div className={cn("whitespace-pre-wrap w-full ", className)}>
			<div className={cn("prose max-w-fit", roleSpecificClass)}>
				<MemoizedMarkdown id={messageId} content={content} />
			</div>
		</div>
	);
};

type MessageContentProps = {
	message: Message;
	isStreaming: boolean;
	lastMessage: boolean;
	hasToolInvocations: boolean;
	onSourceClick?: () => void;
	avatarSrc?: string;
	userIcon?: ReactNode;
	assistantIcon?: ReactNode;
	motionConfig?: {
		initial?: Record<string, any>;
		animate?: Record<string, any>;
	};
	iconClassName?: string;
	messageClassName?: string;
	userMessageClassName?: string;
	assistantMessageClassName?: string;
	sourceButtonText?: string;
	sourceButtonClassName?: string;
	separatorClassName?: string;
	containerClassName?: string;
};

export const MessageContent = ({
	message,
	isStreaming,
	lastMessage,
	hasToolInvocations,
	onSourceClick,
	avatarSrc,
	userIcon,
	assistantIcon,
	motionConfig = {
		initial: { y: 5, opacity: 0 },
		animate: { y: 0, opacity: 1 },
	},
	iconClassName,
	messageClassName,
	userMessageClassName,
	assistantMessageClassName,
	sourceButtonText = "View Sources",
	sourceButtonClassName,
	separatorClassName,
	containerClassName,
}: MessageContentProps) => {
	return (
		<div className={cn("flex flex-col", containerClassName)}>
			<motion.div
				initial={motionConfig.initial}
				animate={motionConfig.animate}
				className="flex items-start gap-4"
			>
				<MessageIcon
					role={message.role as "user" | "assistant"}
					isStreaming={isStreaming}
					avatarSrc={avatarSrc}
					userIcon={userIcon}
					assistantIcon={assistantIcon}
					iconClassName={iconClassName}
				/>

				<div className="flex-1 paragraph-md mx-auto overflow-hidden ">
					<MessageBubble
						role={message.role as "user" | "assistant"}
						content={message.content}
						messageId={message.id}
						className={messageClassName}
						userClassName={userMessageClassName}
						assistantClassName={assistantMessageClassName}
					/>

					{message.role === "assistant" &&
						hasToolInvocations &&
						onSourceClick && (
							<div className="mt-2">
								<Button
									variant="outline"
									size="sm"
									onClick={onSourceClick}
									className={cn(
										"text-xs flex items-center gap-1",
										sourceButtonClassName
									)}
								>
									<ExternalLink className="h-3 w-3" />
									{sourceButtonText}
								</Button>
							</div>
						)}

					{!lastMessage && (
						<Separator
							className={cn("w-full my-3 rounded-xl ", separatorClassName)}
						/>
					)}
				</div>
			</motion.div>
		</div>
	);
};
