import { motion } from "framer-motion";

// Greeting component
export const Greeting = () => {
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
