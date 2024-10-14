import {loadFromSessionAndBurn} from '../../../../utils';
import {Claim} from '../../shared';
import {Data} from './types';

export const loadRegistrationData = (key: string): Claim.Insured | undefined => {
	// data from session storage follows the structure of search page
	const loaded: (Omit<Claim.Insured, 'name'> & { insuredName?: string }) | undefined = loadFromSessionAndBurn(key);
	if (loaded) {
		const {insuredName, ...rest} = loaded;
		return {...rest, name: insuredName ?? ''};
	} else {
		return (void 0);
	}
};
export const createClaimRegistrationCase = async (insured?: Claim.Insured): Promise<Data> => {
	return {
		caseNo: `${Math.floor(Math.random() * 1000000000000)}`,
		manualSubmit: true,
		status: 'draft',
		insured: insured ?? {},
		claim: {}, reporter: {notificationMethod: 'email'}
	};
};
