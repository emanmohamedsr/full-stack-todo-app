import type { ITodo } from "../interfaces";

interface IProps {
	fakeTodo: ITodo;
}

const FakeTodo = ({ fakeTodo }: IProps) => {
	return (
		<div className='bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between'>
			<div className='flex-1 flex flex-col space-y-2'>
				<p className='text-gray-800 font-medium hover:text-sky-700 transition-colors'>
					{fakeTodo.title}
				</p>
				{fakeTodo.description && (
					<p className='text-gray-600 text-sm'>{fakeTodo.description}</p>
				)}
			</div>
		</div>
	);
};

export default FakeTodo;
