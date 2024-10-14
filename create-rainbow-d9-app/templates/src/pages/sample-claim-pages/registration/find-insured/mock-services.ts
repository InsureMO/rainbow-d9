import {VUtils} from '@rainbow-d9/n1';
import {Page} from '../../../../services';
import {saveToSession} from '../../../../utils';
import {Criteria, ResultItem} from './types';

const baseItem: ResultItem = {
	customerId: '10000',
	insuredName: 'John Doe',
	gender: 'M',
	idType: 'idCard',
	idNo: 'I123456789',
	dob: '01/01/1980',
	relatedPolicyNos: ['P12345678901', 'P12345678902'],
	ongoingClaimNos: ['C12345678901', 'C12345678902']
};
const askMockData = async (pageNumber: number = 1, pageSize: number = 10) => {
	return new Promise<Page<ResultItem>>(resolve => {
		setTimeout(() => {
			resolve({
				pageNumber, pageSize, pageCount: 10, itemCount: 95,
				data: new Array(pageNumber === 10 ? 5 : 10).fill(1).map(() => {
					const item = {...baseItem};
					const random = Math.random();
					item.insuredName = random >= 0.5 ? 'John Doe' : 'Jane Doe';
					item.gender = random >= 0.5 ? 'M' : 'F';
					return item;
				})
			});
		}, 300);
	});
};
/**
 * this is a mock function
 */
export const askInsuredListByKeywords = async (_keywords: string, pageNumber: number = 1, pageSize: number = 10): Promise<Page<ResultItem>> => {
	return await askMockData(pageNumber, pageSize);
};
export const askInsuredList = async (_criteria: Omit<Criteria, 'keywords'>, pageNumber: number = 1, pageSize: number = 10): Promise<Page<ResultItem>> => {
	return await askMockData(pageNumber, pageSize);
};

export const saveRegistrationData = async (data: Omit<ResultItem, 'relatedPolicyNos' | 'ongoingClaimNos'>): Promise<string> => {
	const key = VUtils.generateUniqueId();
	saveToSession(key, data, 60);
	return key;
};