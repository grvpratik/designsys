import React from "react";
import SearchUI from "./search";
import ChatMessages from "./messages";

const GenerativeChat = () => {
	return (
		<div className="flex w-full h-full overflow-y-auto flex-1">
			{/* Header */}
			<div className="flex flex-col h-full w-full">
				<ChatMessages />
				<SearchUI />
			</div>

			{/* Source Div */}
			<div className="transform translate-x-full md:translate-x-0 transition-transform duration-300 h-full w-[20vw] md:block hidden">
				source
			</div>
		</div>
	);
};

export default GenerativeChat;
