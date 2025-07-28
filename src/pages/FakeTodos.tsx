import FakeTodos from "../components/FakeTodos";
import FakeTodosSkeleton from "../components/FakeTodosSkeleton";
import useCustomQuery from "../hooks/useCustomQuery";
import { getUserData } from "../utils/getUserData";

const FakeTodosPage = () => {
	const userData = getUserData();
	const { data, isLoading, error } = useCustomQuery({
		queryKey: ["fakeTodos"],
		url: `/todos`,
		config: { headers: { Authorization: `Bearer ${userData?.jwt}` } },
	});

	const faketodos = data?.data || [];

	if (isLoading) return <FakeTodosSkeleton />;
	if (error) throw error;

	return (
		<div>
			{faketodos.length > 0 ? (
				<FakeTodos fakeTodos={faketodos} />
			) : (
				<p className='text-gray-500 mt-6 text-center'>
					No todos found. Please add some!
				</p>
			)}
		</div>
	);
};

export default FakeTodosPage;
