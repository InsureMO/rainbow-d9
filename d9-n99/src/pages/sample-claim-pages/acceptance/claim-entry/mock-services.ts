import {VUtils} from '@rainbow-d9/n1';
import {loadFromSessionAndBurn, saveToSession} from '../../../../utils';
import {Data} from './types';

export const loadRegistrationData = async (keyOrRegistrationId: string): Promise<Data> => {
	const loaded: string | Data | undefined = loadFromSessionAndBurn(keyOrRegistrationId);
	if (loaded == null) {
		// not found from session, means given key is registrationId
		// should load from remote
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
	} else if (typeof loaded === 'string') {
		// found a string from session, means loaded is registrationId
		// should load from remote
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
