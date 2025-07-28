import FakeTodoSkeleton from "./FakeTodoSkeleton";

interface IProps {
	count?: number;
}
const FakeTodosPageSkeleton = ({ count = 5 }: IProps) => {
	const skeletonItems = Array.from({ length: count }, (_, index) => (
		<li key={index}>
			<FakeTodoSkeleton />
		</li>
	));
	return (
		<div className='w-full mt-6 px-4 space-y-4'>
			<div className='w-full flex items-center justify-between animate-pulse'>
				<div className='h-10 w-20 rounded bg-gray-200'></div>
				<div className='h-10 w-20 rounded bg-gray-200'></div>
			</div>
			<ul className='w-full mx-auto mt-6 max-w-xl space-y-3'>
				{skeletonItems}
			</ul>
		</div>
	);
};

export default FakeTodosPageSkeleton;
