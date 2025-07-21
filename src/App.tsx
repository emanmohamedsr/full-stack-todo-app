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
					duration: 2000,
					style: {
						background: "#f0fdfa",
						color: "#075985",
						border: "1px solid #bae6fd",
						width: "fit-content",
						borderRadius: "0.5rem",
					},
				}}
			/>
		</>
	);
};

export default App;
