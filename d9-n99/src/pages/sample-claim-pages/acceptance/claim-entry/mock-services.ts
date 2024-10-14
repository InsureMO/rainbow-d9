import {Data} from './types';

export const loadRegistrationData = async (_registrationId: string): Promise<Data> => {
	return {
		registrationId: `${Math.floor(Math.random() * 1000000000000)}`,
		caseNo: `${Math.floor(Math.random() * 1000000000000)}`,
		registrationNo: `R${Math.floor(Math.random() * 1000000000000)}`,
		manualSubmit: true,
		status: 'submitted',
		insured: {},
		claim: {},
		reporter: {notificationMethod: 'email'}
	};
};
