"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Message, useChat } from "@ai-sdk/react";
// import { toast } from "../ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessages from "./messages";
import { X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import SearchUI from "./search";

type ToolInvocation = {
	toolCallId?: string;
	toolName: string;
	state: "calling" | "result";
	result?: {
		result: any;
	};
};

// Search UI component
// const SearchUI = ({
// 	input,
// 	handleInputChange,
// 	handleSubmit,
// 	isLoading,
// 	stop,
// }: {
// 	input: string;
// 	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// 	handleSubmit: (e: React.FormEvent) => void;
// 	isLoading: boolean;
// 	stop: () => void;
// }) => {
// 	return (
// 		<form onSubmit={handleSubmit} className="p-4 bg-white border-t">
// 			<div className="relative flex items-center">
// 				<input
// 					type="text"
// 					value={input}
// 					onChange={handleInputChange}
// 					placeholder="Ask me anything..."
// 					className="flex-1 p-3 pr-20 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// 					disabled={isLoading}
// 				/>
// 				<div className="absolute right-2">
// 					{isLoading ? (
// 						<Button
// 							type="button"
// 							onClick={stop}
// 							variant="destructive"
// 							size="sm"
// 						>
// 							Stop
// 						</Button>
// 					) : (
// 						<Button type="submit" size="sm">
// 							Send
// 						</Button>
// 					)}
// 				</div>
// 			</div>
// 		</form>
// 	);
// };

// Source Panel component
const SourcePanel = ({
	isOpen,
	onClose,
	currentMessage,
}: {
	isOpen: boolean;
	onClose: () => void;
	currentMessage: Message | null;
}) => {
	const tools =
		currentMessage!.parts?.filter((tool) => tool.type === "tool-invocation") ||
		[];

	if (!currentMessage || !tools.length) {
		return null;
	}
	const toolObj = tools.map((tool) => tool.toolInvocation);
	return (
		<div className={`h-full w-full bg-white border-l p-4 overflow-y-auto`}>
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-semibold">Sources</h3>
				<Button variant="ghost" size="icon" onClick={onClose}>
					<X className="h-4 w-4" />
				</Button>
			</div>

			<Tabs defaultValue={toolObj[0]?.toolName || "default"}>
				<TabsList className="w-full">
					{toolObj.map((tool) => (
						<TabsTrigger
							key={tool.toolCallId}
							value={tool.toolName}
							className="flex-1"
						>
							{tool.toolName}
						</TabsTrigger>
					))}
				</TabsList>

				{toolObj.map((tool) => (
					<TabsContent
						key={tool.toolCallId}
						value={tool.toolName}
						className="mt-4"
					>
						<div className="bg-gray-50 p-4 rounded-lg">
							<h4 className="font-medium mb-2">{tool.toolName} Result</h4>
							<pre className="text-sm whitespace-pre-wrap overflow-x-auto">
								{typeof tool.result?.result === "object"
									? JSON.stringify(tool.result.result, null, 2)
									: tool.result?.result || "No result available"}
							</pre>
						</div>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};

// Mobile Source Dialog
const MobileSourceDialog = ({
	isOpen,
	onClose,
	currentMessage,
}: {
	isOpen: boolean;
	onClose: () => void;
	currentMessage: Message | null;
}) => {
	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-[425px] h-[80vh]">
				<SourcePanel
					isOpen={isOpen}
					onClose={onClose}
					currentMessage={currentMessage}
				/>
			</DialogContent>
		</Dialog>
	);
};

// Greeting component
const Greeting = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex flex-col items-center justify-center h-full p-8 text-center"
		>
			<h2 className="text-2xl font-bold mb-6">Welcome to AI Chat</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
				<motion.div
					whileHover={{ scale: 1.05 }}
					className="bg-blue-50 p-6 rounded-lg shadow-sm"
				>
					<h3 className="font-semibold mb-2">Ask Questions</h3>
					<p>Get instant answers to your questions about any topic</p>
				</motion.div>

				<motion.div
					whileHover={{ scale: 1.05 }}
					className="bg-green-50 p-6 rounded-lg shadow-sm"
				>
					<h3 className="font-semibold mb-2">Generate Content</h3>
					<p>Create text, summaries, and more with AI assistance</p>
				</motion.div>

				<motion.div
					whileHover={{ scale: 1.05 }}
					className="bg-purple-50 p-6 rounded-lg shadow-sm"
				>
					<h3 className="font-semibold mb-2">Research Tools</h3>
					<p>Access powerful tools for weather, calculations, and more</p>
				</motion.div>

				<motion.div
					whileHover={{ scale: 1.05 }}
					className="bg-amber-50 p-6 rounded-lg shadow-sm"
				>
					<h3 className="font-semibold mb-2">Smart Assistance</h3>
					<p>Get personalized help for your specific needs</p>
				</motion.div>
			</div>
		</motion.div>
	);
};

// Main GenerativeChat component
const GenerativeChat = ({
	id,
	initialMessages = [],
}: {
	id?: string;
	initialMessages?: Message[];
}) => {
	const [error, setError] = useState<Error | null>(null);
	const [sourceOpen, setSourceOpen] = useState(false);
	const [currentSourceMessage, setCurrentSourceMessage] =
		useState<Message | null>(null);
	const [isMobile, setIsMobile] = useState(false);

	// Check if we're on mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => {
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		stop,
		append,
		setData,
		setMessages,
		data,
		status,
	} = useChat({
		api: "http://localhost:3000/api/chat",
		id,
		initialMessages,
		onFinish: () => {
			console.log("Chat finished");
			setError(null); 
		},
		onError: (err) => {
			console.error("Chat error:", err);
			setError(err);
			// toast({
			// 	variant: "destructive",
			// 	title: "Error",
			// 	description: `Error in chat: ${err.message}`,
			// });
		},
	});

	// Handle source button click
	const handleSourceClick = (message: Message) => {
		if (currentSourceMessage?.id === message.id && sourceOpen) {
			// If clicking the same message, close the panel
			setSourceOpen(false);
			setCurrentSourceMessage(null);
		} else {
			// Otherwise, open with the new message
			setSourceOpen(true);
			setCurrentSourceMessage(message);
		}
	};

	// Close source panel
	const closeSourcePanel = () => {
		setSourceOpen(false);
		setCurrentSourceMessage(null);
	};

	// // Determine chat state for the ChatMessages component
	// const chatState = {
	// 	lastMessageIsAssistant:
	// 		messages.length > 0 && messages[messages.length - 1].role === "assistant",
	// };

	return (
		<div className="flex w-full h-full relative">
			<div className="flex flex-col h-full w-full">
				
				 <AnimatePresence>
					{messages.length === 0 ? (
						<Greeting />
					) : (
						<div className="flex-1 overflow-y-auto">
							<ChatMessages
								messages={messages}
								status={status}
								isLoading={isLoading}
								error={error}
								onSourceClick={handleSourceClick}
							/>
						</div>
					)}
				</AnimatePresence> 

				
				<div
					className={`${
						messages.length > 0 ? "sticky bottom-0" : ""
					} bg-stone-100 w-full`}
				> 
					<SearchUI
						input={input}
						handleInputChange={handleInputChange}
						onSubmit={handleSubmit}
						status={status}
						isLoading={isLoading}
						stop={stop}
					/>
				</div>  
			</div>

		
			{/* {!isMobile && (
				<div
					className={`absolute right-0 top-0 h-full w-[320px] transform transition-transform duration-300 ease-in-out ${
						sourceOpen ? "translate-x-0" : "translate-x-full"
					} md:block hidden`}
				>
					<SourcePanel
						isOpen={sourceOpen}
						onClose={closeSourcePanel}
						currentMessage={currentSourceMessage}
					/>
				</div>
			)}

			
			{isMobile && (
				<MobileSourceDialog
					isOpen={sourceOpen}
					onClose={closeSourcePanel}
					currentMessage={currentSourceMessage}
				/>
			)}  */}
		</div>
		
	);
};

export default GenerativeChat;
// <div className="flex w-full h-full">
		// 	{/* this <div className=" fixed top-0 left-0 right-0 w-full h-8 bg-blue-300"></div> */}
		// 	<div className="flex flex-col h-full w-full">
		// 		{/* render this on when message length===0 and use framer motion for bouncy animate */}
		// 		{/* <div className=" greeting  flex flex-col items-start gap-2">
		// 		<div> Hello user,</div>
		// 		<div>features card</div>
		// 	</div> */}
		// 		{/* hide when messaeg length is greater than 0 chat /} <div className="flex-1 overflow-y-auto"> <ChatMessages /> </div> {/ Input Div when there is no messge remove sticky and bottom 0 */}{" "}
		// 		<div className="sticky bottom-0 bg-stone-100 w-full">
		// 			{" "}
		// 			<SearchUI />{" "}
		// 		</div>{" "}
		// 	</div>

		// 	{/* Source Div create a state for open close (slide) for larger screen and for small create a modal to open also inside create tab for show different tool call result this compoent take state and message id if same source button clicked then close else show respective messgae tool calls  */}
		// 	<div className="transform translate-x-full md:translate-x-0 transition-transform duration-300 h-full w-[20vw] md:block hidden">
		// 		source
		// 	</div>
		// </div>