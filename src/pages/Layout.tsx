import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
	return (
		<div>
			<Navbar />
			<main className='container mx-auto'>
				<Outlet />
			</main>
		</div>
	);
};

export default RootLayout;
