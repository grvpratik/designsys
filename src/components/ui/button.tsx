import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
	"inline-flex items-center rounded-button-md justify-center gap-2 whitespace-nowrap  text-sm font-medium transition-all   focus-visible:outline-none    disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-background-accent text-foreground-accent-inverted hover:bg-background-accent-hover active:bg-background-accent-active",
				destructive:
					"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/80",
				outline:
					"custom-shadowx text-foreground-primary border border-border-primary hover:bg-background-hover bg-background-primary ",
				secondary:
					"custom-shadowx bg-background-primary text-foreground-accent border border-border-primary hover:bg-background-hover",
				ghost: "bg-transparent hover:bg-background-hover",
				link: "text-primary  underline-offset-4 hover:underline active:text-primary/80",
			},
			size: {
				default: "h-10 px-4 py-2 text-md",
				sm: "h-[32px] px-[8px] p-s text-sm rounded-button-sm",
				lg: "h-12 rounded-button-lg px-8 text-base",
				icon: "h-10 w-10",
			},
			isActive: {
				true: "ring-2 ring-ring ring-offset-2",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			isActive: false,
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			isActive,
			asChild = false,
			isLoading = false,
			children,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, isActive, className }))}
				ref={ref}
				{...props}
			>
				{isLoading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Loading...
					</>
				) : (
					children
				)}
			</Comp>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
