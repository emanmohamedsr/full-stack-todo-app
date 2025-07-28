const FakeTodoSkeleton = () => {
	return (
		<div className='w-full px-4 bg-white p-4 rounded-lg border border-gray-200 animate-pulse'>
			<div className='w-full flex flex-col space-y-3'>
				<div className='h-5 w-3/4 rounded bg-gray-200'></div>
				<div className='h-3 w-2/3 rounded bg-gray-100'></div>
			</div>
		</div>
	);
};

export default FakeTodoSkeleton;
