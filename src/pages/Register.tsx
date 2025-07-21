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
import { Link } from "react-router-dom";
interface IFormInput {
	email: string;
	username: string;
	password: string;
}

const RegisterPage = () => {
	//** Initialize form with validation schema
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(registerSchema),
	});

	//** State for loading indicator
	const [isLoading, setIsLoading] = useState(false);

	//** Render
	const inputs = REGISTER_FORM_INPUTS.map(
		({ name, placeholder, type }, idx) => (
			<div key={idx}>
				<Input type={type} placeholder={placeholder} {...register(name)} />
				{errors[name] && <ErrorMessage>{errors[name]?.message}</ErrorMessage>}
			</div>
		),
	);

	//** Form submission handler
	const formSubmitHandler = async (data: IFormInput) => {
		setIsLoading(true);

		try {
			const response = await axiosInstance.post("/auth/local/register", data);
			if (response.status === 200) {
				toast.success(
					"Registration successful! You will be redirected to login after 2 seconds.",
				);
				setTimeout(() => location.replace("/login"), 2000);
			}
		} catch (error) {
			const errorObj = error as AxiosError<IErrorResponse>;
			toast.error(
				errorObj.response?.data?.error?.message ||
					"Registration failed. Please try again.",
			);
		} finally {
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
					<Button type='submit' fullWidth isLoading={isLoading}>
						Register
					</Button>
				</form>
				<div className='text-center text-sm flex items-center justify-center text-gray-500 space-x-2'>
					<p>Have an account?</p>
					<Link to='/login' className='text-sky-800 hover:underline'>
						Login here
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
