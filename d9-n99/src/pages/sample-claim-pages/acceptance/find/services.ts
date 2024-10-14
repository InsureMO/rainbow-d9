import {VUtils} from '@rainbow-d9/n1';
import {mock} from '../../../../mock-services';
import {Page} from '../../../../services';
import {saveToSession} from '../../../../utils';
import {Criteria, ResultItem} from './types';

const baseItem: ResultItem = {
	registrationId: '10000',
	policyNo: 'P10000',
	registrationNo: 'R10000',
	caseNo: 'C10000',
	insuredName: 'John Doe',
	status: 'submitted'
};
const doAskRegistrationList = async (_criteria: Criteria, _pageNumber: number = 1, _pageSize: number = 10): Promise<Page<ResultItem>> => {
	// TODO ask registration list by given criteria
	throw new Error('Not implemented');
};
const mockDoAskRegistrationList = async (_criteria: Criteria, pageNumber: number = 1, pageSize: number = 10) => {
	return new Promise<Page<ResultItem>>(resolve => {
		setTimeout(() => {
			resolve({
				pageNumber, pageSize, pageCount: 10, itemCount: 95,
				data: new Array(pageNumber === 10 ? 5 : 10).fill(1).map(() => {
					const item = {...baseItem};
					const random = Math.random();
					item.insuredName = random >= 0.5 ? 'John Doe' : 'Jane Doe';
					item.policyNo = 'P' + `${Math.ceil(Math.floor(random * 1000000000))}`.padStart(10, '0');
					item.registrationNo = 'R' + `${Math.ceil(Math.floor(random * 1000000000))}`.padStart(10, '0');
					item.caseNo = 'C' + `${Math.ceil(Math.floor(random * 1000000000))}`.padStart(10, '0');
					return item;
				})
			});
		}, 300);
	});
};
export const askRegistrationList = mock(doAskRegistrationList).by(mockDoAskRegistrationList);

export const saveRegistrationData = async (registrationId: string) => {
	const key = VUtils.generateUniqueId();
	saveToSession(key, registrationId, 60);
	return key;
};
