import { cn } from "../../lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
	"flex items-center justify-center rounded-md font-medium text-white duration-300 dark:text-black disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 hover:focus:ring-sky-700 focus:ring-sky-800",
	{
		variants: {
			variant: {
				// ** FILLED
				default:
					"bg-slate-900 dark:bg-sky-800 dark:text-white dark:hover:bg-sky-700",
				danger:
					"bg-red-900 dark:bg-[#c2344d] dark:text-white dark:hover:bg-red-700",
				cancel:
					"bg-gray-300 text-gray-700 dark:bg-[#f5f5fa] dark:text-dark hover:bg-gray-400 dark:hover:bg-gray-200",

				// ** OUTLINE
				outline:
					"border border-sky-800 hover:text-white bg-transparent text-black hover:border-transparent hover:bg-sky-800 dark:text-gray-700 dark:hover:text-white",
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
