import React from "react";
import { Loader2, LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";


type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "default" | "primary" | "secondary" | "danger" | "plain";

const sizeClasses: Record<ButtonSize, string> = {
	sm: "h-[32px] px-[6px] p-s text-sm rounded-button-sm",
	md: "h-[40px]  px-[10px] p-m text-base rounded-button-md",
	lg: "h-[48px]  px-[14px]  text-lg rounded-button-lg",
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
		"inline-flex  flex-shrink-0  font-medium leading-[1.5] items-center justify-center custom-shadowx  transition-colors duration-200";

	const variantClasses: Record<ButtonVariant, string> = {
		default:
			" bg-background-primary text-foreground-primary border border-border-primary hover:bg-background-hover",
		primary:
			"bg-background-accent text-foreground-accent-inverted hover:bg-background-accent-hover active:bg-background-accent-active",
		secondary:
			"bg-background-primary text-foreground-accent border border-border-primary hover:bg-background-hover",
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
