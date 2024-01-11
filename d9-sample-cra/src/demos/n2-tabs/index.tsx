import {BaseModel, MUtils, PropValue, StandaloneRoot, VUtils} from '@rainbow-d9/n1';
import {
	Alert,
	Dialog,
	GlobalEventBusProvider,
	RemoteRequest,
	TabDefDataRetrieverOptions,
	YesNoDialog
} from '@rainbow-d9/n2';
import React from 'react';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
// @ts-ignore
import DemoContent from './demo.md';

export const N2Tabs = () => {
	const def = useDemoMarkdown(DemoContent);
	const externalDefs = {
		tabs: {
			tab4: {
				def: (marker?: string) => {
					return {
						$wt: 'Section',
						$nodes: [{
							$wt: 'Input.FC',
							label: 'Hello Tab4',
							$pp: 'tab4Input'
						}]
					};
				}
			},
			tab5: {
				data: async (options: TabDefDataRetrieverOptions<BaseModel, PropValue>) => {
					const {root, model, absolutePath} = options;
					if (model == null) {
						MUtils.setValue(root, absolutePath, {
							tab5Title: 'Tab5 Title',
							tab5Input: 'Hello Tab5'
						});
						console.log('set tab5 value');
					}
					console.log(root, model, absolutePath);
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

export const N2TabsData = DemoData;
export const N2TabsMarkdown = DemoContent;
