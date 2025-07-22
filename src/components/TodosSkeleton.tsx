import TodoSkeleton from "./TodoSkeleton";

interface IProps {
	count?: number;
}
const TodosSkeleton = ({ count = 1 }: IProps) => {
	const skeletonItems = Array.from({ length: count }, (_, index) => (
		<li key={index}>
			<TodoSkeleton />
		</li>
	));
	return <ul className='w-full max-w-xl space-y-3'>{skeletonItems}</ul>;
};

export default TodosSkeleton;
