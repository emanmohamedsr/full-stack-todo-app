import Todos from "../components/Todos";
import TodosSkeleton from "../components/TodosSkeleton";
import { getUserData } from "../utils/getUserData";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";

const HomePage = () => {
	const userData = getUserData();

	const { data, isLoading, error } = useAuthenticatedQuery({
		queryKey: ["todos"],
		url: `/users/me?populate=todos`,
		config: { headers: { Authorization: `Bearer ${userData?.jwt}` } },
	});

	if (isLoading) return <TodosSkeleton />;
	if (error) {
		throw error;
	}
	return data?.todos.length > 0 ? (
		<Todos todos={data?.todos} />
	) : (
		<p className='text-gray-500 mt-6 text-center'>
			No todos found. Please add some!
		</p>
	);
};

export default HomePage;
