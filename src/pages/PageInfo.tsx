import { useQuery, useMutation } from "@tanstack/react-query";
import * as tools from "../tools";

const _employees = [
	{
		firstName: "111",
	},
	{
		firstName: "222",
	},
];

export const PageInfo = () => {
	const employeesQuery = useQuery({
		queryKey: ["employees"],
		queryFn: () => tools.wait(1000).then(() => [..._employees]),
	});

	if (employeesQuery.isLoading) return <p>loading...</p>;
	if (employeesQuery.isError) return <pre>{JSON.stringify(employeesQuery.error)}</pre>
	return <p>This is the info page.</p>;
};
