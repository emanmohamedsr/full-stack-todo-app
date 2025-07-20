import type { IRegisterInputs, ILoginInputs } from "../interfaces";

export const REGISTER_FORM_INPUTS: IRegisterInputs[] = [
	{
		name: "email",
		type: "email",
		placeholder: "Enter your email",
	},
	{
		name: "username",
		type: "text",
		placeholder: "Enter your username",
	},
	{
		name: "password",
		type: "password",
		placeholder: "Enter your password",
	},
];

export const LOGIN_FORM_INPUTS: ILoginInputs[] = [
	{
		name: "identifier",
		type: "text",
		placeholder: "Enter your email or username",
	},
	{
		name: "password",
		type: "password",
		placeholder: "Enter your password",
	},
];
