import {ContainerDef, ExternalDefIndicator, ExternalDefs, StandaloneRoot} from '@rainbow-d9/n1';
import {DropdownOption, GlobalRoot} from '@rainbow-d9/n2';
import {PlaygroundDef} from '@rainbow-d9/n5';
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
			mockData: async () => {
				return {
					test: 'test 6'
				};
			},
			externalDefsTypes: {
				codes: {$wt: 'Dropdown', properties: ['options'], label: 'Retrieve available options from remote.'},
				staticCodes: {
					gender: {$wt: 'Dropdown', properties: ['options'], label: 'Gender options.'}
				}
			}
		}
	};

	DemoData.markdown = `# Page::Page 2

- Input::Test Input::testInput
  - disabled
- Dropdown::Test Dropdown::testDropdown
  - options: @ext.codes
- Button::
  - $fc
  - $pos: r:2
  - text: Test Button
  - click:
    \`\`\`
    options.global.alert.show('Hello World');
    \`\`\`

## Section1::
`;
	// manual set as external def indicator to make it will be retrieved from given external defs in every refresh.
	// @ts-ignore
	(((def as ContainerDef).$nodes[0] as ContainerDef).$nodes[0] as PlaygroundDef).mockData = new ExternalDefIndicator('playground.mockData');

	return <GlobalRoot>
		<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
	</GlobalRoot>;
};

export const PlaygroundData = DemoData;
export const PlaygroundMarkdown = DemoContent;
