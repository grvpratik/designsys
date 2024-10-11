
export default function HomePage() {
	return (
		<div className="flex gap-2 p-4">
			<button className="custom-shadow inline-flex items-center h-[34px]  leading-[1.5] p-[calc(8/16*1rem)] rounded-[calc(8/16*1rem)] font-medium text-gray-700 bg-white   hover:bg-gray-50 ">
				Default
			</button>

			<button className="bg-teal-700 text-white px-4 py-2 rounded-md">
				Primary
			</button>

			<button className="px-4 py-2 text-sm font-medium text-teal-700 bg-teal-100 rounded-md hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
				Secondary
			</button>

			<button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
				Danger
			</button>

			<button className="px-4 py-2 text-sm font-medium text-gray-700 bg-transparent hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
				Plain
			</button>
		</div>
	);
}
