import type { ITodo } from "../interfaces";
import Todo from "./Todo";

interface TodosProps {
	todos: ITodo[];
}

const Todos = ({ todos }: TodosProps) => {
	return (
		<ul className='w-full mx-auto mt-6 max-w-xl space-y-3'>
			{todos.map((todo) => (
				<Todo key={todo.id} todo={todo} />
			))}
		</ul>
	);
};

export default Todos;
