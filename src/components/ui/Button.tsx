import React from "react";
import { Loader2, LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";


type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "default" | "primary" | "secondary" | "danger" | "plain";

const sizeClasses: Record<ButtonSize, string> = {
	sm: "h-8 px-3 text-sm rounded-button-sm",
	md: "h-10 px-4 text-base rounded-button-md",
	lg: "h-12 px-6 text-lg rounded-button-lg",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	icon?: LucideIcon;
	isLoading?: boolean;
	disabled?: boolean;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = "default",
	size = "md",
	icon: Icon,
	isLoading = false,
	disabled = false,
	className = "",
	...props
}) => {
	const baseClasses =
		"inline-flex items-center justify-center font-medium transition-colors duration-200";

	const variantClasses: Record<ButtonVariant, string> = {
		default: "bg-white text-gray-900 border border-gray-300 hover:bg-gray-100",
		primary: "bg-emerald-600 text-white hover:bg-emerald-700",
		secondary:
			"bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-50",
		danger: "bg-red-600 text-white hover:bg-red-700",
		plain: "bg-transparent text-gray-600 hover:bg-gray-100",
	};

	const buttonClasses = cn(
		baseClasses,
		sizeClasses[size],
		variantClasses[variant],
		{
			"opacity-50 cursor-not-allowed": disabled || isLoading,
		},
		className
	);

	return (
		<button
			className={buttonClasses}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<Loader2
					className={cn(
						"animate-spin",
						size === "sm" ? "w-4 h-4 mr-2" : "w-5 h-5 mr-3"
					)}
				/>
			) : Icon ? (
				<Icon
					className={cn(
						size === "sm" ? "w-4 h-4" : "w-5 h-5",
						children ? "mr-2" : ""
					)}
				/>
			) : null}
			{children}
		</button>
	);
};

export default Button;
