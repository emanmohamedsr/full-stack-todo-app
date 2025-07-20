import type { TRegisterForm, TLoginForm } from "../types";

interface IValidation {
	required?: string;
	pattern?: {
		value: RegExp;
		message: string;
	};
	minLength?: {
		value: number;
		message: string;
	};
}
export interface IRegisterInputs {
	name: TRegisterForm;
	type: string;
	placeholder: string;
	validation: IValidation;
}

export interface ILoginInputs {
	name: TLoginForm;
	type: string;
	placeholder: string;
	validation: IValidation;
}
