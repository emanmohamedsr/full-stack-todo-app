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
import ProfilePage from "../pages/Profile";
import LogoutPage from "../pages/Logout";
import ErrorHandler from "../components/error/ErrorHandler";
import PageNotFound from "../pages/PageNotFound";

const storageKey = "loggedinUserData";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<RootLayout />} errorElement={<ErrorHandler />}>
				<Route
					index
					element={
						<ProtectedRoute
							isAllowed={userData?.jwt}
							data={userData}
							redirectPath='/login'>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='login'
					element={
						<ProtectedRoute
							isAllowed={!userData?.jwt}
							data={userData}
							redirectPath='/'>
							<LoginPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='register'
					element={
						<ProtectedRoute
							isAllowed={!userData?.jwt}
							data={userData}
							redirectPath='/login'>
							<RegisterPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='profile'
					element={
						<ProtectedRoute
							isAllowed={userData?.jwt}
							data={userData}
							redirectPath='/login'>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='logout'
					element={
						<ProtectedRoute
							isAllowed={userData?.jwt}
							data={userData}
							redirectPath='/login'>
							<LogoutPage />
						</ProtectedRoute>
					}
				/>
			</Route>
			<Route path='*' element={<PageNotFound />} />
		</>,
	),
);

export default router;
