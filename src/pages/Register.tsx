import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { REGISTER_FORM_INPUTS } from "../data";
import ErrorMessage from "../components/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";

interface IFormInput {
	email: string;
	username: string;
	password: string;
}

const RegisterPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(registerSchema),
	});
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
		console.log(data);
		try {
			const response = await axiosInstance.post("/auth/local/register", data);
			if (response.status === 200) {
				toast.success(
					"Registration successful! You will be redirected to login after 3 seconds.",
					{
						duration: 3000,
						position: "bottom-center",
						style: {
							backgroundColor: "#6B7280",
							color: "#ffffff",
							border: "1px solid #6b7280",
							borderRadius: "0.5rem",
							width: "fit-content",
						},
					},
				);
				setTimeout(() => {
					window.location.href = "/login";
				}, 3000);
			}
		} catch (error) {
			console.error("Registration failed:", error);
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
					<Button type='submit' fullWidth={true}>
						Register
					</Button>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
