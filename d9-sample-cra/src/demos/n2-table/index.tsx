import {
	BridgeEventBusProvider,
	BridgeToRootEventTypes,
	RootEventToBridgeUndercover,
	StandaloneRoot,
	useBridgeEventBus,
	ValueChangedNotification,
	VUtils
} from '@rainbow-d9/n1';
import {Alert, Dialog, GlobalEventBusProvider, PaginationData, RemoteRequest, YesNoDialog} from '@rainbow-d9/n2';
import {nanoid} from 'nanoid';
import React from 'react';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
// @ts-ignore
import DemoContent from './demo.md';

// prepare data
// @ts-ignore
DemoData.table2 = DemoData.nestedTables.filter((_, index) => index < 5);
// @ts-ignore
DemoData.page2 = JSON.parse(JSON.stringify(DemoData.page));

const InternalN2Table = () => {
	const def = useDemoMarkdown(DemoContent);
	const {fire} = useBridgeEventBus();

	const externalDefs = {
		table2: {
			onPageChanged: async (options: { newValue: PaginationData }) => {
				const {newValue: {pageNumber, pageSize}} = options;
				const startIndex = (pageNumber - 1) * pageSize;
				const endIndex = startIndex + pageSize - 1;
				// @ts-ignore
				DemoData.table2 = DemoData.nestedTables.filter((_, index) => index >= startIndex && index <= endIndex);
				// console.log(DemoData.table2);
			}
		},
		table3: {
			addRow: () => {
				const carrier = DemoData.sectionForTable3 as { table3: Array<any> };
				if (carrier.table3 == null) {
					carrier.table3 = [{columnA: nanoid()}];
				} else {
					carrier.table3.push({columnA: nanoid()});
				}
				fire<ValueChangedNotification>(BridgeToRootEventTypes.NOTIFY_VALUE_CHANGED, {
					absolutePath: '/sectionForTable3.table3', from: carrier.table3, to: carrier.table3
				});
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
		<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}>
			{/** create root event bridge */}
			<RootEventToBridgeUndercover/>
		</StandaloneRoot>
	</GlobalEventBusProvider>;
};

export const N2Table = () => {
	// wrap all into bridge event bus
	return <BridgeEventBusProvider>
		<InternalN2Table/>
	</BridgeEventBusProvider>;
};

export const N2TableData = DemoData;
export const N2TableMarkdown = DemoContent;