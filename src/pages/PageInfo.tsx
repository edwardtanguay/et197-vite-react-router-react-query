import { useQuery } from "@tanstack/react-query";
// import * as tools from "../tools";
import { IEmployee } from "../interfaces";
import axios from "axios";

// const _employees = [
// 	{
// 		firstName: "111",
// 	},
// 	{
// 		firstName: "222",
// 	},
// ];

export const PageInfo = () => {
	const employeesQuery = useQuery<IEmployee[]>({
		queryKey: ["employees"],
		queryFn: async () =>
			(
				await axios.get(
					"https://edwardtanguay.vercel.app/share/employees.json"
				)
			).data as IEmployee[],
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
					<ul className="list-disc ml-5">
						{employeesQuery.data.map((employee) => {
							return <li>{employee.firstName}</li>;
						})}
					</ul>
				</>
			)}
		</>
	);
};
