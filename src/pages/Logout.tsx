import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import { useLocation, useNavigate } from "react-router-dom";

const LogoutPage = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const storageKey = "loggedinUserData";

	const handleLogoutFunction = () => {
		localStorage.removeItem(storageKey);
		toast.success("You have been logged out successfully.");
		setTimeout(() => {
			location.replace(pathname);
		}, 2000);
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-[calc(100vh-60px)] px-4'>
			<div className='bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border border-sky-100'>
				{/* Header with icon */}
				<div className='mx-auto flex justify-center mb-4'>
					<div className='p-3 rounded-full bg-sky-100 text-sky-800'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-10 w-10'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={1.5}
								d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
							/>
						</svg>
					</div>
				</div>

				<h1 className='text-2xl font-bold text-sky-800 mb-3'>
					We appreciate your visit!
				</h1>

				<p className='text-gray-600 mb-6'>
					Are you sure you want to log out? You'll need to sign in again to
					access your account.
				</p>

				<div className='flex flex-col sm:flex-row gap-3 justify-center'>
					<Button
						variant='danger'
						onClick={handleLogoutFunction}
						className='w-full sm:w-auto'>
						Confirm Logout
					</Button>

					<Button onClick={() => navigate(-1)} className='w-full sm:w-auto'>
						Go Back
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LogoutPage;
