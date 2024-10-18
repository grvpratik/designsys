import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow hover:bg-primary/90 active:bg-primary/80",
				destructive:
					"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/80",
				outline:
					"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-accent/90",
				secondary:
					"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:bg-secondary/70",
				ghost:
					"hover:bg-accent hover:text-accent-foreground active:bg-accent/90",
				link: "text-primary underline-offset-4 hover:underline active:text-primary/80",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3 text-xs",
				lg: "h-12 rounded-md px-8 text-base",
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
