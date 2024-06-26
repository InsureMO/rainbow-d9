import {StepNodeConfigurer} from '../types';
import {SetsStepDefs} from './sets';
import {SnippetStepDefs} from './snippet';

export * from './common';

export * from './snippet';
export * from './sets';

export const AllStepDefs: Array<StepNodeConfigurer> = [
	SnippetStepDefs,
	SetsStepDefs
];
