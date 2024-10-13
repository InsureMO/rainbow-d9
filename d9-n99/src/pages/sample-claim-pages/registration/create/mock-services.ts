import {loadFromSessionAndBurn} from '../../../../utils';
import {Data, Insured} from './types';

export const loadRegistrationData = (key: string): Insured | undefined => {
	// data from session storage follows the structure of search page
	const loaded: (Omit<Insured, 'name'> & { insuredName?: string }) | undefined = loadFromSessionAndBurn(key);
	if (loaded) {
		const {insuredName, ...rest} = loaded;
		return {...rest, name: insuredName ?? ''};
	} else {
		return (void 0);
	}
};
export const createClaimRegistrationCase = async (insured?: Insured): Promise<Data> => {
	return {
		caseNo: `${Math.floor(Math.random() * 1000000000000)}`,
		manualSubmit: true,
		status: 'draft',
		insured: insured ?? {},
		claim: {}, reporter: {notificationMethod: 'email'}
	};
};

export const askSubmissionChannel = async (channelId: string): Promise<{ channelId: string, name: string }> => {
	return {channelId, name: 'Mock Submission Channel'};
};
