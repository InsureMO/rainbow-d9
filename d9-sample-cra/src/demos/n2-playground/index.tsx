import {StandaloneRoot} from '@rainbow-d9/n1';
import {GlobalRoot} from '@rainbow-d9/n2';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

export const N2Playground = () => {
	const def = useDemoMarkdown(DemoContent);

	return <GlobalRoot>
		<StandaloneRoot {...def} $root={DemoData}/>
	</GlobalRoot>;
};

export const PlaygroundData = DemoData;
export const PlaygroundMarkdown = DemoContent;
