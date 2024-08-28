import {StandaloneRoot} from '@rainbow-d9/n1';
import {$d9n2, GlobalRoot} from '@rainbow-d9/n2';
import {PlaygroundModuleAssistant} from '@rainbow-d9/n6';
import {useDemoMarkdown} from '../use-demo-markdown';
import {yaml as DemoYaml} from './demo-step.yaml';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

$d9n2.intl.labels['en-US'] = {
	...($d9n2.intl.labels['en-US'] ?? {}),
	o23: {
		variable: {
			enabled: 'Enabled'
		}
	}
};
DemoData.yaml = DemoYaml;

export const O23Playground = () => {
	const def = useDemoMarkdown(DemoContent);
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
		}) as PlaygroundModuleAssistant['askRefSteps']
	};
	return <GlobalRoot>
		<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
	</GlobalRoot>;
};

export const O23PlaygroundData = DemoData;
export const O23PlaygroundMarkdown = DemoContent;
