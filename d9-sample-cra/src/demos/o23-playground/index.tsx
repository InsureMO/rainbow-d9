import {
	BridgeEventBusProvider,
	BridgeEventListener,
	BridgeToRootEventTypes,
	StandaloneRoot,
	useBridgeEventBus
} from '@rainbow-d9/n1';
import {$d9n2, GlobalRoot} from '@rainbow-d9/n2';
import {PlaygroundDecorator} from '@rainbow-d9/n5';
import {PlaygroundModuleAssistant} from '@rainbow-d9/n6';
import {vscodeDark, vscodeLight} from '@uiw/codemirror-theme-vscode';
import {Fragment, MutableRefObject, useEffect, useRef} from 'react';
import {ThemeSwitcher} from '../theme-switcher';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';
import {yaml as DemoYaml} from './demo.yaml';

$d9n2.intl.labels['en-US'] = {
	...($d9n2.intl.labels['en-US'] ?? {}),
	o23: {
		variable: {
			enabled: 'Enabled'
		}
	}
};
DemoData.yaml = DemoYaml;

const ThemeStateListener = (props: { theme: MutableRefObject<string> }) => {
	const {theme} = props;

	const {on, off} = useBridgeEventBus();
	useEffect(() => {
		const onThemeChanged: BridgeEventListener<string> = (args) => {
			theme.current = args;
		};
		on(BridgeToRootEventTypes.THEME_CHANGED, onThemeChanged);
		return () => {
			off(BridgeToRootEventTypes.THEME_CHANGED, onThemeChanged);
		};
	}, [on, off]);
	return <Fragment/>;
};

export const O23Playground = () => {
	const def = useDemoMarkdown(DemoContent);
	const themeRef = useRef<string>('light');
	const externalDefs = {
		httpSystems: (() => {
			return [
				{
					code: 'CodeService', name: 'Codes Service', endpoints: [
						{code: 'askProductCodes', name: 'Ask Product Codes'}
					]
				},
				{
					code: 'CacheService', name: 'Cache Service', endpoints: [
						{code: 'askCache', name: 'Ask Cache'}
					]
				}
			];
		}) as PlaygroundModuleAssistant['askSystemsForHttp'],
		typeOrmDatasources: (() => {
			return [
				{code: 'db-auth', name: 'Account DB'},
				{code: 'db-data', name: 'Business Data DB'}
			];
		}) as PlaygroundModuleAssistant['askTypeOrmDatasources'],
		refPipelines: (() => {
			return [
				{code: 'auth-by-token', name: 'Authenticate by token'},
				{code: 'auth-by-account', name: 'Authenticate by account'}
			];
		}) as PlaygroundModuleAssistant['askRefPipelines'],
		refSteps: (() => {
			return [
				{code: 'ask-roles', name: 'Ask user roles'},
				{code: 'ask-permissions', name: 'Ask user permissions'}
			];
		}) as PlaygroundModuleAssistant['askRefSteps'],
		decorator: {
			theme: (theme?: string) => {
				return (theme || themeRef.current) === 'dark' ? vscodeDark : vscodeLight;
			}
		} as PlaygroundDecorator
	};
	return <GlobalRoot>
		<BridgeEventBusProvider>
			<ThemeStateListener theme={themeRef}/>
			<ThemeSwitcher/>
			<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
		</BridgeEventBusProvider>
	</GlobalRoot>;
};

export const O23PlaygroundData = DemoData;
export const O23PlaygroundMarkdown = DemoContent;
