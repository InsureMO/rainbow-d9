import {DropdownOptions} from '@rainbow-d9/n2';
import {Claim} from '../../shared';

export interface Data {
	registrationId: string;
	caseNo: string;
	registrationNo: string;
	manualSubmit: boolean;
	submissionChannelId?: string;
	status: string;
	insured: Claim.Insured;
	claim: Claim.Claim;
	additional: Claim.Additional;
	reporter: Claim.Reporter;
	claimIssues: Claim.ClaimIssues;
	queryLetters: Claim.QueryLetters;
	internalQueries: Claim.InternalQueries;
	escalations: Claim.Escalations;
	investigations: Claim.Investigations;
	decision: Claim.AcceptanceDecision;
}

export interface RootModel {
	control: {
		claimIssuesAllSelected: boolean;
	};
	data: Data;
}

export interface AssistantData {
	submissionChannelOptions: DropdownOptions;
	userOptions: DropdownOptions;
	userDepartmentOptions: DropdownOptions;
	escalateToOptions: () => Promise<DropdownOptions>;
	investigatorOptions: () => Promise<DropdownOptions>;
}