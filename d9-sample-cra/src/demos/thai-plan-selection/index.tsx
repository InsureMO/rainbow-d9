import {StandaloneRoot, VUtils} from '@rainbow-d9/n1';
import {Alert, Dialog, GlobalEventBusProvider, RemoteRequest, YesNoDialog} from '@rainbow-d9/n2';
import {PlanDefs} from '@rainbow-d9/thai-plan-selection';
import React from 'react';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
// @ts-ignore
import DemoContent from './demo.md';

export const ThaiPlanSelection = () => {
	const def = useDemoMarkdown(DemoContent);

	const externalDefs = {
		defs: async (): Promise<PlanDefs> => {
			return [
				{code: 'standard-1', name: 'Standard Plan #1', elements: []},
				{code: 'standard-2', name: 'Standard Plan #2', elements: []}
			];
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

export const ThaiPlanSelectionData = DemoData;
export const ThaiPlanSelectionMarkdown = DemoContent;
