/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { IEmployee } from "../interfaces";

export const loader = async () => {
	return (
		await axios.get("https://edwardtanguay.vercel.app/share/employees.json")
	).data;
};

export const PageWelcome = () => {
	const employees = useLoaderData() as IEmployee[];
	return (
		<>
			<h2 className="mb-3 text-2xl">There are {employees.length} employees loaded with React Router loader.</h2>
			<ul className="list-disc ml-5">
				{employees.map((employee) => {
					return <li key={employee.employeeID}>{employee.firstName} {employee.lastName}</li>;
				})}
			</ul>
		</>
	);
};
