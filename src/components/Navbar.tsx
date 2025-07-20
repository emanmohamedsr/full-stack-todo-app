const Navbar = () => {
	return (
		<nav className='w-full bg-sky-800 text-white'>
			<div className='container mx-auto p-4'>
				<ul className='flex justify-between items-center '>
					<li>
						<a href='/' className='hover:underline  md:text-lg font-bold'>
							Home
						</a>
					</li>
					<li className='flex space-x-6'>
						<div>
							<a
								href='/login'
								className='hover:underline  md:text-lg font-semibold'>
								Login
							</a>
						</div>

						<div>
							<a
								href='/register'
								className='hover:underline  md:text-lg font-semibold'>
								Register
							</a>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	);
};
export default Navbar;
