import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import RootLayout from "../pages/Layout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<RootLayout />}>
				<Route
					index
					element={
						<ProtectedRoute isAllowed={false} redirectPath='/login'>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route path='login' element={<LoginPage />} />
				<Route path='register' element={<RegisterPage />} />
			</Route>
		</>,
	),
);

export default router;
