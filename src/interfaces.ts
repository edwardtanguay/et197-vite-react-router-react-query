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

export interface INewFlashcard {
	front: string;
	back: string;
}

export interface IFlashcard extends INewFlashcard {
	id: number;
}
