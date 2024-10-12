export interface Insured {
	customerId: string;
	insuredName: string;
	gender: string;
	idType: string;
	idNo: string;
	dob: string;
}

export interface Data {
	insured?: Insured;
}

export interface RootModel {
	data: Data;
}