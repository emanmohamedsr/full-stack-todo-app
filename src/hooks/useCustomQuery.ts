import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import type { AxiosRequestConfig } from "axios";

interface IAuthenticatedQuery {
	queryKey: string[];
	url: string;
	config?: AxiosRequestConfig;
}

const useCustomQuery = ({ queryKey, url, config }: IAuthenticatedQuery) =>
	useQuery({
		queryKey,
		queryFn: async () => {
			const res = await axiosInstance.get(url, config);
			return res.data;
		},
	});

export default useCustomQuery;
