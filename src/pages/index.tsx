import Todos from "../components/Todos";
import { getUserData } from "../utils/getUserData";
import useCustomQuery from "../hooks/useCustomQuery";
import Button from "../components/ui/Button";
import { useState } from "react";
import Modal from "../components/ui/Modal";
import TodoForm from "../components/TodoForm";
import HomePageSkeleton from "../components/HomePageSkeleton";
import type { IErrorResponse, IFormInput } from "../interfaces";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const userData = getUserData();
	const [queryVersion, setQueryVersion] = useState(0);
	const { data, isLoading, error } = useCustomQuery({
		queryKey: ["todos", queryVersion.toString()],
		url: `/users/me?populate=todos`,
		config: { headers: { Authorization: `Bearer ${userData?.jwt}` } },
	});
	const navigate = useNavigate();

	//** Add Modal Handlers */
	const [isAdding, setIsAdding] = useState(false);
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);
	const closeAddModal = () => {
		setIsOpenAddModal(false);
	};
	const openAddModal = () => {
		setIsOpenAddModal(true);
	};

	const handleCancelAddModal = () => {
		closeAddModal();
	};
	const handleSubmitAddModal = async (data: IFormInput) => {
		setIsAdding(true);
		try {
			const res = await axiosInstance.post(
				"/todos",
				{
					data: {
						...data,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${userData?.jwt}`,
					},
				},
			);
			if (res.status === 200) {
				toast.success("Todo created successfully!");
				setQueryVersion((prev) => prev + 1);
			}
		} catch (error) {
			const errorObj = error as AxiosError<IErrorResponse>;
			toast.error(
				errorObj.response?.data?.error.message || "Something went wrong",
			);
		} finally {
			setIsAdding(false);
			closeAddModal();
		}
	};

	if (isLoading) return <HomePageSkeleton />;
	if (error) throw error;
	return (
		<div className='w-full mt-6 px-4 space-y-4'>
			<header className='w-full flex items-center justify-between'>
				<h1 className='font-semibold text-gray-800'>
					Welcome back{" "}
					<span className='text-lg text-amber-600'>
						{userData?.user.username || "USER"}
					</span>{" "}
					!
				</h1>
				<div className='flex items-center space-x-2'>
					<Button onClick={() => navigate("/fake-todos")} variant={"secondary"}>
						Go to Fake Todos
					</Button>
					<Button onClick={openAddModal} variant={"primary"}>
						Add Todo
					</Button>
				</div>
				<Modal
					isOpen={isOpenAddModal}
					close={closeAddModal}
					title='Add Todo'
					description='Add a new todo item'>
					<TodoForm
						isLoading={isAdding}
						handleCancelModal={handleCancelAddModal}
						handleSubmitModal={handleSubmitAddModal}
					/>
				</Modal>
			</header>
			<div>
				{data?.todos.length > 0 ? (
					<Todos todos={data?.todos} setQueryVersion={setQueryVersion} />
				) : (
					<p className='text-gray-500 mt-6 text-center'>
						No todos found. Please add some!
					</p>
				)}
			</div>
		</div>
	);
};

export default HomePage;
