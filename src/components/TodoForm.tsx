import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "./ErrorMessage";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { updateTodoSchema } from "../validation";
import { useForm } from "react-hook-form";
import type { IFormInput, ITodo } from "../interfaces";

interface IProps {
	todo?: ITodo;
	isLoading?: boolean;
	handleSubmitModal: (data: IFormInput) => void;
	handleCancelModal: () => void;
}

const TodoForm = ({
	isLoading,
	todo,
	handleSubmitModal,
	handleCancelModal,
}: IProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(updateTodoSchema),
		defaultValues: {
			title: todo?.title || "",
			description: todo?.description || "",
		},
	});
	return (
		<form className='space-y-4' onSubmit={handleSubmit(handleSubmitModal)}>
			<Input id='title' {...register("title")} />
			{errors["title"] && (
				<ErrorMessage>{errors["title"].message}</ErrorMessage>
			)}
			<Textarea id='description' {...register("description")} />
			{errors["description"] && (
				<ErrorMessage>{errors["description"].message}</ErrorMessage>
			)}
			<div className='flex items-center space-x-2'>
				<Button isLoading={isLoading} type='submit' size='sm'>
					Update
				</Button>
				<Button
					type='button'
					variant='cancel'
					size='sm'
					onClick={handleCancelModal}>
					Cancel
				</Button>
			</div>
		</form>
	);
};

export default TodoForm;
