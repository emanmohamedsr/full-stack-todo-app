// condition, redirect path, direct component

import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
	isAllowed: boolean;
	redirectPath: string;
	children: ReactNode;
	data?: unknown;
}

const ProtectedRoute = ({
	isAllowed,
	redirectPath,
	children,
	data,
}: IProps) => {
	return (
		<>
			{!isAllowed ? (
				<Navigate to={redirectPath} replace state={data} />
			) : (
				children
			)}
		</>
	);
};

export default ProtectedRoute;
