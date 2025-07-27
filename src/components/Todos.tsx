import type { Dispatch } from "react";
import type { ITodo } from "../interfaces";
import Todo from "./Todo";

interface TodosProps {
	todos: ITodo[];
	setQueryVersion: Dispatch<React.SetStateAction<number>>;
}

const Todos = ({ todos, setQueryVersion }: TodosProps) => {
	return (
		<ul className='w-full mx-auto mt-6 max-w-xl space-y-3'>
			{todos.map((todo) => (
				<li key={todo.id}>
					<Todo todo={todo} setQueryVersion={setQueryVersion} />
				</li>
			))}
		</ul>
	);
};

export default Todos;
