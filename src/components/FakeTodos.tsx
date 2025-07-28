import type { ITodo } from "../interfaces";
import FakeTodo from "./FakeTodo";

interface TodosProps {
	fakeTodos: ITodo[];
}

const FakeTodos = ({ fakeTodos }: TodosProps) => {
	return (
		<ul className='w-full mx-auto mt-6 max-w-xl space-y-3'>
			{fakeTodos.map((fakeTodo) => (
				<li key={fakeTodo.id}>
					<FakeTodo fakeTodo={fakeTodo} />
				</li>
			))}
		</ul>
	);
};

export default FakeTodos;
