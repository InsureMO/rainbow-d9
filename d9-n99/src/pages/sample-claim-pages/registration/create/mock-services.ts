import {Data, Insured} from './types';

export const createClaimRegistrationCase = async (insured?: Omit<Insured, 'name'> & {
	insuredName?: string
}): Promise<Data> => {
	const {insuredName, ...rest} = insured ?? {};
	return {
		caseNo: `${Math.floor(Math.random() * 1000000000000)}`,
		manualSubmit: true,
		status: 'draft',
		insured: {...rest, name: insuredName ?? ''},
		claim: {}, reporter: {notificationMethod: 'email'}
	};
};

export const askSubmissionChannel = async (channelId: string): Promise<{ channelId: string, name: string }> => {
	return {channelId, name: 'Mock Submission Channel'};
};