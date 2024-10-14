import {DropdownOptions} from '@rainbow-d9/n2';

export interface Insured {
	customerId?: string;
	name?: string;
	gender?: string;
	idType?: string;
	idNo?: string;
	dob?: string;
}

export interface Claim {
	type?: string;
	notificationDate?: string;
	eventDate?: string;
	nature?: string;
	incidentCode?: string;
	caseClassification?: string;
	previousCaseNo?: string;
	diagnosisCode?: string;
	details?: string;
}

export interface Reporter {
	relationship?: string;
	via?: string;
	name?: string;
	idType?: string;
	typeOfPass?: string;
	idNo?: string;
	postcode?: string;
	address1?: string;
	address2?: string;
	address3?: string;
	address4?: string;
	mobile?: string;
	email?: string;
	notificationMethod?: string;
	handlingProducer?: string;
	producerMobile?: string;
	producerEmail?: string;
}

export interface Data {
	registrationId: string;
	caseNo: string;
	registrationNo: string;
	manualSubmit: boolean;
	submissionChannelId?: string;
	status: string;
	insured: Insured;
	claim: Claim;
	reporter: Reporter;
}

export interface RootModel {
	data: Data;
}

export interface AssistantData {
	submissionChannelOptions: DropdownOptions;
}