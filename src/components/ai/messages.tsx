import React from "react";
import SearchUI from "./search";
import { Separator } from "../ui/separator";
import IridescentSphere from "../ui/circle";
import { AirVent, Brain, User } from "lucide-react";

const ChatMessages = () => {
	// Dummy data for messages
	const messages = [
		{ role: "user", content: "Hello, how can you help me today?" },
		{
			role: "ai",
			content:
				"Hi there! I'm Claude, an AI assistant. I can help you with information, creative writing, coding, and more. What would you like to know?",
		},
		{ role: "user", content: "Can you tell me about React's useState hook?" },
		{
			role: "ai",
			content:
				"useState is one of React's built-in hooks that lets you add state to functional components. It returns a stateful value and a function to update it. The syntax is: const [state, setState] = useState(initialValue). This makes it easy to manage local component state without using class components.",
		},
		{ role: "user", content: "Can you show me a simple example?" },
		{
			role: "ai",
			content:
				"Sure! Here's a simple counter example using useState:\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </div>\n  );\n}",
		},
	];

	return (
		<div className="  mx-auto w-full flex flex-col items-center h-full overflow-y-auto  flex-1 ">
			{/* Sticky Header */}
			<div className=" max-w-2xl"><div className="sticky top-0 bg-white/40 backdrop-blur-lg p-2 md:p-4  z-10">
				<h1 className="text-lg md:text-xl font-bold ">new title</h1>
			</div>

			{/* Messages Container */}
			<div className="flex flex-col    p-4 ">
				{messages.map((message, index) => (
					<div key={index} className="flex flex-col">
						{/* Message */}
						<div className="flex items-start gap-4">
							{/* Icon - Different icons for user vs AI */}
							{message.role === "user" ? (
								<div className="w-10 h-10 flex-shrink-0 ">
									<User/>
								</div>
							) : (
								<div className="w-10 h-10 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center">
									<Brain/>
								</div>
							)}
							

							{/* Message Bubble */}

							<div
								className={`  max-w-3xl flex-1 paragraph-md  ${
									message.role === "user" ? "" : ""
								}`}
							>
								<p className="whitespace-pre-wrap">{message.content}</p>
								{index < messages.length - 1 && (
									<Separator className="w-full my-8 rounded-xl" />
								)}
							</div>
						</div>

						{/* Separator (except for the last message) */}
					</div>
				))}
			</div></div>
			
		</div>
	);
};

export default ChatMessages;
