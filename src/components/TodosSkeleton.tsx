import TodoSkeleton from "./TodoSkeleton";

interface IProps {
	count?: number;
}
const TodosSkeleton = ({ count = 3 }: IProps) => {
	const skeletonItems = Array.from({ length: count }, (_, index) => (
		<li key={index}>
			<TodoSkeleton />
		</li>
	));
	return (
		<ul className='w-full mx-auto mt-6 max-w-xl space-y-3'>{skeletonItems}</ul>
	);
};

export default TodosSkeleton;
