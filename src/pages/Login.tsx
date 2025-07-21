import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { LOGIN_FORM_INPUTS } from "../data";
import ErrorMessage from "../components/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "../interfaces";
import { Link } from "react-router-dom";

interface IFormInput {
	identifier: string;
	password: string;
}

const LoginPage = () => {
	//** Initialize form with validation schema
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({ resolver: yupResolver(loginSchema) });

	//** State for loading indicator
	const [isLoading, setIsLoading] = useState(false);

	//** Render
	const inputs = LOGIN_FORM_INPUTS.map(({ name, placeholder, type }, idx) => (
		<div key={idx}>
			<Input type={type} placeholder={placeholder} {...register(name)} />
			{errors[name] && <ErrorMessage>{errors[name]?.message}</ErrorMessage>}
		</div>
	));

	//** Form submission handler
	const formSubmitHandler = async (data: IFormInput) => {
		setIsLoading(true);
		try {
			const response = await axiosInstance.post("/auth/local", data);
			if (response.status === 200) {
				toast.success(
					"Welcome back, " +
						response.data.user.username +
						"! you will be redirected to the homepage after 2 seconds.",
				);

				localStorage.setItem("loggedinUserData", JSON.stringify(response.data));

				setTimeout(() => location.replace("/"), 2000);
			}
		} catch (error) {
			const errorObj = error as AxiosError<IErrorResponse>;
			toast.error(
				errorObj.response?.data?.error?.message ||
					"Login failed. Please try again.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex items-center justify-center min-h-[calc(100vh-60px)]'>
			<div className='w-full max-w-md shadow-lg rounded-2xl p-8 space-y-6'>
				<h1 className='text-lg md:text-2xl font-bold text-center text-gray-700'>
					Login to get access!
				</h1>
				<form
					onSubmit={handleSubmit(formSubmitHandler)}
					className='flex flex-col justify-center align-center space-y-4'>
					{inputs}
					<Button type='submit' fullWidth={true} isLoading={isLoading}>
						Login
					</Button>
				</form>
				<div className='text-center text-sm flex items-center justify-center text-gray-500 space-x-2'>
					<p>Don't have an account?</p>
					<Link to='/register' className='text-sky-800 hover:underline'>
						Register here
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
