import React from "react";
import "./../styles/index.css";

import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import SearchUI from "../pages/ai/search";

const ChatDetailsPage = () => {
	const location = useLocation();
	return (
		<div className="w-full h-full flex flex-col">
			<div className="flex flex-col max-w-2xl w-full flex-1    mx-auto px-2 md:px-4 ">
				<motion.div
					key={location.key}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					
					<MessagesUI />
				</motion.div>
				<div className="sticky bottom-0 left-0 right-0 w-full  pb-2">
					<SearchUI />
				</div>
			</div>
		</div>
	);
};

export default ChatDetailsPage;
