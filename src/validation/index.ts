import * as yup from "yup";

export const registerSchema = yup
	.object({
		username: yup
			.string()
			.required("Username is required")
			.min(4, "Username must be at least 4 characters long"),
		password: yup
			.string()
			.required("Password is required")
			.min(6, "Password must be at least 6 characters long"),
		email: yup
			.string()
			.required("Email is required")
			.email("Invalid email address")
			.matches(
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"Invalid email format",
			),
	})
	.required();

export const loginSchema = yup
	.object({
		identifier: yup
			.string()
			.required("Email is required")
			.email("Invalid email address")
			.matches(
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"Invalid email format",
			),
		password: yup
			.string()
			.required("Password is required")
			.min(6, "Password must be at least 6 characters long"),
	})
	.required();

export const updateTodoSchema = yup.object({
	title: yup.string().required("Title is required"),
});
