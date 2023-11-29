import axios from "axios";
import { INewSkill, ISkill } from "../interfaces";

export const getSkills = async () => {
	return new Promise<ISkill[]>((resolve, reject) => {
		(async () => {
			try {
				const _skills = (
					await axios.get("http://localhost:4003/skills")
				).data as ISkill[];
				resolve(_skills);
			} catch (e) {
				reject("Unknown error.");
			}
		})();
	});
};

export const addSkill = async () => {
	return new Promise<string>((resolve, reject) => {
		(async () => {
			try {
				const headers = {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				};

				const skill:INewSkill = {
					idCode: "from app3",
					name: "NEW SKILL: " + (new Date()).toISOString(),
					url: "https://onespace.pages.dev/techItems?id=36",
					description:
						"together with React and Vue.js one of the three most popular JavaScript frameworks",
				};

				const response = await axios.post(
					"http://localhost:4003/skills",
					skill,
					{ headers }
				);

				if (response.status === 201) {
					resolve('ok');
				} else {
					reject('Error status ' + response.status)
				}
			} catch (e) {
				reject("Unknown error.");
			}
		})();
	});
};
