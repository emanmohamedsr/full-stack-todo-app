import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { LOGIN_FORM_INPUTS } from "../data";
import ErrorMessage from "../components/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";

interface IFormInput {
	identifier: string;
	password: string;
}

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({ resolver: yupResolver(loginSchema) });
	// Render
	const inputs = LOGIN_FORM_INPUTS.map(({ name, placeholder, type }, idx) => (
		<div key={idx}>
			<Input type={type} placeholder={placeholder} {...register(name)} />
			{errors[name] && <ErrorMessage>{errors[name]?.message}</ErrorMessage>}
		</div>
	));

	const formSubmitHandler = (data: IFormInput) => {
		console.log(data);
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
					<Button type='submit' fullWidth={true}>
						Login
					</Button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
