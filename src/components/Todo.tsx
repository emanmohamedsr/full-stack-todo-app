import { useState } from "react";
import type { IErrorResponse, IFormInput, ITodo } from "../interfaces";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import axiosInstance from "../config/axios.config";
import { getUserData } from "../utils/getUserData";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import TodoForm from "./TodoForm";

interface TodoProps {
	todo: ITodo;
}

const Todo = ({ todo }: TodoProps) => {
	const userData = getUserData();
	const [isUpdating, setIsUpdating] = useState(false);
	const [isOpenEditModal, setIsOpenEditModal] = useState(false);
	//** Edit Modal Handlers */
	const closeEditModal = () => {
		setIsOpenEditModal(false);
	};
	const openEditModal = () => {
		setIsOpenEditModal(true);
	};

	const [isDeleting, setIsDeleting] = useState(false);
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
	//** Delete Modal Handlers */
	const closeDeleteModal = () => {
		setIsOpenDeleteModal(false);
	};
	const openDeleteModal = () => {
		setIsOpenDeleteModal(true);
	};

	//** Edit handlers */
	const handleSubmitEditModal = async (data: IFormInput) => {
		setIsUpdating(true);
		try {
			const res = await axiosInstance.put(
				`/todos/${todo.documentId}`,
				{
					data: {
						title: data.title,
						description: data.description || "",
					},
				},
				{
					headers: {
						Authorization: `Bearer ${userData?.jwt}`,
					},
				},
			);
			if (res.status === 200) {
				toast.success("Todo updated successfully!");
			}
		} catch (error) {
			const errorObj = error as AxiosError<IErrorResponse>;
			toast.error(
				errorObj.response?.data?.error?.message || "Failed to update todo",
			);
		} finally {
			setIsUpdating(false);
			closeEditModal();
		}
	};
	const handleCancelEditModal = () => {
		closeEditModal();
	};

	//** Delete handlers */
	const handleSubmitDeleteTodo = async () => {
		setIsDeleting(true);
		try {
			const res = await axiosInstance.delete(`/todos/${todo.documentId}`, {
				headers: {
					Authorization: `Bearer ${userData?.jwt}`,
				},
			});
			if (res.status === 204) {
				toast.success("Todo deleted successfully!");
			}
		} catch (error) {
			const errorObj = error as AxiosError<IErrorResponse>;
			toast.error(
				errorObj.response?.data?.error?.message || "Failed to delete todo",
			);
		} finally {
			setIsDeleting(false);
			closeDeleteModal();
		}
	};
	const handleCancelDeleteTodo = () => {
		closeDeleteModal();
	};

	return (
		<>
			<div className='bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between'>
				<div className='flex-1 flex flex-col space-y-2'>
					<p className='text-gray-800 font-medium hover:text-sky-700 transition-colors'>
						{todo.title}
					</p>
					{todo.description && (
						<p className='text-gray-600 text-sm'>{todo.description}</p>
					)}
				</div>
				<div className='flex items-center space-x-2'>
					<Button size='sm' onClick={openEditModal}>
						Edit
					</Button>
					<Button variant='danger' size='sm' onClick={openDeleteModal}>
						Remove
					</Button>
				</div>
			</div>
			<Modal
				isOpen={isOpenEditModal}
				close={closeEditModal}
				title='Edit Todo'
				description='Edit your todo item'>
				<TodoForm
					isLoading={isUpdating}
					todo={todo}
					handleCancelModal={handleCancelEditModal}
					handleSubmitModal={handleSubmitEditModal}
				/>
			</Modal>
			<Modal
				isOpen={isOpenDeleteModal}
				close={closeDeleteModal}
				title='🔔 Deleting a todo'
				description='Are you sure you want to delete this todo?'>
				<div className='flex items-center space-x-2'>
					<Button
						variant={"danger"}
						size='sm'
						onClick={handleSubmitDeleteTodo}
						isLoading={isDeleting}>
						Delete
					</Button>
					<Button onClick={handleCancelDeleteTodo} variant={"cancel"} size='sm'>
						Cancel
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default Todo;
