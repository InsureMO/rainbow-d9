import {useForceUpdate} from '@rainbow-d9/n1';
import {PipelineStepDiagramDef} from '../../../../definition';
import {StepNodeModel} from '../../../../diagram';

export interface UseSubNodesFoldOptions {
	model: StepNodeModel;
	property: '$foldSubSteps' | '$foldCatchable' | '$foldUncatchable' | '$foldExposed' | '$foldAny';
}

export const useSubNodesFold = (options: UseSubNodesFoldOptions) => {
	const {model, property} = options;

	const forceUpdate = useForceUpdate();
	const def = model.step as PipelineStepDiagramDef;

	const onClicked = () => {
		if (def.$diagram == null) {
			def.$diagram = {[property]: def.$diagram?.[property] ?? false};
		}
		def.$diagram[property] = !def.$diagram[property];
		forceUpdate();
		// notify content change, leads diagram repaint
		model.handlers.onChange();
	};

	return {
		fold: def.$diagram?.[property] ?? false,
		switchFold: onClicked
	};
};