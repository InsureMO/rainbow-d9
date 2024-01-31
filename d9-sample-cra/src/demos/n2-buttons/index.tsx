import {StandaloneRoot} from '@rainbow-d9/n1';
import {GlobalRoot} from '@rainbow-d9/n2';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

export const N2Buttons = () => {
	const def = useDemoMarkdown(DemoContent);

	return <GlobalRoot>
		<CustomEventHandler/>
		<N2DemoDialogHandler/>
		{/** @ts-ignore */}
		<StandaloneRoot {...def} $root={DemoData}/>
	</GlobalRoot>;
};

export const N2ButtonsData = DemoData;
export const N2ButtonsMarkdown = DemoContent;
