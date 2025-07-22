import type { ITodo } from "../interfaces";
import Button from "./ui/Button";

interface TodoProps {
	todo: ITodo;
}

const Todo = ({ todo }: TodoProps) => {
	return (
		<li className='bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between'>
			<p className='text-gray-800 font-medium hover:text-sky-700 transition-colors'>
				{todo.title}
			</p>
			<div className='flex items-center space-x-2'>
				<Button size='sm'>Edit</Button>
				<Button variant='danger' size='sm'>
					Remove
				</Button>
			</div>
		</li>
	);
};

export default Todo;
