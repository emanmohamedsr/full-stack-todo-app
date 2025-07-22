import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../utils/getUserData";
// import { toast } from "react-hot-toast";

interface ProtectedRouteProps {
	children: React.ReactNode;
	requireAuth?: boolean;
	redirectPath: string;
}

const ProtectedRoute = ({
	children,
	requireAuth = true,
	redirectPath,
}: ProtectedRouteProps) => {
	const navigate = useNavigate();
	const userData = getUserData();
	const shouldRedirect: boolean =
		(requireAuth && !userData?.jwt) || (!requireAuth && userData?.jwt);

	useEffect(() => {
		if (shouldRedirect) {
			navigate(redirectPath);
		}
	}, [shouldRedirect, navigate, redirectPath]);

	// Only render children if auth state matches requirement
	if ((requireAuth && userData?.jwt) || (!requireAuth && !userData?.jwt)) {
		return <>{children}</>;
	}

	// Show nothing while redirecting
	return null;
};

export default ProtectedRoute;
