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
