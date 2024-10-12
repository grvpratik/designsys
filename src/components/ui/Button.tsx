import React from "react";
import { Loader2 } from "lucide-react";

const sizeClasses = {
	sm: "px-2 py-1 text-sm",
	md: "px-4 py-2 text-base",
	lg: "px-6 py-3 text-lg",
};

const Button = ({
	children,
	variant = "primary",
	size = "md",
	icon: Icon,
	isLoading = false,
	disabled = false,
	className = "",
	...props
}) => {
	const baseClasses =
		"font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center";

	const variantClasses = {
		primary:
			"bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
		secondary:
			"bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50",
		outline:
			"bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
	};

	const disabledClasses = "opacity-50 cursor-not-allowed";

	const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled || isLoading ? disabledClasses : ""}
    ${className}
  `.trim();

	return (
		<button
			className={buttonClasses}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<Loader2 className="w-5 h-5 mr-2 animate-spin" />
			) : Icon ? (
				<Icon className={`w-5 h-5 ${children ? "mr-2" : ""}`} />
			) : null}
			{children}
		</button>
	);
};

export default Button;
