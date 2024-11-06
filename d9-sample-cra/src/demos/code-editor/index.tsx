import {StandaloneRoot} from '@rainbow-d9/n1';
import {GlobalRoot} from '@rainbow-d9/n2';
import {CustomEventHandler} from '../custom-event-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

export const CodeEditors = () => {
	const def = useDemoMarkdown(DemoContent);

	const externalDefs = {};

	return <GlobalRoot>
		<CustomEventHandler/>
		<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
	</GlobalRoot>;
};

export const CodeEditorsData = DemoData;
export const CodeEditorsMarkdown = DemoContent;
