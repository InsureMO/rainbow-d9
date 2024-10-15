import {VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {mock} from '../../../mock-services';
import {DC} from '../../standard-widgets';

export const Users = {
	David: {name: 'David', userId: '10000', depart: 'POS'},
	John: {name: 'John', userId: '10001', depart: 'POS'},
	Sally: {name: 'Sally', userId: '10002', depart: 'POS'},
	Bill: {name: 'Bill', userId: '20000', depart: 'POS'},
	Alexie: {name: 'Alexie', userId: '20001', depart: 'POS'},
	Chris: {name: 'Chris', userId: '30001', depart: 'POS'}
};

const mockDoAskSubmissionChannel = async (channelId: string): Promise<{ channelId: string, name: string }> => {
	return {channelId, name: 'Mock Submission Channel'};
};
const doAskSubmissionChannel = async (_channelId: string): Promise<{ channelId: string, name: string }> => {
	// TODO ask submission channel
	throw new Error('Not implemented');
};
const askSubmissionChannel = mock(doAskSubmissionChannel).by(mockDoAskSubmissionChannel);
export const askSubmissionChannelOptions = async (
	globalHandlers: GlobalHandlers,
	options?: { manualSubmit: boolean; submissionChannelId?: string }
): Promise<DropdownOptions> => {
	const submissionChannelOptions: DropdownOptions = [];
	const {manualSubmit = false, submissionChannelId} = options ?? {};
	if (!manualSubmit && VUtils.isNotBlank(submissionChannelId)) {
		try {
			const {
				channelId, name
			} = await DC.with(globalHandlers).use(async () => await askSubmissionChannel(submissionChannelId!)).ask();
			submissionChannelOptions.push({label: name, value: channelId});
		} catch (e) {
			console.groupCollapsed(`Failed to get submission channel by id[${submissionChannelId}].`);
			console.error(e);
		}
	}
	return submissionChannelOptions;
};

interface UserAndDepartment {
	userId: string;
	name: string;
	department: string;
}

const mockDoAskUserAndDepartment = async (userIds?: Array<string>): Promise<Array<UserAndDepartment>> => {
	const mockUsers = Object.values(Users).reduce((map, user) => {
		map[user.userId] = user;
		return map;
	}, {} as Record<string, typeof Users['David']>);
	return (userIds ?? []).map(userId => {
		const user = mockUsers[userId];
		if (user == null) {
			return ({userId, name: userId, department: 'POS'});
		}
		return {userId: user.userId, name: user.name, department: user.depart};
	});
};
const doAskUserAndDepartment = async (_userIds?: Array<string>): Promise<Array<UserAndDepartment>> => {
	// TODO ask user and department
	throw new Error('Not implemented');
};
const askUserAndDepartment = mock(doAskUserAndDepartment).by(mockDoAskUserAndDepartment);
export const askUserAndDepartmentOptions = async (
	globalHandlers: GlobalHandlers, userIds: Array<string>
): Promise<{ users: DropdownOptions, departments: DropdownOptions }> => {
	const userOptions: DropdownOptions = [{value: 'system', label: 'System'}];
	const departmentOptions: DropdownOptions = [{value: 'system', label: 'System'}];
	try {
		const users = await DC.with(globalHandlers).use(async () => await askUserAndDepartment(userIds)).ask();
		userOptions.push(...users.map(({userId, name}) => ({label: name, value: userId})));
		departmentOptions.push(...users.map(({userId, department}) => ({label: department, value: userId})));
	} catch (e) {
		console.groupCollapsed(`Failed to get users by id[${userIds}].`);
		console.error(e);
	}
	return {users: userOptions, departments: departmentOptions};
};

interface EscalateHandler {
	userId: string;
	name: string;
}

const mockDoAskEscalateHandlers = async (): Promise<Array<EscalateHandler>> => {
	return [Users.David, Users.John, Users.Sally];
};
const doAskEscalateHandlers = async (): Promise<Array<EscalateHandler>> => {
	// TODO ask escalation handlers
	throw new Error('Not implemented');
};
const askEscalateHandlers = mock(doAskEscalateHandlers).by(mockDoAskEscalateHandlers);
export const askEscalateToOptions = async (globalHandlers: GlobalHandlers): Promise<DropdownOptions> => {
	const handlerOptions: DropdownOptions = [];
	try {
		const handlers = await DC.with(globalHandlers).use(async () => await askEscalateHandlers()).ask();
		handlerOptions.push(...handlers.map(({userId, name}) => ({label: name, value: userId})));
	} catch (e) {
		console.groupCollapsed(`Failed to get escalation handlers.`);
		console.error(e);
	}
	return handlerOptions;
};

const mockDoAskInvestigators = async (): Promise<Array<EscalateHandler>> => {
	return [Users.Alexie, Users.Bill, Users.Sally];
};
const doAskInvestigators = async (): Promise<Array<EscalateHandler>> => {
	// TODO ask escalation handlers
	throw new Error('Not implemented');
};
const askInvestigators = mock(doAskInvestigators).by(mockDoAskInvestigators);
export const askInvestigatorOptions = async (globalHandlers: GlobalHandlers): Promise<DropdownOptions> => {
	const investigatorOptions: DropdownOptions = [];
	try {
		const investigators = await DC.with(globalHandlers).use(async () => await askInvestigators()).ask();
		investigatorOptions.push(...investigators.map(({userId, name}) => ({label: name, value: userId})));
	} catch (e) {
		console.groupCollapsed(`Failed to get investigators.`);
		console.error(e);
	}
	return investigatorOptions;
};