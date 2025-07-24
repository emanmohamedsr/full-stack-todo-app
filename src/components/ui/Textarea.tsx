import { forwardRef, type Ref, type TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef(
	({ ...rest }: TextareaProps, ref: Ref<HTMLTextAreaElement>) => {
		return (
			<textarea
				ref={ref}
				className='border-[1px] border-gray-300 shadow-md focus:border-sky-800
			focus:outline-none focus:ring-1 focus:ring-sky-800 rounded-lg px-3 py-3
			text-md w-full bg-transparent'
				rows={6}
				{...rest}
			/>
		);
	},
);

export default Textarea;
