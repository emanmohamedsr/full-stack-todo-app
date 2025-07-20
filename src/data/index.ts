import type { IRegisterInputs, ILoginInputs } from "../interfaces";

export const REGISTER_FORM_INPUTS: IRegisterInputs[] = [
	{
		name: "email",
		type: "email",
		placeholder: "Enter your email",
		validation: {
			required: "Email is required",
			pattern: {
				value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
				message: "Invalid email address",
			},
		},
	},
	{
		name: "username",
		type: "text",
		placeholder: "Enter your username",
		validation: {
			required: "Username is required",
			minLength: {
				value: 3,
				message: "Username must be at least 3 characters long",
			},
		},
	},
	{
		name: "password",
		type: "password",
		placeholder: "Enter your password",
		validation: {
			required: "Password is required",
			minLength: {
				value: 6,
				message: "Password must be at least 6 characters long",
			},
		},
	},
];

export const LOGIN_FORM_INPUTS: ILoginInputs[] = [
	{
		name: "identifier",
		type: "text",
		placeholder: "Enter your email or username",
		validation: {
			required: "Identifier is required",
		},
	},
	{
		name: "password",
		type: "password",
		placeholder: "Enter your password",
		validation: {
			required: "Password is required",
			minLength: {
				value: 6,
				message: "Password must be at least 6 characters long",
			},
		},
	},
];
