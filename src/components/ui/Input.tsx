import { forwardRef, type InputHTMLAttributes, type Ref } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef(
	({ ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
		return (
			<input
				ref={ref}
				className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-800 text-gray-700 placeholder-gray-400'
				{...props}
			/>
		);
	},
);

export default Input;
