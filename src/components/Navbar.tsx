import { NavLink } from "react-router-dom";

const Navbar = () => {
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
				</ul>
			</div>
		</nav>
	);
};
export default Navbar;
