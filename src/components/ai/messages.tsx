"use client";

import type React from "react";
import { useRef, useEffect } from "react";

import {  Sparkles,  } from "lucide-react";

import { Message } from "@ai-sdk/react";

import { MessageContent } from "./chat-text";
import { ToolInvocations } from "./tool-content";

// Type definitions for better TypeScript support


interface ChatMessagesProps {
	messages: Message[];
	status: "submitted" | "streaming" | "ready" | "error";

	error?: Error | null;
	onSourceClick?: (message: Message) => void;
}




const ChatMessages: React.FC<ChatMessagesProps> = ({
	messages,
	status,

	error,
	onSourceClick,
}) => {
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to bottom when messages change
	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "instant" });
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
	const loading = status === "streaming" || status === "submitted";
	return (
		<div className="mx-auto w-full flex flex-col items-center h-full overflow-y-auto  flex-1">
			{/* Sticky Header */}
			<div className="max-w-2xl w-full">
				<div className="sticky top-0 bg-white/40 backdrop-blur-lg p-2 md:p-4 z-10">
					<h1 className="text-lg md:text-xl font-bold">Chat</h1>
				</div>

				{/* Messages Container */}
				<div className="flex flex-col p-4 w-full">
					{messages.map((message, index) => {
						const isStreaming =
							index === messages.length - 1 &&
							message.role === "assistant" &&
							loading;

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
								{/* {hasToolInvocations && (
									<div className="ml-14">
										<ToolInvocations
											toolInvocations={toolObjects.map(
												(tool) => tool.toolInvocation
											)}
										/>
									</div>
								)}{" "} */}
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
							</div>
						);
					})}

					{/* Show thinking/loading states */}
					{loading && (
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
