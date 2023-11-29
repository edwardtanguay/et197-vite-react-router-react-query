import axios from "axios";
import { ISkill } from "../interfaces";

export const getSkills = async () => {
	return new Promise<ISkill[]>((resolve, reject) => {
		(async () => {
			try {
				const _skills = (
					await axios.get(
						"http://localhost:4003/skills"
					)
				).data as ISkill[];
				resolve(_skills);
			} catch (e) {
				reject("Unknown error.");
			}
		})();
	});
};

