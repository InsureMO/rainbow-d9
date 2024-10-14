import {VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {DC} from '../../standard-widgets';

const doAskSubmissionChannel = async (channelId: string): Promise<{ channelId: string, name: string }> => {
	return {channelId, name: 'Mock Submission Channel'};
};

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
			} = await DC.with(globalHandlers).use(async () => await doAskSubmissionChannel(submissionChannelId!)).ask();
			submissionChannelOptions.push({label: name, value: channelId});
		} catch (e) {
			console.groupCollapsed(`Failed to get submission channel by id[${submissionChannelId}].`);
			console.error(e);
		}
	}
	return submissionChannelOptions;
};

const doAskUserAndDepartment = async (userIds?: Array<string>): Promise<Array<{
	userId: string,
	name: string,
	department: string
}>> => {
	return (userIds ?? []).map(userId => ({userId, name: userId, department: 'POS'}));
};

export const askUserAndDepartmentOptions = async (
	globalHandlers: GlobalHandlers, userIds: Array<string>
): Promise<{ users: DropdownOptions, departments: DropdownOptions }> => {
	const userOptions: DropdownOptions = [{value: 'system', label: 'System'}];
	const departmentOptions: DropdownOptions = [{value: 'system', label: 'System'}];
	try {
		const users = await DC.with(globalHandlers).use(async () => await doAskUserAndDepartment(userIds)).ask();
		userOptions.push(...users.map(({userId, name}) => ({label: name, value: userId})));
		departmentOptions.push(...users.map(({userId, department}) => ({label: department, value: userId})));
	} catch (e) {
		console.groupCollapsed(`Failed to get users by id[${userIds}].`);
		console.error(e);
	}
	return {users: userOptions, departments: departmentOptions};
};
