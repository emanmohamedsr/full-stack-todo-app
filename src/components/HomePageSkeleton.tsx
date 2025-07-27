import TodoSkeleton from "./TodoSkeleton";

interface IProps {
	count?: number;
}
const HomePageSkeleton = ({ count = 3 }: IProps) => {
	const skeletonItems = Array.from({ length: count }, (_, index) => (
		<li key={index}>
			<TodoSkeleton />
		</li>
	));
	return (
		<div className='w-full mt-6 px-4 space-y-4'>
			<div className='w-full flex items-center justify-between'>
				<div className='h-4 w-1/4 rounded bg-gray-200'></div>
				<div className='h-9 w-18 rounded bg-gray-200'></div>
			</div>
			<ul className='w-full mx-auto mt-6 max-w-xl space-y-3'>
				{skeletonItems}
			</ul>
		</div>
	);
};

export default HomePageSkeleton;
