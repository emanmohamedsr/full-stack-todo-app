interface IProps {
	page: number;
	pageCount: number;
	total: number;
	isLoading: boolean;
	onClickPrev: () => void;
	onClickNext: () => void;
}

const Paginator = ({
	page,
	pageCount,
	onClickPrev,
	onClickNext,
	isLoading,
	total,
}: IProps) => {
	return (
		<div className='flex flex-col md:flex-row items-center justify-center gap-6 mt-6'>
			<p className='text-sm text-gray-600'>
				Page <span className='font-medium text-gray-900 mx-1'>{page}</span> of{" "}
				<span className='font-medium text-gray-900 mx-1'>{pageCount}</span> |
				Total <span className='font-medium text-gray-900 mx-1'>{total}</span>{" "}
				records
			</p>

			<div className='flex space-x-2'>
				<button
					type='button'
					className='px-4 py-2 cursor-pointer text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-sky-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed'
					disabled={page === 1 || isLoading}
					onClick={onClickPrev}>
					<div className='flex items-center'>
						<svg
							className='w-3.5 h-3.5 mr-2'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 14 10'>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M13 5H1m0 0 4 4M1 5l4-4'
							/>
						</svg>
						Previous
					</div>
				</button>
				<button
					type='button'
					className='px-4 py-2 text-sm cursor-pointer font-medium text-white bg-gray-800 rounded-lg hover:bg-sky-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed'
					disabled={page === pageCount || isLoading}
					onClick={onClickNext}>
					<div className='flex items-center'>
						Next
						<svg
							className='w-3.5 h-3.5 ml-2'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 14 10'>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M1 5h12m0 0L9 1m4 4L9 9'
							/>
						</svg>
					</div>
				</button>
			</div>
		</div>
	);
};

export default Paginator;
