import {StandaloneRoot} from '@rainbow-d9/n1';
import {GlobalRoot} from '@rainbow-d9/n2';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

export const O23Playground = () => {
	const def = useDemoMarkdown(DemoContent);

	DemoData.yaml = `code: ApiTest
type: pipeline
route: /api/test
method: get
`;

	return <GlobalRoot>
		<StandaloneRoot {...def} $root={DemoData}/>
	</GlobalRoot>;
};

export const O23PlaygroundData = DemoData;
export const O23PlaygroundMarkdown = DemoContent;
