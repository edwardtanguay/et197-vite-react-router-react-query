export interface IEmployee {
	employeeID: number;
	firstName: string;
	lastName: string;
}

export interface INewSkill {
	idCode: string;
	name: string;
	url: string;
	description: string;
}

export interface ISkill extends INewSkill {
	id: number;
}
