"use client";

import type React from "react";
import { useRef, useEffect } from "react";
import { Info, Share, Sparkles, Star } from "lucide-react";
import { Message } from "@ai-sdk/react";
import { MessageContent } from "./message-content";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";

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

	const isLoading = status === "submitted" || status === "streaming";

	return (
		<div className="mx-auto w-full flex flex-col items-center h-full overflow-y-auto flex-1">
			{/* Sticky Header */}
			<div className=" w-full">
				<div className="sticky top-0 z-30 bg-gradient-to-b from-gray-100 via-gray-100 to-gray-100/50 rounded-b-md">
					<div className="flex w-full items-center p-1.5 gap-1 md:p-3 rounded-md">
						<div>
							<Star className="size-4" />
						</div>
						<Separator className="mx-0.5 h-4 bg-black" orientation="vertical" />
						<div>
							<span className="text-start paragraph-md">uniwue chat</span>
						</div>
						<div className="ml-auto">
							<Button
								className="gap-1 flex text-sm rounded-lg"
								size="sm"
								variant="outline"
							>
								<Share className="p-0.5" />
								share
							</Button>
						</div>
					</div>
				</div>

				{/* Messages Container */}
				<div className="flex max-w-2xl  mx-auto flex-col p-4 w-full">
					{messages.map((message, index) => {
						const isStreaming =
							index === messages.length - 1 &&
							message.role === "assistant" &&
							isLoading;

						const lastMessage = index === messages.length - 1;
						const hasToolInvocations =
							message.parts?.some((tool) => tool.type === "tool-invocation") ||
							false;

						return (
							<div key={message.id || index} className="mb-4">
								<MessageContent
									message={message}
									isStreaming={isStreaming}
									lastMessage={lastMessage}
									hasToolInvocations={hasToolInvocations}
									userMessageClassName=""
									onSourceClick={
										onSourceClick ? () => onSourceClick(message) : undefined
									}
								/>
							</div>
						);
					})}

					{/* Show thinking/loading states */}
					{isLoading && (
						<div className="flex items-start gap-4 mb-4">
							<div className="w-10 h-10 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center text-white">
								<Sparkles className="h-5 w-5 animate-spin" />
							</div>
							<div className="max-w-2xl flex-1 paragraph-md bg-gray-50 p-3 rounded-lg">
								{status === "submitted" && (
									<div className="text-gray-500">Thinking...</div>
								)}
								{status === "streaming" && (
									<div className="text-gray-500">Typing...</div>
								)}
							</div>
						</div>
					)}

					{/* Error message */}
					{error && (
						<div className="flex items-center gap-4 mb-4">
							<div className="w-10 h-10 flex-shrink-0 bg-red-500 rounded-full flex items-center justify-center text-white">
								<Info />
							</div>
							<div className="max-w-2xl flex-1 paragraph-md bg-red-50 p-3 rounded-lg text-red-600">
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
