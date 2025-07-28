import { useState } from "react";
import FakeTodos from "../components/FakeTodos";
import FakeTodosSkeleton from "../components/FakeTodosSkeleton";
import Paginator from "../components/ui/Paginator";
import useCustomQuery from "../hooks/useCustomQuery";
import { getUserData } from "../utils/getUserData";

const FakeTodosPage = () => {
	const userData = getUserData();
	const [page, setPage] = useState<number>(1);
	const { data, isLoading, isFetching, error } = useCustomQuery({
		queryKey: [`todos-page-${page}`],
		url: `/todos?pagination[pageSize]=5&pagination[page]=${page}`,
		config: { headers: { Authorization: `Bearer ${userData?.jwt}` } },
	});

	const faketodos = data?.data || [];

	const onClickPrev = () => {
		setPage((prev) => prev - 1);
	};
	const onClickNext = () => {
		setPage((prev) => prev + 1);
	};

	if (isLoading) return <FakeTodosSkeleton />;
	if (error) throw error;

	return (
		<div>
			{faketodos.length > 0 ? (
				<div className='space-y-4'>
					{isLoading ? (
						<FakeTodosSkeleton />
					) : (
						<FakeTodos fakeTodos={faketodos} />
					)}
					<Paginator
						isLoading={isLoading || isFetching}
						page={page}
						pageCount={data.meta.pagination.pageCount}
						total={data.meta.pagination.total}
						onClickNext={onClickNext}
						onClickPrev={onClickPrev}
					/>
				</div>
			) : (
				<p className='text-gray-500 mt-6 text-center'>Sorry, no todos found.</p>
			)}
		</div>
	);
};

export default FakeTodosPage;
