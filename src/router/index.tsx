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
import FakeTodosPage from "../pages/FakeTodos";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<RootLayout />} errorElement={<ErrorHandler />}>
				<Route
					index
					element={
						<ProtectedRoute requireAuth redirectPath='/login'>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='login'
					element={
						<ProtectedRoute requireAuth={false} redirectPath='/'>
							<LoginPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='register'
					element={
						<ProtectedRoute requireAuth={false} redirectPath='/'>
							<RegisterPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='profile'
					element={
						<ProtectedRoute requireAuth redirectPath='/login'>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='logout'
					element={
						<ProtectedRoute requireAuth redirectPath='/login'>
							<LogoutPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/fake-todos'
					element={
						<ProtectedRoute requireAuth redirectPath='/login'>
							<FakeTodosPage />
						</ProtectedRoute>
					}
				/>
			</Route>
			<Route path='*' element={<PageNotFound />} />
		</>,
	),
);

export default router;
