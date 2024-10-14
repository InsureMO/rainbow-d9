import {VUtils} from '@rainbow-d9/n1';
import {mock} from '../../../../mock-services';
import {loadFromSessionAndBurn, saveToSession} from '../../../../utils';
import {Data} from './types';

const doLoadRegistrationData = async (_registrationId: string): Promise<Data> => {
	// TODO load registration data by registrationId
	throw new Error('Not implemented');
};
const mockDoLoadRegistrationData = async (_registrationId: string): Promise<Data> => {
	return {
		registrationId: `${Math.floor(Math.random() * 1000000000000)}`,
		caseNo: `${Math.floor(Math.random() * 1000000000000)}`,
		registrationNo: `R${Math.floor(Math.random() * 1000000000000)}`,
		manualSubmit: true,
		status: 'submitted',
		insured: {},
		claim: {},
		additional: {directBillingIndicator: 'N'},
		reporter: {notificationMethod: 'email'}
	};
};
export const loadRegistrationData = async (keyOrRegistrationId: string): Promise<Data> => {
	const loaded: string | Data | undefined = loadFromSessionAndBurn(keyOrRegistrationId);
	if (loaded == null) {
		// not found from session, means given key is registrationId
		// should load from remote
		return mock(doLoadRegistrationData).by(mockDoLoadRegistrationData)(keyOrRegistrationId);
	} else if (typeof loaded === 'string') {
		// found a string from session, means loaded is registrationId
		// should load from remote
		return mock(doLoadRegistrationData).by(mockDoLoadRegistrationData)(keyOrRegistrationId);
	} else {
		// found a data from session, use it
		return loaded;
	}
};

export const saveRegistrationData = async (data: Data): Promise<string> => {
	const key = VUtils.generateUniqueId();
	saveToSession(key, data, 60);
	return key;
};
