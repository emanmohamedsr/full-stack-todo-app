import { useState } from "react";
import FakeTodos from "../components/FakeTodos";
import Paginator from "../components/ui/Paginator";
import useCustomQuery from "../hooks/useCustomQuery";
import { getUserData } from "../utils/getUserData";
import FakeTodosPageSkeleton from "../components/FakeTodosPageSkeleton";
import Select from "../components/ui/Select";

type Option = {
	label: string;
	value: string;
};

const sortOptions: Option[] = [
	{ label: "Latest", value: "ASC" },
	{ label: "Oldest", value: "DESC" },
];

const pageSizeOptions: Option[] = [
	{ label: "5", value: "5" },
	{ label: "10", value: "10" },
	{ label: "50", value: "50" },
	{ label: "100", value: "100" },
];

const FakeTodosPage = () => {
	const userData = getUserData();

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(5);
	const [sortBy, setSortBy] = useState<"ASC" | "DESC">("ASC");
	const [selectedPageSize, setSelectedPageSize] = useState<Option>(
		pageSizeOptions[0],
	);
	const [selectedSortBy, setSelectedSortBy] = useState<Option>(sortOptions[0]);

	const { data, isLoading, isFetching, error } = useCustomQuery({
		queryKey: [`todos-page-${page}-size-${pageSize}-sort-${sortBy}`],
		url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
		config: { headers: { Authorization: `Bearer ${userData?.jwt}` } },
	});

	const onClickPrev = () => setPage((prev) => prev - 1);
	const onClickNext = () => setPage((prev) => prev + 1);

	const faketodos = data?.data || [];

	if (isLoading) return <FakeTodosPageSkeleton count={pageSize} />;
	if (error) throw error;

	return (
		<div>
			{faketodos.length > 0 ? (
				<div className='space-y-4'>
					<div className='w-full mt-6 px-4 space-y-2'>
						<div className='flex items-center justify-between'>
							<Select
								label='Sort by'
								options={sortOptions}
								selected={selectedSortBy}
								onChange={(val) => {
									setSelectedSortBy(val as Option);
									setSortBy(val.value === "ASC" ? "ASC" : "DESC");
								}}
							/>
							<Select
								label='Page size'
								options={pageSizeOptions}
								selected={selectedPageSize}
								onChange={(val) => {
									setSelectedPageSize(val as Option);
									setPageSize(Number(val.value));
									setPage(1);
								}}
							/>
						</div>
						<FakeTodos fakeTodos={faketodos} />
					</div>
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
