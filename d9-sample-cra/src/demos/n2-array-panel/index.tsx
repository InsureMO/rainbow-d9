import {StandaloneRoot, VUtils} from '@rainbow-d9/n1';
import {Alert, Dialog, GlobalEventBusProvider, RemoteRequest, YesNoDialog} from '@rainbow-d9/n2';
import React from 'react';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
// @ts-ignore
import DemoContent from './demo.md';

export const N2ArrayPanel = () => {
	const def = useDemoMarkdown(DemoContent);

	return <GlobalEventBusProvider>
		<Alert/>
		<Dialog/>
		<YesNoDialog/>
		<RemoteRequest clearAccount={VUtils.noop} on401={VUtils.noop} on403={VUtils.noop}/>
		<CustomEventHandler/>
		<N2DemoDialogHandler/>
		{/** @ts-ignore */}
		<StandaloneRoot {...def} $root={DemoData}/>
	</GlobalEventBusProvider>;
};

export const N2ArrayPanelData = DemoData;
export const N2ArrayPanelMarkdown = DemoContent;
