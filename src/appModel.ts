import axios from 'axios';
import { IEmployee } from './interfaces';

const _millisecondsWait = 1000;

export const getEmployees = async () => {
	return new Promise<IEmployee[]>((resolve) => {
		setTimeout(async () => {
			resolve((
				await axios.get(
					"https://edwardtanguay.vercel.app/share/employees.json"
				)
			).data as IEmployee[])
		}, _millisecondsWait)
	});
}