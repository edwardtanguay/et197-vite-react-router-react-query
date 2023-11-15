import { useQuery, useMutation } from "@tanstack/react-query";
import * as tools from "../tools";
import { IEmployee } from "../interfaces";

const _employees = [
	{
		firstName: "111",
	},
	{
		firstName: "222",
	},
];

export const PageInfo = () => {
	const employeesQuery = useQuery<IEmployee[]>({
		queryKey: ["employees"],
		queryFn: () => tools.wait(1000).then(() => ([..._employees]) as IEmployee[]),
	});

	if (employeesQuery.isLoading) return <p>loading...</p>;
	if (employeesQuery.isError)
		return <pre>{JSON.stringify(employeesQuery.error)}</pre>;

	return (
		<>
			{employeesQuery.data && (
				<>
					<h2 className="mb-3 text-2xl">
						There are {employeesQuery.data.length} employees.
					</h2>
					{employeesQuery.data.map(employee => {
						return (
							<div>{employee.firstName}</div>
						)
					})}
				</>
			)}
		</>
	);
};
