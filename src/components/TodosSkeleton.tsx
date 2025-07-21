interface IProps {
	count?: number;
}
const TodosSkeleton = ({ count = 3 }: IProps) => {
	const skeletonItems = Array.from({ length: count }, (_, index) => (
		<li
			key={index}
			className=' w-full
            bg-white p-4 rounded-lg
            border border-gray-200
            animate-pulse
          '>
			<div className='flex justify-between items-center'>
				<div className='space-y-2 flex-1'>
					<div className='h-5 w-3/4 rounded bg-gray-200'></div>
					<div className='h-3 w-1/2 rounded bg-gray-100'></div>
				</div>
				<div className='flex space-x-2'>
					<div className='h-8 w-16 rounded bg-gray-200'></div>
					<div className='h-8 w-16 rounded bg-red-200'></div>
				</div>
			</div>
		</li>
	));
	return <ul className='w-full space-y-3'>{skeletonItems}</ul>;
};

export default TodosSkeleton;
