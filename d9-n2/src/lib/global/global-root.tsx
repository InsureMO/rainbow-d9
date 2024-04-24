import {VUtils} from '@rainbow-d9/n1';
import React, {ReactNode} from 'react';
import {Alert} from './alert';
import {Dialog, YesNoDialog} from './dialog';
import {GlobalEventBusProvider} from './global-event-bus';
import {RemoteRequest, RemoteRequestProps} from './remote-request';
import {Tip} from './tip';

export interface GlobalRootProps {
	avoidDefaultAlert?: true;
	avoidDefaultDialog?: true;
	avoidDefaultYesNoDialog?: true;
	avoidDefaultRemoteRequest?: true;
	avoidDefaultTips?: true;
	defaultRemoteRequestProps?: RemoteRequestProps;
	/** children should have a StandaloneRoot */
	children: ReactNode;
}

export const GlobalRoot = (props: GlobalRootProps) => {
	const {
		avoidDefaultAlert = false, avoidDefaultDialog = false, avoidDefaultYesNoDialog = false,
		avoidDefaultRemoteRequest = false, avoidDefaultTips = false,
		defaultRemoteRequestProps: {clearAccount = VUtils.noop, on200, on401 = VUtils.noop, on403 = VUtils.noop} = {},
		children
	} = props;

	return <GlobalEventBusProvider>
		{avoidDefaultAlert ? null : <Alert/>}
		{avoidDefaultDialog ? null : <Dialog/>}
		{avoidDefaultYesNoDialog ? null : <YesNoDialog/>}
		{avoidDefaultTips ? null : <Tip/>}
		{avoidDefaultRemoteRequest
			? null
			: <RemoteRequest clearAccount={clearAccount} on200={on200} on401={on401} on403={on403}/>}
		{children}
	</GlobalEventBusProvider>;
};
