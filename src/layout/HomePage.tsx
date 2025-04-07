import type React from "react";

import { useState } from "react";
import { Search } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle";

import SearchUI from "../components/ai/search";
import MessagesUI from "../components/ai/messages";
import GenerativeChat from "../components/ai/GenerativeChat";
export default function Home() {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle search functionality here
		console.log("Searching for:", searchQuery);
	};
	// h-[calc(100vh-78px)]
	return (
		<>
			<GenerativeChat
				id="lol"
				initialMessages={[
					{
						id: "n0AOpFqS2x06jATu",
						createdAt: "2025-04-07T17:03:40.224Z",
						role: "user",
						content: "hello",
						parts: [
							{
								type: "text",
								text: "hello",
							},
						],
					},
					{
						id: "msg-6eAalhw2geUUW8bJkTz4BElc",
						createdAt: "2025-04-07T17:03:45.114Z",
						role: "assistant",
						content: "Hello! How can I help you today?\n",
						parts: [
							{
								type: "text",
								text: "Hello! How can I help you today?\n",
							},
						],
						revisionId: "eYnUQv2fbXDQGTkI",
					},
					{
						id: "htxIHoC6dmy7f8ZK",
						createdAt: "2025-04-07T17:03:54.592Z",
						role: "user",
						content: "whats the weather of new delhi and london",
						parts: [
							{
								type: "text",
								text: "whats the weather of new delhi and london",
							},
						],
					},
					{
						id: "msg-n9ZSzEtHlhWAQ1eew8LknvDO",
						createdAt: "2025-04-07T17:03:55.628Z",
						role: "assistant",
						content:
							"OK. The weather in New Delhi is 20°C, sunny, with 50% humidity and a wind speed of 5 km/h. The weather in London is also 20°C, sunny, with 50% humidity and a wind speed of 5 km/h.\n",
						parts: [
							{
								type: "tool-invocation",
								toolInvocation: {
									state: "result",
									step: 0,
									toolCallId: "jQCK5Tw7tCVwRfCY",
									toolName: "weatherLookup",
									args: {
										location: "new delhi",
										unit: "celsius",
									},
									result: {
										result:
											"Weather in new delhi:\n- Temperature: 20°C\n- Condition: Sunny\n- Humidity: 50%\n- Wind Speed: 5 km/h",
									},
								},
							},
							{
								type: "tool-invocation",
								toolInvocation: {
									state: "result",
									step: 0,
									toolCallId: "mlBLMfbyggn7sBUO",
									toolName: "weatherLookup",
									args: {
										location: "london",
										unit: "celsius",
									},
									result: {
										result:
											"Weather in london:\n- Temperature: 20°C\n- Condition: Sunny\n- Humidity: 50%\n- Wind Speed: 5 km/h",
									},
								},
							},
							{
								type: "text",
								text: "OK. The weather in New Delhi is 20°C, sunny, with 50% humidity and a wind speed of 5 km/h. The weather in London is also 20°C, sunny, with 50% humidity and a wind speed of 5 km/h.\n",
							},
						],
						toolInvocations: [
							{
								state: "result",
								step: 0,
								toolCallId: "jQCK5Tw7tCVwRfCY",
								toolName: "weatherLookup",
								args: {
									location: "new delhi",
									unit: "celsius",
								},
								result: {
									result:
										"Weather in new delhi:\n- Temperature: 20°C\n- Condition: Sunny\n- Humidity: 50%\n- Wind Speed: 5 km/h",
								},
							},
							{
								state: "result",
								step: 0,
								toolCallId: "mlBLMfbyggn7sBUO",
								toolName: "weatherLookup",
								args: {
									location: "london",
									unit: "celsius",
								},
								result: {
									result:
										"Weather in london:\n- Temperature: 20°C\n- Condition: Sunny\n- Humidity: 50%\n- Wind Speed: 5 km/h",
								},
							},
						],
						revisionId: "dC2WpPtxEHQ07ay0",
					},
					{
						id: "NiSIRJgkYnMd7w2X",
						createdAt: "2025-04-07T17:04:14.565Z",
						role: "user",
						content: "whats 43+453",
						parts: [
							{
								type: "text",
								text: "whats 43+453",
							},
						],
					},
					{
						id: "msg-vum46MialFph8EZHlt6fgx18",
						createdAt: "2025-04-07T17:04:15.641Z",
						role: "assistant",
						content: "43 + 453 = 496\n",
						parts: [
							{
								type: "tool-invocation",
								toolInvocation: {
									state: "result",
									step: 0,
									toolCallId: "9zJ4RdafQ47esa1m",
									toolName: "calculate",
									args: {
										expression: "43+453",
									},
									result: {
										result: "43+453 = 496",
									},
								},
							},
							{
								type: "text",
								text: "43 + 453 = 496\n",
							},
						],
						toolInvocations: [
							{
								state: "result",
								step: 0,
								toolCallId: "9zJ4RdafQ47esa1m",
								toolName: "calculate",
								args: {
									expression: "43+453",
								},
								result: {
									result: "43+453 = 496",
								},
							},
						],
						revisionId: "85N9IJeuB68Onoma",
					},
					{
						id: "pum7wO8lpu9RBqk1",
						createdAt: "2025-04-07T17:05:21.430Z",
						role: "user",
						content: "whats the latest news on speech generation",
						parts: [
							{
								type: "text",
								text: "whats the latest news on speech generation",
							},
						],
					},
					{
						id: "msg-yMeK4CDK21f957UKafT0xEpJ",
						createdAt: "2025-04-07T17:05:23.583Z",
						role: "assistant",
						content:
							"Here's some of the latest news on speech generation:\n\n*   OpenAI has launched new speech-to-text and text-to-speech audio models in their API, offering improved accuracy, language recognition, and more expressive voices.\n*   Researchers have developed an AI-powered system that can restore natural speech for paralyzed individuals in real-time, using their own voices.\n*   Neuroscientists are getting closer to creating a commercial device that can instantly translate brain activity into speech for people with severe paralysis.\n*   A brain-computer interface has been developed that can translate thoughts about speech into spoken words in real-time, offering potential help to those unable to speak.",
						parts: [
							{
								type: "tool-invocation",
								toolInvocation: {
									state: "result",
									step: 0,
									toolCallId: "AjHKjMfQhXW5kxFm",
									toolName: "search",
									args: {
										query: "latest news on speech generation",
									},
									result: {
										result: [
											{
												title:
													"Introducing next-generation audio models in the API - OpenAI",
												url: "https://openai.com/index/introducing-our-next-generation-audio-models/",
												content:
													"Today, we’re launching new speech-to-text and text-to-speech audio models in the API—making it possible to build more powerful, customizable, and intelligent voice agents that offer real value. With these new audio models, developers can build more accurate and robust speech-to-text systems and expressive, characterful text-to-speech voices—all within the API. New speech-to-text models We’re introducing new gpt-4o-transcribe and gpt-4o-mini-transcribe models with improvements to word error rate and better language recognition and accuracy, compared to the original Whisper models. These models are available now in the speech-to-text API⁠(opens in a new window). New text-to-speech model The model is available in the text-to-speech API⁠(opens in a new window). These new audio models are available to all developers now – more on building with audio here⁠(opens in a new window).",
												score: 0.37731177,
												raw_content: null,
											},
											{
												title:
													"AI speech breakthrough for people who can't speak - New Atlas",
												url: "https://newatlas.com/medical-tech/brain-waves-spoken-words-ai-paralysis/",
												content:
													"California-based researchers have developed an AI-powered system to restore natural speech for paralyzed people in real time and using their own voices.",
												score: 0.20582284,
												raw_content: null,
											},
											{
												title:
													"New thought-to-speech brain device enables 'natural ... - STAT",
												url: "https://www.statnews.com/2025/04/07/brain-computer-interface-translates-thoughts-real-time/",
												content:
													"Neuroscientists inched closer last week to developing a commercial device that can instantly translate brain activity into speech for people with severe paralysis. A team of researchers from",
												score: 0.14695458,
												raw_content: null,
											},
											{
												title:
													"This brain implant turns a stroke survivor's thoughts into speech in ...",
												url: "https://apnews.com/article/brain-computer-interface-technology-26606f91ce9bb32883cae3a753c63419",
												content:
													"Scientists have developed a device that can translate thoughts about speech into spoken words in real time.. Although it's still experimental, they hope the brain-computer interface could someday help give voice to those unable to speak.. A new study described testing the device on a 47-year-old woman with quadriplegia who couldn't speak for 18 years after a stroke.",
												score: 0.11980942,
												raw_content: null,
											},
											{
												title:
													"Brain-to-voice neuroprosthesis restores naturalistic speech",
												url: "https://engineering.berkeley.edu/news/2025/03/brain-to-voice-neuroprosthesis-restores-naturalistic-speech/",
												content:
													"Decoding neural data into speech. According to study co-lead author Cheol Jun Cho, who is also a UC Berkeley Ph.D. student in electrical engineering and computer sciences, the neuroprosthesis works by sampling neural data from the motor cortex, the part of the brain that controls speech production, then uses AI to decode brain function into speech.",
												score: 0.08688758,
												raw_content: null,
											},
										],
									},
								},
							},
							{
								type: "text",
								text: "Here's some of the latest news on speech generation:\n\n*   OpenAI has launched new speech-to-text and text-to-speech audio models in their API, offering improved accuracy, language recognition, and more expressive voices.\n*   Researchers have developed an AI-powered system that can restore natural speech for paralyzed individuals in real-time, using their own voices.\n*   Neuroscientists are getting closer to creating a commercial device that can instantly translate brain activity into speech for people with severe paralysis.\n*   A brain-computer interface has been developed that can translate thoughts about speech into spoken words in real-time, offering potential help to those unable to speak.",
							},
						],
						toolInvocations: [
							{
								state: "result",
								step: 0,
								toolCallId: "AjHKjMfQhXW5kxFm",
								toolName: "search",
								args: {
									query: "latest news on speech generation",
								},
								result: {
									result: [
										{
											title:
												"Introducing next-generation audio models in the API - OpenAI",
											url: "https://openai.com/index/introducing-our-next-generation-audio-models/",
											content:
												"Today, we’re launching new speech-to-text and text-to-speech audio models in the API—making it possible to build more powerful, customizable, and intelligent voice agents that offer real value. With these new audio models, developers can build more accurate and robust speech-to-text systems and expressive, characterful text-to-speech voices—all within the API. New speech-to-text models We’re introducing new gpt-4o-transcribe and gpt-4o-mini-transcribe models with improvements to word error rate and better language recognition and accuracy, compared to the original Whisper models. These models are available now in the speech-to-text API⁠(opens in a new window). New text-to-speech model The model is available in the text-to-speech API⁠(opens in a new window). These new audio models are available to all developers now – more on building with audio here⁠(opens in a new window).",
											score: 0.37731177,
											raw_content: null,
										},
										{
											title:
												"AI speech breakthrough for people who can't speak - New Atlas",
											url: "https://newatlas.com/medical-tech/brain-waves-spoken-words-ai-paralysis/",
											content:
												"California-based researchers have developed an AI-powered system to restore natural speech for paralyzed people in real time and using their own voices.",
											score: 0.20582284,
											raw_content: null,
										},
										{
											title:
												"New thought-to-speech brain device enables 'natural ... - STAT",
											url: "https://www.statnews.com/2025/04/07/brain-computer-interface-translates-thoughts-real-time/",
											content:
												"Neuroscientists inched closer last week to developing a commercial device that can instantly translate brain activity into speech for people with severe paralysis. A team of researchers from",
											score: 0.14695458,
											raw_content: null,
										},
										{
											title:
												"This brain implant turns a stroke survivor's thoughts into speech in ...",
											url: "https://apnews.com/article/brain-computer-interface-technology-26606f91ce9bb32883cae3a753c63419",
											content:
												"Scientists have developed a device that can translate thoughts about speech into spoken words in real time.. Although it's still experimental, they hope the brain-computer interface could someday help give voice to those unable to speak.. A new study described testing the device on a 47-year-old woman with quadriplegia who couldn't speak for 18 years after a stroke.",
											score: 0.11980942,
											raw_content: null,
										},
										{
											title:
												"Brain-to-voice neuroprosthesis restores naturalistic speech",
											url: "https://engineering.berkeley.edu/news/2025/03/brain-to-voice-neuroprosthesis-restores-naturalistic-speech/",
											content:
												"Decoding neural data into speech. According to study co-lead author Cheol Jun Cho, who is also a UC Berkeley Ph.D. student in electrical engineering and computer sciences, the neuroprosthesis works by sampling neural data from the motor cortex, the part of the brain that controls speech production, then uses AI to decode brain function into speech.",
											score: 0.08688758,
											raw_content: null,
										},
									],
								},
							},
						],
						revisionId: "2TRKoX86gquow9Kg",
					},
					{
						id: "DySpFFlCxWbgGLrI",
						createdAt: "2025-04-07T17:06:56.573Z",
						role: "user",
						content: "whats the latest new price of solana",
						parts: [
							{
								type: "text",
								text: "whats the latest new price of solana",
							},
						],
					},
					{
						id: "msg-m6I4G5qOHIk0Vxq5B1KWdffD",
						createdAt: "2025-04-07T17:06:58.806Z",
						role: "assistant",
						content:
							"The price of Solana is currently around $126.82 to $193.19. It has decreased by 7.56% in the past 24 hours.\n",
						parts: [
							{
								type: "tool-invocation",
								toolInvocation: {
									state: "result",
									step: 0,
									toolCallId: "7QOR2f7FTEMi3Ih2",
									toolName: "search",
									args: {
										query: "current price of Solana",
									},
									result: {
										result: [
											{
												title:
													"Solana Price, SOL Price, Live Charts, and Marketcap: solana price, sol ...",
												url: "https://www.coinbase.com/price/solana",
												content:
													"↘ The price of Solana has decreased by 0.20% in the last hour and decreased by 7.56% in the past 24 hours. The current price is $126.82 per SOL with a 24-hour trading volume of $3.31B. The current circulating supply of Solana is 508,897,946.233 SOL which means that Solana has as total market cap of $64,132,956,775.27. See all About Solana  Solana is a decentralized computing platform that uses SOL to pay for transactions.",
												score: 0.92995757,
												raw_content: null,
											},
											{
												title:
													"Solana Price | Live SOL to USD Converter, Chart & News - Binance",
												url: "https://www.binance.com/en/price/solana",
												content:
													"Solana Price | SOL to USD Converter, Chart and News Solana Price (SOL) Solana Price (SOL) The live price of Solana is $193.19 per (SOL / USD) with a current market cap of $94.22B USD. What Can You Do With Solana (SOL)? What is Solana (SOL)? The current price of SOL is updated in real-time on Binance. What is Solana (SOL) Used For? The price of SOL is updated in real time on Binance. Solana (SOL) can be purchased directly from Binance using a debit or credit card. Solana (SOL) can also be traded for other cryptocurrencies on the Binance exchange. Live SOL price is updated in real-time on Binance. Live Solana price is updated in real-time on Binance.",
												score: 0.9242583,
												raw_content: null,
											},
											{
												title:
													"Solana Price Today, SOL to USD Live Price, Market Cap & Chart",
												url: "https://cointelegraph.com/solana-price-index",
												content:
													"Solana Price Today, SOL to USD Live Price, Market Cap & Chart Solana Price Solana One of the Solana blockchain’s key features is its proof-of-history (PoH) technology, which it uses in tandem with a proof-of-stake (PoS) consensus mechanism. Yakovenko first explained PoH on paper, publishing his work in 2017, which subsequently snowballed into the formation of the Solana blockchain project, with other minds joining the project’s development along the way. Like many crypto assets, SOL’s price fluctuates. Solana price history is available in the Solana price chart (SOL chart) above, alongside the other data above the chart, such as the live Solana price today. XRP and Solana race toward the next crypto ETF approval Time for a Solana price rebound? Solana Market Stats Solana Price",
												score: 0.6867278,
												raw_content: null,
											},
											{
												title:
													"Solana Price: SOL Live Price Chart, Market Cap & News Today - CoinGecko",
												url: "https://www.coingecko.com/en/coins/solana",
												content:
													"The price of Solana (SOL) is calculated in real-time by aggregating the latest data across 166 exchanges and 378 markets, using a global volume-weighted average formula. 75% 25% About Tokenomics Security About Solana (SOL) Solana is a Layer 1 blockchain that offers users fast speeds and affordable costs. It supports smart contracts and facilitates the creation of decentralized applications (dApps). SOL is the native token of the Solana blockchain.",
												score: 0.6334335,
												raw_content: null,
											},
											{
												title:
													"Solana price today, SOL to USD live price, marketcap and chart ...",
												url: "https://coinmarketcap.com/currencies/solana/",
												content:
													"Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. The Solana protocol is designed to facilitate decentralized app (DApp) creation. It aims to improve scalability by introducing a proof-of-history (PoH) consensus combined with the underlying proof-of-stake (PoS) consensus of the blockchain. Solana is known in the cryptocurrency space because of the incredibly short processing times the blockchain offers.",
												score: 0.5920305,
												raw_content: null,
											},
										],
									},
								},
							},
							{
								type: "text",
								text: "The price of Solana is currently around $126.82 to $193.19. It has decreased by 7.56% in the past 24 hours.\n",
							},
						],
						toolInvocations: [
							{
								state: "result",
								step: 0,
								toolCallId: "7QOR2f7FTEMi3Ih2",
								toolName: "search",
								args: {
									query: "current price of Solana",
								},
								result: {
									result: [
										{
											title:
												"Solana Price, SOL Price, Live Charts, and Marketcap: solana price, sol ...",
											url: "https://www.coinbase.com/price/solana",
											content:
												"↘ The price of Solana has decreased by 0.20% in the last hour and decreased by 7.56% in the past 24 hours. The current price is $126.82 per SOL with a 24-hour trading volume of $3.31B. The current circulating supply of Solana is 508,897,946.233 SOL which means that Solana has as total market cap of $64,132,956,775.27. See all About Solana  Solana is a decentralized computing platform that uses SOL to pay for transactions.",
											score: 0.92995757,
											raw_content: null,
										},
										{
											title:
												"Solana Price | Live SOL to USD Converter, Chart & News - Binance",
											url: "https://www.binance.com/en/price/solana",
											content:
												"Solana Price | SOL to USD Converter, Chart and News Solana Price (SOL) Solana Price (SOL) The live price of Solana is $193.19 per (SOL / USD) with a current market cap of $94.22B USD. What Can You Do With Solana (SOL)? What is Solana (SOL)? The current price of SOL is updated in real-time on Binance. What is Solana (SOL) Used For? The price of SOL is updated in real time on Binance. Solana (SOL) can be purchased directly from Binance using a debit or credit card. Solana (SOL) can also be traded for other cryptocurrencies on the Binance exchange. Live SOL price is updated in real-time on Binance. Live Solana price is updated in real-time on Binance.",
											score: 0.9242583,
											raw_content: null,
										},
										{
											title:
												"Solana Price Today, SOL to USD Live Price, Market Cap & Chart",
											url: "https://cointelegraph.com/solana-price-index",
											content:
												"Solana Price Today, SOL to USD Live Price, Market Cap & Chart Solana Price Solana One of the Solana blockchain’s key features is its proof-of-history (PoH) technology, which it uses in tandem with a proof-of-stake (PoS) consensus mechanism. Yakovenko first explained PoH on paper, publishing his work in 2017, which subsequently snowballed into the formation of the Solana blockchain project, with other minds joining the project’s development along the way. Like many crypto assets, SOL’s price fluctuates. Solana price history is available in the Solana price chart (SOL chart) above, alongside the other data above the chart, such as the live Solana price today. XRP and Solana race toward the next crypto ETF approval Time for a Solana price rebound? Solana Market Stats Solana Price",
											score: 0.6867278,
											raw_content: null,
										},
										{
											title:
												"Solana Price: SOL Live Price Chart, Market Cap & News Today - CoinGecko",
											url: "https://www.coingecko.com/en/coins/solana",
											content:
												"The price of Solana (SOL) is calculated in real-time by aggregating the latest data across 166 exchanges and 378 markets, using a global volume-weighted average formula. 75% 25% About Tokenomics Security About Solana (SOL) Solana is a Layer 1 blockchain that offers users fast speeds and affordable costs. It supports smart contracts and facilitates the creation of decentralized applications (dApps). SOL is the native token of the Solana blockchain.",
											score: 0.6334335,
											raw_content: null,
										},
										{
											title:
												"Solana price today, SOL to USD live price, marketcap and chart ...",
											url: "https://coinmarketcap.com/currencies/solana/",
											content:
												"Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions. The Solana protocol is designed to facilitate decentralized app (DApp) creation. It aims to improve scalability by introducing a proof-of-history (PoH) consensus combined with the underlying proof-of-stake (PoS) consensus of the blockchain. Solana is known in the cryptocurrency space because of the incredibly short processing times the blockchain offers.",
											score: 0.5920305,
											raw_content: null,
										},
									],
								},
							},
						],
						revisionId: "bV3DrvcleuPkI9mp",
					},
				]}
			/>
			{/* <div className="flex flex-col items-start gap-2">
					<h1 className=" title-h3">Hello,degen</h1>
					<span className="paragraph-md opacity-75">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut igendi
						maiores, eaque quas qui distinctio ad temporibus quidem hic aut
					</span>
				</div> */}
			{/* <div className=" grid w-full grid-cols-3 flex-1 gap-10">
					{" "}
					<div className=" bg-blue-400 rounded-2xl w-full"></div>
					<div className=" bg-blue-400 rounded-2xl w-full"></div>
					<div className=" bg-blue-400 rounded-2xl w-full"></div>
					<div className=" bg-blue-400 rounded-2xl w-full"></div>
					<div className=" bg-blue-400 rounded-2xl w-full"></div>
					<div className=" bg-blue-400 rounded-2xl w-full"></div>{" "}
				</div> */}

			{/* <SearchUI /> */}
		</>
	);
}
