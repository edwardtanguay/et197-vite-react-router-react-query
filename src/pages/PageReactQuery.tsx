import { useQuery } from "@tanstack/react-query";
import { IEmployee } from "../interfaces";
import * as employeeModel from "../dataModel/employeeModel";
import { wait } from "../tools";
import { useNavigate } from "react-router-dom";

export const PageReactQuery = () => {
	const navigate = useNavigate();

	const employeesQuery = useQuery<IEmployee[]>({
		queryKey: ["employees"],
		queryFn: () => wait(1000).then(() => employeeModel.getEmployees()),
	});

	if (employeesQuery.isLoading) {
		return (
			<p>
				{employeesQuery.failureCount > 0
					? "Retrying" + "...".repeat(employeesQuery.failureCount * 3)
					: "Loading..."}
			</p>
		);
	}
	if (employeesQuery.isError) {
		// return <pre>{String(employeesQuery.error)}</pre>;
		navigate("/error");
	}

	return (
		<>
			{employeesQuery.data && (
				<div className={employeesQuery.data ? "fadein" : ""}>
					<h2 className="mb-3 text-2xl">
						There are {employeesQuery.data.length} employees loaded
						with React Query.
					</h2>
					<ul className="list-disc ml-5">
						{employeesQuery.data.map((employee) => {
							return (
								<li key={employee.employeeID}>
									{employee.lastName}, {employee.firstName}{" "}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</>
	);
};
