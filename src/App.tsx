import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster
				position='bottom-center'
				toastOptions={{
					duration: 3000,
					style: {
						backgroundColor: "#6B7280",
						color: "#ffffff",
						border: "1px solid #6b7280",
						borderRadius: "0.5rem",
						width: "fit-content",
					},
				}}
			/>
		</>
	);
};

export default App;
