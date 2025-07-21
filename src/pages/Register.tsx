import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { REGISTER_FORM_INPUTS } from "../data";
import ErrorMessage from "../components/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "../interfaces";

interface IFormInput {
	email: string;
	username: string;
	password: string;
}

const RegisterPage = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(registerSchema),
	});

	const [isLoading, setIsLoading] = useState(false);

	// Render
	const inputs = REGISTER_FORM_INPUTS.map(
		({ name, placeholder, type }, idx) => (
			<div key={idx}>
				<Input type={type} placeholder={placeholder} {...register(name)} />
				{errors[name] && <ErrorMessage>{errors[name]?.message}</ErrorMessage>}
			</div>
		),
	);

	const formSubmitHandler = async (data: IFormInput) => {
		setIsLoading(true);

		try {
			const response = await axiosInstance.post("/auth/local/register", data);
			if (response.status === 200) {
				toast.success(
					"Registration successful! You will be redirected to login after 3 seconds.",
				);
				setTimeout(() => {
					window.location.href = "/login";
				}, 3000);
			}
		} catch (error) {
			const errorObj = error as AxiosError<IErrorResponse>;
			toast.error(
				errorObj.response?.data?.error?.message ||
					"Registration failed. Please try again.",
			);
		} finally {
			reset();
			setIsLoading(false);
		}
	};

	return (
		<div className='flex items-center justify-center min-h-[calc(100vh-60px)]'>
			<div className='w-full max-w-md shadow-lg rounded-2xl p-8 space-y-6'>
				<h1 className='text-lg md:text-2xl font-bold text-center text-gray-700'>
					Register to get access!
				</h1>
				<form
					onSubmit={handleSubmit(formSubmitHandler)}
					className='flex flex-col justify-center align-center space-y-4'>
					{inputs}
					<Button type='submit' fullWidth={true} isLoading={isLoading}>
						Register
					</Button>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
