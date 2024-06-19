import {PipelineStepDef, StandardPipelineStepRegisterKey} from './definition';

export const DEFAULTS = {
	createDefaultStep: (): PipelineStepDef => ({name: '', use: StandardPipelineStepRegisterKey.SNIPPET})
};

export const setDefaults = (defaults: {
	createDefaultStep?: () => PipelineStepDef;
}) => {
	DEFAULTS.createDefaultStep = defaults.createDefaultStep ?? DEFAULTS.createDefaultStep;
};
