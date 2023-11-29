import axios from "axios";
import { IEmployee } from "../interfaces";

export const getEmployees = async () => {
	return new Promise<IEmployee[]>((resolve, reject) => {
		(async () => {
			try {
				const _employees = (
					await axios.get(
						"https://edwardtanguay.vercel.app/share/employees.json"
					)
				).data as IEmployee[];
				resolve(_employees);
			} catch (e) {
				reject("Unknown error.");
			}
		})();
	});
};
