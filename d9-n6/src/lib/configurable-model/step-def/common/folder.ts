import {AllInPipelineStepDef, PipelineStepDef, PipelineStepDiagramDef} from '../../../definition';
import {StepDefsFolder, SubStepsWithCategory} from '../../../editor';

export const folder: StepDefsFolder = {
	accept: (): boolean => true,
	switch: (step: PipelineStepDiagramDef, fold: boolean) => {
		step.$diagram = step.$diagram ?? {};
		step.$diagram.$foldCatchable = fold;
		step.$diagram.$foldUncatchable = fold;
		step.$diagram.$foldExposed = fold;
		step.$diagram.$foldAny = fold;
	},
	askSubSteps: (step: PipelineStepDef): Array<PipelineStepDef> => {
		const {errorHandles: {catchable, uncatchable, exposed, any} = {}} = step as AllInPipelineStepDef;
		const subSteps = [catchable, uncatchable, exposed, any]
			.filter(x => x != null && typeof x !== 'string')
			.map(x => x as Array<PipelineStepDef>)
			.flat();
		return subSteps.length === 0 ? (void 0) : subSteps;
	},
	askSubStepsWithCategory: (step: PipelineStepDef): SubStepsWithCategory => {
		const {errorHandles: {catchable, uncatchable, exposed, any} = {}} = step as AllInPipelineStepDef;
		const found = {
			catchable: (catchable != null && typeof catchable !== 'string') ? catchable : [],
			uncatchable: (uncatchable != null && typeof uncatchable !== 'string') ? uncatchable : [],
			exposed: (exposed != null && typeof exposed !== 'string') ? exposed : [],
			any: (any != null && typeof any !== 'string') ? any : []
		};
		Object.keys(found).forEach(key => {
			if (found[key].length === 0) {
				delete found[key];
			}
		});

		return Object.keys(found).length === 0 ? (void 0) : found;
	}
};
