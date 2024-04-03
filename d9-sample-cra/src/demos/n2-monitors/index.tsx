import {
	BridgeEventBusProvider,
	BridgeToRootEventTypes,
	StandaloneRoot,
	useBridgeEventBus,
	VUtils
} from '@rainbow-d9/n1';
import {GlobalRoot, UnwrappedButton, UnwrappedCaption} from '@rainbow-d9/n2';
import {Fragment, useEffect, useState} from 'react';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

const ALabel = () => {
	const {on, off} = useBridgeEventBus();
	const [changes, setChanges] = useState<Array<{ index: number; message: string }>>([]);
	useEffect(() => {
		const onValueChanged = (args: any) => {
			setChanges(changes => {
				const {absolutePath, from, to} = args;
				const updated = [
					{
						index: (changes[0]?.index ?? 0) + 1,
						message: `Value changed at [${absolutePath}] from [${from}] to [${to}].`
					},
					...changes];
				updated.length = Math.min(5, updated.length);
				return updated;
			});
		};

		on(BridgeToRootEventTypes.LISTEN_VALUE_CHANGED, onValueChanged);
		return () => {
			off(BridgeToRootEventTypes.LISTEN_VALUE_CHANGED, onValueChanged);
		};
	}, [on, off]);
	// @ts-ignore
	return <UnwrappedCaption style={{flexDirection: 'column', alignItems: 'start', margin: '16px 0', height: 'unset'}}>
		{changes.map(change => {
			return <Fragment key={change.index}>
				<span style={{lineHeight: '20px'}}>{`${change.index}. ${change.message}`}</span>
			</Fragment>;
		})}
	</UnwrappedCaption>;
};
const AButton = (props: { data: typeof DemoData }) => {
	const {data} = props;

	const {fire} = useBridgeEventBus();

	const onClicked = () => {
		const oldValue = data.a;
		if (VUtils.isNotEmpty(oldValue)) {
			data.a = '';
			fire(BridgeToRootEventTypes.NOTIFY_VALUE_CHANGED, {
				absolutePath: '/a', from: oldValue, to: data.a
			});
		}
	};
	// @ts-ignore
	return <UnwrappedButton onClick={onClicked}>Clear A</UnwrappedButton>;
};
export const N2Monitors = () => {
	const def = useDemoMarkdown(DemoContent);

	return <BridgeEventBusProvider>
		<GlobalRoot>
			<CustomEventHandler/>
			<N2DemoDialogHandler/>
			<StandaloneRoot {...def} $root={DemoData}/>
		</GlobalRoot>
		<ALabel/>
		<AButton data={DemoData}/>
	</BridgeEventBusProvider>;
};

export const N2MonitorsData = DemoData;
export const N2MonitorsMarkdown = DemoContent;
