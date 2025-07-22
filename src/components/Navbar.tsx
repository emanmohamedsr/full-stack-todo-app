import { NavLink } from "react-router-dom";
import { getUserData } from "../utils/getUserData";

const Navbar = () => {
	const userData = getUserData();
	return (
		<nav className='w-full bg-sky-800 text-white'>
			<div className='container mx-auto p-4'>
				<ul className='flex justify-between items-center '>
					<li>
						<NavLink
							to='/'
							className={({ isActive }) =>
								`hover:underline focus:outline-none  md:text-lg font-bold ${
									isActive ? "underline" : ""
								}`
							}>
							Home
						</NavLink>
					</li>
					{!userData?.jwt ? (
						<li className='flex space-x-6'>
							<div>
								<NavLink
									to='/login'
									className={({ isActive }) =>
										`hover:underline focus:outline-none  md:text-lg font-bold ${
											isActive ? "underline" : ""
										}`
									}>
									Login
								</NavLink>
							</div>

							<div>
								<NavLink
									to='/register'
									className={({ isActive }) =>
										`hover:underline focus:outline-none  md:text-lg font-bold ${
											isActive ? "underline" : ""
										}`
									}>
									Register
								</NavLink>
							</div>
						</li>
					) : (
						<li className='flex space-x-6'>
							<div>
								<NavLink
									to='/profile'
									className={({ isActive }) =>
										`hover:underline focus:outline-none  md:text-lg font-bold ${
											isActive ? "underline" : ""
										}`
									}>
									Profile
								</NavLink>
							</div>
							<div>
								<NavLink
									to='/logout'
									className={({ isActive }) =>
										`hover:underline focus:outline-none  md:text-lg font-bold ${
											isActive ? "underline" : ""
										}`
									}>
									Logout
								</NavLink>
							</div>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};
export default Navbar;
