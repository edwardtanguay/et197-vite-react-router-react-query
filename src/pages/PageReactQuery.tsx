import { useQuery } from "@tanstack/react-query";
import { IEmployee } from "../interfaces";
import * as appModel from '../appModel';

export const PageReactQuery = () => {
	const employeesQuery = useQuery<IEmployee[]>({
		queryKey: ["employees"],
		queryFn: async () => appModel.getEmployees()
	});

	if (employeesQuery.isLoading) return <p>loading...</p>;
	if (employeesQuery.isError)
		return <pre>{JSON.stringify(employeesQuery.error)}</pre>;

	return (
		<>
			{employeesQuery.data && (
				<>
					<h2 className="mb-3 text-2xl">
						There are {employeesQuery.data.length} employees loaded with React Query.
					</h2>
		<ul className="list-disc ml-5">
					{employeesQuery.data.map((employee) => {
						return <li key={employee.employeeID}>{employee.lastName}, {employee.firstName} </li>;
					})}
		</ul>
				</>
			)}
		</>
	);
};
