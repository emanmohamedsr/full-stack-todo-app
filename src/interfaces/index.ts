import type { TRegisterForm, TLoginForm } from "../types";

export interface IRegisterInputs {
	name: TRegisterForm;
	type: string;
	placeholder: string;
}

export interface ILoginInputs {
	name: TLoginForm;
	type: string;
	placeholder: string;
}

export interface IErrorResponse {
	error: {
		message?: string;
	};
}

export interface ITodo {
	id: number;
	documentId: string;
	title: string;
	description?: string;
}

export interface IFormInput {
	title: string;
	description?: string;
}
