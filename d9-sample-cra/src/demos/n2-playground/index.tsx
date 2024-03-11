import {ExternalDefs, StandaloneRoot} from '@rainbow-d9/n1';
import {GlobalRoot} from '@rainbow-d9/n2';
import {DropdownOption} from '@rainbow-d9/n2/src';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

export const N2Playground = () => {
	const def = useDemoMarkdown(DemoContent);

	const externalDefs: ExternalDefs = {
		playground: {
			externalDefs: {
				codes: async (): Promise<Array<DropdownOption>> => {
					return [
						{value: '01', label: 'Option 01'},
						{value: '02', label: 'Option 02'}
					];
				},
				staticCodes: {
					gender: [
						{value: 'F', label: 'Female'},
						{value: 'M', label: 'Male'}
					]
				}
			},
			externalDefsTypes: {
				codes: {$wt: 'Dropdown', properties: ['options'], label: 'Retrieve available options from remote.'},
				staticCodes: {
					gender: {$wt: 'Dropdown', properties: ['options'], label: 'Gender options.'}
				}
			}
		}
	};

	return <GlobalRoot>
		<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
	</GlobalRoot>;
};

export const PlaygroundData = DemoData;
export const PlaygroundMarkdown = DemoContent;
