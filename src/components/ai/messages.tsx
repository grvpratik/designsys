"use client";

import type React from "react";
import { useRef, useEffect } from "react";
import { Separator } from "../ui/separator";
import { Brain, Sparkles, User, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { Message} from "@ai-sdk/react";
import { motion } from "framer-motion";

// Type definitions for better TypeScript support

interface ToolInvocation {
	step?: number;
	args: any;
	toolCallId: string;
	toolName: string;
	state: "call" | "result"|"partial-call";
	result?: {
		result: any;
	};
}

interface ChatMessagesProps {
	messages: Message[];
	status: "submitted" | "streaming" | "ready" | "error";
	isLoading: boolean;
	error?: Error | null;
	onSourceClick?: (message: Message) => void;
}

const MessageContent = ({
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
			<div className="flex items-start gap-4">
				{/* Icon - Different icons for user vs AI */}
				{message.role === "user" ? (
					<div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
						<User className="h-6 w-6" />
					</div>
				) : (
					<div className="w-10 h-10 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center text-white">
						{isStreaming ? (
							<Sparkles className="h-5 w-5 animate-pulse" />
						) : (
							<Brain className="h-5 w-5" />
						)}
					</div>
				)}

				{/* Message Bubble */}

				<motion.div
					initial={{ y: 5, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					className="max-w-3xl flex-1 paragraph-md"
				>
					<p className="whitespace-pre-wrap">{message.content}</p>

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

					{lastMessage && <Separator className="w-full my-8 rounded-xl" />}
				</motion.div>
			</div>
		</div>
	);
};

const ToolContent = ({
	toolInvocation,
}: {
	toolInvocation: ToolInvocation;
}) => {
	if (!toolInvocation) return null;

	const { state, toolName, result } = toolInvocation;

	if (state === "result") {
		switch (toolName) {
			case "weatherLookup":
				return (
					<div className="weather-widget bg-blue-50 p-3 rounded-lg mb-3">
						<h3 className="font-medium mb-2">Weather Information</h3>
						<div
							dangerouslySetInnerHTML={{
								__html: result?.result?.replace(/\n/g, "<br/>") || "",
							}}
						/>
					</div>
				);
			case "calculate":
				return (
					<div className="calculator-result font-medium bg-orange-50 rounded-lg p-4 mb-3">
						{result?.result}
					</div>
				);
			default:
				return (
					<div className="tool-result bg-gray-50 p-3 rounded-lg mb-3">
						<pre className="text-sm overflow-x-auto">
							{typeof result?.result === "object"
								? JSON.stringify(result?.result, null, 2)
								: result?.result || "Complete"}
						</pre>
					</div>
				);
		}
	}

	return (
		<div className="tool-loading bg-gray-50 p-3 rounded-lg mb-3">
			<div className="text-sm text-gray-500">Loading {toolName}...</div>
		</div>
	);
};

// Tool invocations container
const ToolInvocations = ({
	toolInvocations,
}: {
	toolInvocations: ToolInvocation[];
}) => {
	if (!toolInvocations || toolInvocations.length === 0) return null;

	return (
		<div className="tool-invocations-container mb-3">
			{toolInvocations.map((invocation, index) => (
				<div key={invocation.toolCallId || index}>
					<ToolContent toolInvocation={invocation} />
				</div>
			))}
		</div>
	);
};

const ChatMessages: React.FC<ChatMessagesProps> = ({
	messages,
	status,
	isLoading,

	error,
	onSourceClick,
}) => {
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to bottom when messages change
	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages, status]);

	// Check if any tool is still loading
	const hasLoadingTools = messages.some((message) =>
		message.parts?.some(
			(tool) =>
				tool.type === "tool-invocation" &&
				tool.toolInvocation.state !== "result"
		)
	);

	return (
		<div className="mx-auto w-full flex flex-col items-center h-full overflow-y-auto flex-1">
			{/* Sticky Header */}
			<div className="max-w-2xl w-full">
				<div className="sticky top-0 bg-white/40 backdrop-blur-lg p-2 md:p-4 z-10">
					<h1 className="text-lg md:text-xl font-bold">Chat</h1>
				</div>

				{/* Messages Container */}
				<div className="flex flex-col p-4 w-full">
					{messages.map((message, index) => {
						const isStreaming =
							isLoading &&
							index === messages.length - 1 &&
							message.role === "assistant" &&
							status === "streaming";

						const lastMessage = index === messages.length - 1;
						const hasToolInvocations = !!message.parts?.filter(
							(tool) => tool.type === "tool-invocation"
						).length;
						const toolObjects =
							message.parts?.filter(
								(tool) => tool.type === "tool-invocation"
							) || [];
						return (
							<div key={message.id || index} className="mb-4">
								<MessageContent
									message={message}
									isStreaming={isStreaming}
									lastMessage={lastMessage}
									hasToolInvocations={hasToolInvocations}
									onSourceClick={
										onSourceClick ? () => onSourceClick(message) : undefined
									}
								/>

								{/* Show tool invocations if any */}
								{hasToolInvocations && (
									<div className="ml-14">
										<ToolInvocations
											toolInvocations={toolObjects.map(
												(tool) => tool.toolInvocation
											)}
										/>
									</div>
								)}
							</div>
						);
					})}

					{/* Show thinking/loading states */}
					{isLoading && (
						<div className="flex items-start gap-4 mb-4">
							<div className="w-10 h-10 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center text-white">
								<Sparkles className="h-5 w-5" />
							</div>
							<div className="max-w-3xl flex-1 paragraph-md bg-gray-50 p-3 rounded-lg">
								{status === "submitted" && (
									<div className="text-gray-500">Thinking...</div>
								)}
								{status === "streaming" && hasLoadingTools && (
									<div className="text-gray-500">
										{messages[messages.length - 1]?.toolInvocations
											?.filter((tool) => tool.state !== "result")
											.map((tool) => tool.toolName)
											.join(", ")}{" "}
										loading...
									</div>
								)}
								{status === "streaming" && !hasLoadingTools && (
									<div className="text-gray-500">Typing...</div>
								)}
							</div>
						</div>
					)}

					{/* Error message */}
					{error && (
						<div className="flex items-start gap-4 mb-4">
							<div className="w-10 h-10 flex-shrink-0 bg-red-500 rounded-full flex items-center justify-center text-white">
								<span>!</span>
							</div>
							<div className="max-w-3xl flex-1 paragraph-md bg-red-50 p-3 rounded-lg text-red-600">
								Error: {error.message}
							</div>
						</div>
					)}

					{/* Invisible element to scroll to */}
					<div ref={messagesEndRef} />
				</div>
			</div>
		</div>
	);
};

export default ChatMessages;
