"use client";

import { useState } from "react";
import { Message, useChat } from "@ai-sdk/react";
// import { toast } from "../ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessages from "./messages";

import SearchUI from "./search";

import { Greeting } from "./greeting";
import { MobileSourceDialog, SourcePanel } from "./source-pannel";
import useMobile from "../../../lib/useMobile";

// type ToolInvocation = {
// 	toolCallId?: string;
// 	toolName: string;
// 	state: "calling" | "result";
// 	result?: {
// 		result: any;
// 	};
// };

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
	const isMobile = useMobile();

	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,

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

	// // Determine chat state for the ChatMessages component
	// const chatState = {
	// 	lastMessageIsAssistant:
	// 		messages.length > 0 && messages[messages.length - 1].role === "assistant",
	// };
	const closeSourcePanel = () => {
		setSourceOpen(false);
		setCurrentSourceMessage(null);
	};
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
	return (
		<div className="flex w-full h-full relative">
			<div className="flex flex-col h-full w-full overflow-y-auto transition-all">
				<AnimatePresence>
					{messages.length === 0 ? (
						<Greeting />
					) : (
						<div className="flex-1 overflow-y-auto">
							<ChatMessages
								messages={messages}
								status={status}
								error={error}
								onSourceClick={handleSourceClick}
							/>
						</div>
					)}
				</AnimatePresence>

				<div
					className={`${messages.length > 0 ? "sticky bottom-0" : ""}  w-full`}
				>
					<SearchUI
						disabled={status === "submitted"}
						setError={setError}
						input={input}
						handleInputChange={handleInputChange}
						onSubmit={handleSubmit}
						status={status}
						stop={stop}
					/>
				</div>
			</div>

			{!isMobile && (
				<motion.div
					className={`h-full  transform transition-transform duration-300 ease-in-out ${
						sourceOpen ? "translate-x-0 w-[320px] " : "translate-x-full w-0 "
					}  `}
				>
					<SourcePanel
						isOpen={sourceOpen}
						onClose={closeSourcePanel}
						currentMessage={currentSourceMessage}
					/>
				</motion.div>
				// <motion.div
				// 	className="h-full w-[320px] md:block hidden"
				// 	animate={{
				// 		width: sourceOpen ? 320 : 0,
				// 		x: sourceOpen ? 0 : 320
				// 	}}
				// 	transition={{
				// 		type: "spring",
				// 		stiffness: 300,
				// 		damping: 30
				// 	}}
				// >
				// 	<SourcePanel
				// 		isOpen={sourceOpen}
				// 		onClose={closeSourcePanel}
				// 		currentMessage={currentSourceMessage}
				// 	/>
				// </motion.div>
			)}

			{isMobile && (
				<MobileSourceDialog
					isOpen={sourceOpen}
					onClose={closeSourcePanel}
					currentMessage={currentSourceMessage}
				/>
			)}
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
