import type { AxiosError } from "axios";
import { Link, useLocation, useRouteError } from "react-router-dom";
import type { IErrorResponse } from "../../interfaces";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface IProps {
	defaultStatusCode?: number;
	defaultTitle?: string;
	showRefresh?: boolean;
	showHome?: boolean;
}

const ErrorHandler = ({
	defaultStatusCode = 500,
	defaultTitle = "Server Error",
	showRefresh = true,
	showHome = true,
}: IProps) => {
	const error = useRouteError() as
		| AxiosError<IErrorResponse>
		| Error
		| null
		| undefined;

	const { pathname } = useLocation();

	// Extract error details
	const statusCode =
		(error as AxiosError)?.response?.status || defaultStatusCode;

	const errorMessage =
		(error as AxiosError<IErrorResponse>)?.response?.data?.error?.message ||
		(error as Error)?.message ||
		defaultTitle;

	// Special handling for 401 errors
	useEffect(() => {
		if (statusCode === 401) {
			const storageKey = "loggedinUserData";
			localStorage.removeItem(storageKey);
			toast.error("Session expired. Please login again.");
		}
	}, [statusCode]);

	return (
		<div className='fixed inset-0 flex items-center justify-center p-5 w-full bg-white bg-opacity-90'>
			<div className='text-center max-w-2xl'>
				<div className='inline-flex rounded-full bg-red-100 p-4'>
					{/* Error icon - consider making this dynamic based on status code */}
					<div
						className={`rounded-full p-4 ${
							statusCode >= 500
								? "bg-red-200 stroke-red-600"
								: statusCode === 404
								? "bg-blue-50 stroke-blue-950"
								: "bg-blue-100 stroke-blue-600"
						}`}>
						<svg className='w-16 h-16' viewBox='0 0 28 28' fill='none'>
							{/* Different paths for different error types */}
							{statusCode >= 500 ? (
								<path
									d='M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							) : statusCode === 404 ? (
								<path
									d='M3 10h18M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							) : (
								<path
									d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							)}
						</svg>
					</div>
				</div>

				<h2 className='mt-5 text-[36px] font-bold lg:text-[50px]'>
					{statusCode} - {errorMessage}
				</h2>

				<p className='mt-5 lg:text-lg'>
					{statusCode >= 500
						? "Our servers are having trouble. Please try again later."
						: statusCode === 404
						? "The page you're looking for doesn't exist."
						: "Oops! Something went wrong."}
				</p>

				<div className='flex items-center justify-center gap-4 my-10 flex-wrap'>
					{showHome && (
						<Link
							to='/'
							className='inline-block bg-sky-800 px-4 py-2 text-white hover:bg-sky-700 rounded-md transition-colors'>
							Go Home
						</Link>
					)}

					{showRefresh && (
						<button
							onClick={() => window.location.replace(pathname)}
							className='inline-block bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 rounded-md transition-colors'>
							Refresh Page
						</button>
					)}

					{statusCode === 401 && (
						<Link
							to='/login'
							className='inline-block bg-red-600 px-4 py-2 text-white hover:bg-red-700 rounded-md transition-colors'>
							Login Again
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default ErrorHandler;
