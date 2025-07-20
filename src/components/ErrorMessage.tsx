import type { ReactNode } from "react";

interface Iprops {
	children: ReactNode;
}

const ErrorMessage = ({ children }: Iprops) => {
	return (
		<span className='mt-1 ml-1 block text-red-700 text-sm'>{children}</span>
	);
};

export default ErrorMessage;
