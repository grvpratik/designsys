

interface ToolInvocation {
	step?: number;
	args: any;
	toolCallId: string;
	toolName: string;
	state: "call" | "result" | "partial-call";
	result?: {
		result: any;
	};
}



export const ToolContent = ({
	toolInvocation,
}: {
	toolInvocation: ToolInvocation;
}) => {
	if (!toolInvocation) return null;

	const { state, toolName, result } = toolInvocation;

	if (state === "result") {
		switch (toolName) {
			case "weatherLookup":
				return (
					<div className="weather-widget bg-blue-50 p-3 rounded-lg mb-3">
						<h3 className="font-medium mb-2">Weather Information</h3>
						<div
							dangerouslySetInnerHTML={{
								__html: result?.result?.replace(/\n/g, "<br/>") || "",
							}}
						/>
					</div>
				);
			case "calculate":
				return (
					<div className="calculator-result font-medium bg-orange-50 rounded-lg p-4 mb-3">
						{result?.result}
					</div>
				);
			default:
				return (
					<div className="tool-result bg-gray-50 p-3 rounded-lg mb-3">
						<pre className="text-sm overflow-x-auto">
							{typeof result?.result === "object"
								? JSON.stringify(result?.result, null, 2)
								: result?.result || "Complete"}
						</pre>
					</div>
				);
		}
	}

	return (
		<div className="tool-loading bg-gray-50 p-3 rounded-lg mb-3">
			<div className="text-sm text-gray-500">Loading {toolName}...</div>
		</div>
	);
};

// Tool invocations container
export const ToolInvocations = ({
	toolInvocations,
}: {
	toolInvocations: ToolInvocation[];
}) => {
	if (!toolInvocations || toolInvocations.length === 0) return null;

	return (
		<div className="tool-invocations-container mb-3">
			{toolInvocations.map((invocation, index) => (
				<div key={invocation.toolCallId || index}>
					<ToolContent toolInvocation={invocation} />
				</div>
			))}
		</div>
	);
};
