import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {StandardLinkFactory} from './standard-link';
import {ToSubStepsLinkModel} from './to-sub-steps-link';

export class StepsLinkModel extends ToSubStepsLinkModel {
	public static readonly TYPE = 'steps-link';

	public constructor() {
		super(StepsLinkModel.TYPE);
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
}
