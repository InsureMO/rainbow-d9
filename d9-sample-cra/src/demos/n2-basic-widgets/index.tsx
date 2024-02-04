import {BaseModel, PropValue, StandaloneRoot} from '@rainbow-d9/n1';
import {GlobalEventHandlers, GlobalRoot, ModelCarrier, OptionItems} from '@rainbow-d9/n2';
import {KeyboardEvent} from 'react';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

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
		},
		dropdown2: async (_options: ModelCarrier<BaseModel, PropValue> & GlobalEventHandlers): Promise<OptionItems<string>> => {
			console.log('abc');
			return [
				{value: '1', label: 'Option #1'},
				{value: '2', label: 'Option #2'}
			];
		}
	};

	return <GlobalRoot>
		<CustomEventHandler/>
		<N2DemoDialogHandler/>
		<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
	</GlobalRoot>;
};

export const N2BasicWidgetsData = DemoData;
export const N2BasicWidgetsMarkdown = DemoContent;
