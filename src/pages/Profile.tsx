const ProfilePage = () => {
	const storageKey = "loggedinUserData";
	const userDataString = localStorage.getItem(storageKey);
	const userData = userDataString ? JSON.parse(userDataString) : null;

	return (
		<div className='w-full flex items-center justify-center min-h-[calc(100vh-60px)] px-4'>
			<div className='w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md'>
				{/* Header Section */}
				<div className='mb-8 text-center'>
					<h1 className='text-3xl font-bold text-sky-800 mb-2'>User Profile</h1>
					<p className='text-gray-600'>Manage your account information</p>
				</div>

				{/* Welcome Card */}
				<div className='bg-sky-50 p-6 rounded-lg mb-8 border border-sky-100'>
					<p className='text-gray-700 text-lg'>
						Welcome back,{" "}
						<span className='font-semibold text-sky-800'>
							{userData?.user.username || "User"}
						</span>
						!
					</p>
				</div>

				{/* User Information Section */}
				{userData && (
					<div className='space-y-6'>
						<h2 className='text-xl font-semibold text-sky-800 border-b pb-2 border-sky-200'>
							Account Details
						</h2>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='bg-gray-50 p-4 rounded-lg'>
								<p className='text-sm font-medium text-gray-500 mb-1'>
									Username
								</p>
								<p className='text-gray-800 font-medium'>
									{userData.user.username}
								</p>
							</div>

							<div className='bg-gray-50 p-4 rounded-lg'>
								<p className='text-sm font-medium text-gray-500 mb-1'>Email</p>
								<p className='text-gray-800 font-medium'>
									{userData.user.email}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
