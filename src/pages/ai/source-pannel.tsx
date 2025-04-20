import { X } from "lucide-react";

import { Message } from "@ai-sdk/react";
import { TabsContent,Tabs,TabsTrigger,TabsList } from "../../components/ui/tabs";
import { Dialog,DialogDescription,DialogContent } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

export const MobileSourceDialog = ({
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
			<DialogContent className="sm:max-w-[425px] h-[80vh] p-0">
				{currentMessage && (
					<SourcePanel
						isOpen={isOpen}
						onClose={onClose}
						currentMessage={currentMessage}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};

export const SourcePanel = ({
	isOpen,
	onClose,
	currentMessage,
}: {
	isOpen: boolean;
	onClose: () => void;
	currentMessage: Message | null;
}) => {
	// Early return if currentMessage is null
	if (!currentMessage) {
		return null;
	}
	if (!isOpen) return null;

	const tools =
		currentMessage.parts?.filter((tool) => tool.type === "tool-invocation") ||
		[];

	if (tools.length === 0) {
		return null;
	}

	const toolObj = tools.map((tool) => tool.toolInvocation);
	const uniqueToolNames = Array.from(
		new Set(toolObj.map((tool) => tool.toolName))
	);

	console.log(uniqueToolNames, "uniqueToolNames");
	console.log(uniqueToolNames[0], "uniqueToolNames[0]");
	return (
		<div className={`h-full w-full bg-white border-l p-4 overflow-y-auto `}>
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-semibold">Sources</h3>
				<Button variant="ghost" size="icon" onClick={onClose}>
					<X className="h-4 w-4" />
				</Button>
			</div>

			<Tabs defaultValue={uniqueToolNames[0] || "default"}>
				<TabsList className="w-full">
					{uniqueToolNames.map((tool, index) => (
						<TabsTrigger key={index} value={tool} className="flex-1">
							{tool}
						</TabsTrigger>
					))}
				</TabsList>

				{uniqueToolNames.map((tool, index) => (
					<TabsContent key={index} value={tool} className="mt-4">
						{toolObj
							.filter((toolObj) => toolObj.toolName === tool)
							.map((tool) => (
								<div key={tool.toolCallId} className="mb-4">
									<h4 className="font-medium mb-2">{tool.toolName} Call</h4>
									<pre className="text-sm whitespace-pre-wrap overflow-x-auto">
										{tool.state === "result" &&
										typeof tool.result?.result === "object"
											? JSON.stringify(tool.result.result, null, 2)
											: tool.result?.result || "No result available"}
									</pre>
								</div>
							))}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};
