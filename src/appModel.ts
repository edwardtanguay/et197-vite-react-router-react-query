import axios from 'axios';
import { IEmployee } from './interfaces';

export const getEmployees = async () => {
	return new Promise<IEmployee[]>((resolve) => {
		(async () => {
			resolve((
				await axios.get(
					"https://edwardtanguay.vercel.app/share/employees.json"
				)
			).data as IEmployee[])
		})();
	});
}