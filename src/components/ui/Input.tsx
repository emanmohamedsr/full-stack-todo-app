import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
	return (
		<input
			className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-800 text-gray-700 placeholder-gray-400'
			{...props}
		/>
	);
};

export default Input;
