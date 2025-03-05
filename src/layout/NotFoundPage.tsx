function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-4xl font-bold">404</h1>
			<p className="text-xl mt-2">Page Not Found</p>
			<a href="/" className="mt-4 underline">
				Return to Home
			</a>
		</div>
	);
}

export default NotFoundPage;
