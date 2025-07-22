import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";
import type { ITodo, IErrorResponse } from "../interfaces";
import Todos from "../components/Todos";
import TodosSkeleton from "../components/TodosSkeleton";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { getUserData } from "../utils/getUserData";

const HomePage = () => {
	const [todos, setTodos] = useState<ITodo[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const userData = getUserData();

	useEffect(() => {
		if (!userData?.jwt) return;

		axiosInstance
			.get("/users/me?populate=todos", {
				headers: { Authorization: `Bearer ${userData.jwt}` },
			})
			.then((res) => setTodos(res.data.todos))
			.catch((error: AxiosError<IErrorResponse>) => {
				toast.error(
					error.response?.data?.error?.message || "Error fetching todos",
				);
			})
			.finally(() => setIsLoading(false));
	}, [userData?.jwt]);

	return (
		<div className='w-full flex items-center justify-center min-h-[calc(100vh-60px)] p-4'>
			{isLoading ? (
				<TodosSkeleton />
			) : todos.length > 0 ? (
				<Todos todos={todos} />
			) : (
				<p className='text-gray-500 text-center'>
					No todos found. Please add some!
				</p>
			)}
		</div>
	);
};

export default HomePage;
