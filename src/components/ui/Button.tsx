import { cn } from "../../lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
	"flex items-center justify-center rounded-md font-medium duration-300 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 ",
	{
		variants: {
			variant: {
				default:
					"bg-sky-800 text-white  hover:bg-sky-700 disabled:bg-gray-600 disabled:text-gray-200 focus:ring-sky-800 hover:focus:ring-sky-700",
				danger:
					"bg-red-900 text-white  hover:bg-red-700 disabled:bg-red-800/50 disabled:text-red-100 focus:ring-red-900 hover:focus:ring-red-700",
				cancel:
					"bg-gray-400 text-white hover:bg-gray-500 disabled:bg-gray-500/50 disabled:text-gray-600 focus:ring-gray-400 hover:focus:ring-gray-400",
			},
			size: {
				default: "p-3",
				sm: "text-sm px-4 py-2",
			},
			fullWidth: {
				true: "w-full",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface ButtonProps
	extends HTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	children: ReactNode;
	isLoading?: boolean;
	type?: "submit" | "button" | "reset";
}

const Button = ({
	variant,
	size,
	fullWidth,
	isLoading,
	className,
	children,
	type,
	...props
}: ButtonProps) => {
	return (
		<button
			type={type}
			className={cn(buttonVariants({ variant, size, fullWidth, className }))}
			{...props}
			disabled={isLoading}>
			{isLoading ? (
				<svg
					className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'>
					<circle
						className='opacity-25'
						cx='12'
						cy='12'
						r='10'
						stroke='currentColor'
						strokeWidth='4'></circle>
					<path
						className='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
				</svg>
			) : null}
			{children}
		</button>
	);
};

export default Button;
