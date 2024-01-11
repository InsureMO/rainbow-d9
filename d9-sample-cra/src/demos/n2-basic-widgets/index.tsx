import {StandaloneRoot, VUtils} from '@rainbow-d9/n1';
import {Alert, Dialog, GlobalEventBusProvider, RemoteRequest, YesNoDialog} from '@rainbow-d9/n2';
import React, {KeyboardEvent} from 'react';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
// @ts-ignore
import DemoContent from './demo.md';

export const N2BasicWidgets = () => {
	const def = useDemoMarkdown(DemoContent);
	const externalDefs = {
		keydown: {
			numeric: (event: KeyboardEvent<HTMLInputElement>) => {
				console.log(`Key event[key=${event.key}, code=${event.code}] capture.`);
				if (!['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(event.key)) {
					event.preventDefault();
					return false;
				}
			}
		}
	};

	return <GlobalEventBusProvider>
		<Alert/>
		<Dialog/>
		<YesNoDialog/>
		<RemoteRequest clearAccount={VUtils.noop} on401={VUtils.noop} on403={VUtils.noop}/>
		<CustomEventHandler/>
		<N2DemoDialogHandler/>
		{/** @ts-ignore */}
		<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
	</GlobalEventBusProvider>;
};

export const N2BasicWidgetsData = DemoData;
export const N2BasicWidgetsMarkdown = DemoContent;
