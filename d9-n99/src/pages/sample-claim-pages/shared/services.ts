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

const doAskUser = async (userIds?: Array<string>): Promise<Array<{ userId: string, name: string }>> => {
	return (userIds ?? []).map(userId => ({userId, name: `User-${userId}`}));
};

export const askUserOptions = async (globalHandlers: GlobalHandlers, userIds: Array<string>): Promise<DropdownOptions> => {
	const userOptions: DropdownOptions = [{value: 'system', label: 'System'}];
	try {
		const users = await DC.with(globalHandlers).use(async () => await doAskUser(userIds)).ask();
		userOptions.push(...users.map(({userId, name}) => ({label: name, value: userId})));
	} catch (e) {
		console.groupCollapsed(`Failed to get users by id[${userIds}].`);
		console.error(e);
	}
	return userOptions;
};