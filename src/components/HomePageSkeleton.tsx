import TodoSkeleton from "./TodoSkeleton";

const HomePageSkeleton = () => {
	const count = 3;
	const skeletonItems = Array.from({ length: count }, (_, index) => (
		<li key={index}>
			<TodoSkeleton />
		</li>
	));
	return (
		<div className='w-full mt-6 px-4 space-y-4'>
			<div className='w-full flex items-center justify-between animate-pulse'>
				<div className='h-4 w-1/4 rounded bg-gray-200'></div>
				<div className='flex space-x-2'>
					<div className='h-10 w-20 rounded bg-gray-200'></div>
					<div className='h-10 w-20 rounded bg-gray-200'></div>
				</div>
			</div>
			<ul className='w-full mx-auto mt-6 max-w-xl space-y-3'>
				{skeletonItems}
			</ul>
		</div>
	);
};

export default HomePageSkeleton;
