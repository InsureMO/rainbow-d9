import {VUtils} from '@rainbow-d9/n1';
import {loadFromSessionAndBurn, saveToSession} from '../../../../utils';
import {Data} from './types';

export const saveRegistrationData = async (data: Partial<Data>): Promise<string> => {
	const key = VUtils.generateUniqueId();
	saveToSession(key, data, 60);
	return key;
};

const askMockRegistrationData = () => {
	return {
		registrationId: `${Math.floor(Math.random() * 1000000000000)}`,
		caseNo: `${Math.floor(Math.random() * 1000000000000)}`,
		registrationNo: `R${Math.floor(Math.random() * 1000000000000)}`,
		manualSubmit: true,
		status: 'submitted',
		insured: {},
		claim: {},
		additional: {directBillingIndicator: 'N'},
		reporter: {notificationMethod: 'email'},
		claimIssues: [{
			type: 'miss-doc', generatedAt: '14/10/2024', generatedBy: 'system',
			lastUpdatedAt: '14/10/2024', lastUpdatedBy: 'system',
			status: 'open'
		}],
		queryLetters: [{
			docNo: '101',
			docName: 'Query Letter',
			generatedAt: '14/10/2024', generatedBy: 'system',
			dueDate: '24/10/2024',
			lastUpdatedAt: '14/10/2024', lastUpdatedBy: 'system',
			status: 'open'
		}],
		internalLetters: [],
		escalations: [],
		investigations: []
	};
};
export const loadRegistrationData = async (keyOrRegistrationId: string): Promise<Data> => {
	const loaded: string | Data | undefined = loadFromSessionAndBurn(keyOrRegistrationId);
	if (loaded == null) {
		// not found from session, means given key is registrationId
		// should load from remote
		return askMockRegistrationData();
	} else if (typeof loaded === 'string') {
		// found a string from session, means loaded is registrationId
		// should load from remote
		return askMockRegistrationData();
	} else {
		// found a data from session, use it
		return loaded;
	}
};
