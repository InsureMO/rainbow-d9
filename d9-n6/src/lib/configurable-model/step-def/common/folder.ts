import {AllInPipelineStepDef, PipelineStepDef, PipelineStepDiagramDef} from '../../../definition';

export const folder = {
	accept: () => true,
	switch: (step: PipelineStepDiagramDef, fold: boolean) => {
		step.$diagram = step.$diagram ?? {};
		step.$diagram.$foldCatchable = fold;
		step.$diagram.$foldUncatchable = fold;
		step.$diagram.$foldExposed = fold;
		step.$diagram.$foldAny = fold;
	},
	askSubStep: (step: PipelineStepDef) => {
		const {errorHandles: {catchable, uncatchable, exposed, any} = {}} = step as AllInPipelineStepDef;
		const subSteps = [catchable, uncatchable, exposed, any]
			.filter(x => x != null && typeof x !== 'string')
			.map(x => x as Array<PipelineStepDef>)
			.flat();
		return subSteps.length === 0 ? (void 0) : subSteps;
	}
};
