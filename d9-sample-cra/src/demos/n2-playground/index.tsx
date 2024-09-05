import {BridgeEventBusProvider, ContainerDef, ExternalDefIndicator, ExternalDefs, StandaloneRoot} from '@rainbow-d9/n1';
import {DropdownOption, GlobalRoot} from '@rainbow-d9/n2';
import {ExternalDefsTypes, PlaygroundDecorator, PlaygroundDef} from '@rainbow-d9/n5';
import {vscodeDark, vscodeLight} from '@uiw/codemirror-theme-vscode';
import {ThemeSwitcher} from '../theme-switcher';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

export const N2Playground = () => {
	const def = useDemoMarkdown(DemoContent);

	const DropdownOptionsWidgets = ['Dropdown', 'MultiDropdown', 'Checkboxes', 'Checks', 'Radios'];
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
			mockData: async () => DemoData,
			externalDefsTypes: {
				codes: DropdownOptionsWidgets.map($wt => ({
					$wt, properties: ['options'], label: 'Retrieve available options from remote.'
				})),
				staticCodes: {
					gender: DropdownOptionsWidgets.map($wt => ({
						$wt, properties: ['options'], label: 'Gender options.'
					}))
				}
			} as ExternalDefsTypes,
			decorator: {
				theme: (theme?: string) => {
					return theme === 'dark' ? vscodeDark : vscodeLight;
				}
			} as PlaygroundDecorator
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
  - leads: $icons.angleLeft; $icons.angleRight
  - text: Test Button
  - click:
    \`\`\`
    options.global.alert.show('Hello World');
    \`\`\`

## Section::X

- Input::Test Input::testInputX
- Dropdown::Test Dropdown::testDropdownX
  - options: @ext.codes
- Button::
  - $fc
  - $pos: r:2
  - leads: $icons.angleLeft; $icons.angleRight
  - text: Test Button
  - click:
    \`\`\`
    options.global.alert.show('Hello World');
    \`\`\`

## Section::Y

- Input::Test Input::testInputY
- Dropdown::Test Dropdown::testDropdownY
  - options: @ext.codes
- Button::
  - $fc
  - $pos: r:2
  - leads: $icons.angleLeft; $icons.angleRight
  - text: Test Button
  - click:
    \`\`\`
    options.global.alert.show('Hello World');
    \`\`\`

`;
	// manual set as external def indicator to make it will be retrieved from given external defs in every refresh.
	// @ts-ignore
	(((def as ContainerDef).$nodes[0] as ContainerDef).$nodes[0] as PlaygroundDef).mockData = new ExternalDefIndicator('playground.mockData');

	return <GlobalRoot>
		<BridgeEventBusProvider>
			<ThemeSwitcher/>
			<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
		</BridgeEventBusProvider>
	</GlobalRoot>;
};

export const PlaygroundData = DemoData;
export const PlaygroundMarkdown = DemoContent;
