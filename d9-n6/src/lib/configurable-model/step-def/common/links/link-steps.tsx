import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {PlaygroundCssVars} from '../../../../widgets';
import {StandardLinkFactory} from './standard-link';
import {ToSubStepsLinkModel, ToSubStepsLinkModelOptions} from './to-sub-steps-link';

export class StepsLinkModel extends ToSubStepsLinkModel {
	public static readonly TYPE = 'steps-link';

	public constructor(options?: ToSubStepsLinkModelOptions) {
		super(StepsLinkModel.TYPE, options);
	}
}

export class StepsLinkFactory extends StandardLinkFactory<StepsLinkModel> {
	public constructor() {
		super(StepsLinkModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): StepsLinkModel {
		return new StepsLinkModel();
	}

	protected getLinkSegmentDasharray(): string {
		return PlaygroundCssVars.LINK_STEPS_DASHARRAY;
	}

	protected getLinkSegmentSelectedDasharray(): string {
		return PlaygroundCssVars.LINK_STEPS_SELECTED_DASHARRAY;
	}
}
