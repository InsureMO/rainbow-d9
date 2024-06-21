import {StepNodeConfigurer} from '../types';
import {SnippetStepDefs} from './snippet';

export * from './common';

export * from './snippet';

export const AllStepDefs: Array<StepNodeConfigurer> = [
	SnippetStepDefs
];
