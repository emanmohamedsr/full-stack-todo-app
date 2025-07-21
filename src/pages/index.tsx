import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";
import type { ITodo } from "../interfaces";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import TodosSkeleton from "../components/TodosSkeleton";

const HomePage = () => {
	const storageKey = "loggedinUserData";
	const userDataString = localStorage.getItem(storageKey);
	const userData = userDataString ? JSON.parse(userDataString) : null;

	const [todos, setTodos] = useState<ITodo[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	//** Fetch todos from the server
	const fetchTodos = async () => {
		try {
			const res = await axiosInstance.get("/users/me?populate=todos", {
				headers: { Authorization: `Bearer ${userData?.jwt}` },
			});
			if (res.status === 200) {
				setTodos(res.data.todos);
			}
		} catch (error) {
			const errorObj = error as AxiosError;
			console.log(errorObj);
			toast.error("Error fetching todos");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	//** Render
	const todosList = todos.map((todo) => {
		return (
			<li
				key={todo.id}
				className='
              bg-white p-4 rounded-lg 
              border border-gray-200
              shadow-sm hover:shadow-md
              transition-all duration-200
              flex items-center justify-between
            '>
				<p
					className='
              text-gray-800 font-medium
              hover:text-sky-700 transition-colors
            '>
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
	});

	return (
		<div className='w-full flex items-center justify-center min-h-[calc(100vh-60px)] space-y-6'>
			{isLoading ? (
				<TodosSkeleton />
			) : todos.length > 0 ? (
				<ul className='w-full space-y-3'>{todosList}</ul>
			) : (
				<p className='text-gray-500'>No todos found. Please add some!</p>
			)}
		</div>
	);
};

export default HomePage;
