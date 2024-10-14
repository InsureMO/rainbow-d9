import {DropdownOptions} from '@rainbow-d9/n2';
import {Claim} from '../../shared';

export interface Data {
	caseNo?: string;
	registrationNo?: string;
	manualSubmit: boolean;
	submissionChannelId?: string;
	status: string;
	insured?: Claim.Insured;
	claim: Claim.Claim;
	reporter: Claim.Reporter;
}

export interface RootModel {
	data: Data;
}

export interface AssistantData {
	submissionChannelOptions: DropdownOptions;
}