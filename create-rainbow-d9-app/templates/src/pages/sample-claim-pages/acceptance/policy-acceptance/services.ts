import {VUtils} from '@rainbow-d9/n1';
import {mock} from '../../../../mock-services';
import {loadFromSessionAndBurn, saveToSession} from '../../../../utils';
import {SharedServices} from '../../shared';
import {Data} from './types';

export const saveRegistrationData = async (data: Partial<Data>): Promise<string> => {
	const key = VUtils.generateUniqueId();
	saveToSession(key, data, 60);
	return key;
};

const doLoadRegistrationData = async (_keyOrRegistrationId: string): Promise<Data> => {
	// TODO load registration data by registrationId
	throw new Error('Not implemented');
};
const mockDoLoadMockRegistrationData = async (_keyOrRegistrationId: string): Promise<Data> => {
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
			title: 'Missing documents', generatedAt: '13/10/2024', generatedBy: 'system',
			lastUpdatedAt: '13/10/2024', lastUpdatedBy: 'system',
			status: 'open'
		}, {
			title: 'Missing documents', generatedAt: '14/10/2024', generatedBy: 'system',
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
		internalQueries: [{
			queryNo: '101',
			type: 'task',
			title: 'Please life assured.',
			assignee: SharedServices.Users.Chris.userId,
			generatedAt: '14/10/2024', generatedBy: 'system',
			dueDate: '24/10/2024',
			lastUpdatedAt: '14/10/2024', lastUpdatedBy: 'system',
			status: 'open'
		}],
		escalations: [{
			escalatedTo: 'system',
			escalatedAt: '14/10/2024', escalatedBy: 'system',
			dueDate: '24/10/2024',
			lastUpdatedAt: '14/10/2024', lastUpdatedBy: 'system',
			status: 'wait'
		}],
		investigations: [{
			submittedTo: SharedServices.Users.David.userId,
			submittedAt: '14/10/2024', submittedBy: 'system',
			dueDate: '24/10/2024',
			lastUpdatedAt: '14/10/2024', lastUpdatedBy: 'system',
			status: 'wait'
		}],
		decision: {
			policies: [
				{
					policyNo: 'K000017185',
					policyHolderName: 'David',
					currentStatus: 'active',
					statusAtEvent: 'active',
					currency: 'CNY',
					bankruptcyInvolved: false,
					serviceAgentName: 'Charles',
					serviceAgentMobile: '12345678',
					products: [
						{
							code: 'GEMA01',
							name: 'COMPREHENSIVE CARE',
							acceptable: true,
							accept: true,
							notifiedAmount: 300000,
							sumAssured: 500000,
							insuredName: 'Joshua',
							statusAtEvent: 'active',
							currentStatus: 'active',
							commencementDate: '01/01/2024',
							expiryDate: '31/12/2024'
						}, {
							code: 'GEMA17',
							name: 'COMPREHENSIVE ACCIDENT CARE',
							acceptable: false,
							accept: false,
							notifiedAmount: (void 0),
							sumAssured: 100000,
							insuredName: 'Joshua',
							statusAtEvent: 'active',
							currentStatus: 'active',
							commencementDate: '01/01/2024',
							expiryDate: '31/12/2024'
						}
					]
				},
				{
					policyNo: 'K000017187',
					policyHolderName: 'David',
					currentStatus: 'active',
					statusAtEvent: 'active',
					currency: 'HKD',
					bankruptcyInvolved: false,
					serviceAgentName: 'River',
					serviceAgentMobile: '87654321',
					products: [
						{
							code: 'GEMA02',
							name: 'COMPREHENSIVE CARE',
							acceptable: true,
							accept: true,
							notifiedAmount: 300000,
							sumAssured: 500000,
							insuredName: 'Joshua',
							statusAtEvent: 'active',
							currentStatus: 'active',
							commencementDate: '01/01/2024',
							expiryDate: '31/12/2024'
						}, {
							code: 'GEMA18',
							name: 'COMPREHENSIVE MEDICAL CARE',
							acceptable: false,
							accept: false,
							notifiedAmount: (void 0),
							sumAssured: 100000,
							insuredName: 'Joshua',
							statusAtEvent: 'active',
							currentStatus: 'active',
							commencementDate: '01/01/2024',
							expiryDate: '31/12/2024'
						}
					]
				}
			]
		}
	};
};

export const loadRegistrationData = async (keyOrRegistrationId: string): Promise<Data> => {
	const loaded: string | Data | undefined = loadFromSessionAndBurn(keyOrRegistrationId);
	if (loaded == null) {
		// not found from session, means given key is registrationId
		// should load from remote
		return await mock(doLoadRegistrationData).by(mockDoLoadMockRegistrationData)(keyOrRegistrationId);
	} else if (typeof loaded === 'string') {
		// found a string from session, means loaded is registrationId
		// should load from remote
		return await mock(doLoadRegistrationData).by(mockDoLoadMockRegistrationData)(keyOrRegistrationId);
	} else {
		// found a data from session, use it
		return loaded;
	}
};
