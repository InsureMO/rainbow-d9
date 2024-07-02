import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {PlaygroundCssVars} from '../../../../widgets';
import {StandardLinkFactory} from './standard-link';
import {ToSubStepsLinkModel} from './to-sub-steps-link';

export class ErrorHandlesLinkModel extends ToSubStepsLinkModel {
	public static readonly TYPE = 'error-handles-link';

	public constructor() {
		super(ErrorHandlesLinkModel.TYPE, {selectedColor: PlaygroundCssVars.LINK_ERROR_HANDLES_SELECTED_COLOR});
		this.setColor(PlaygroundCssVars.LINK_ERROR_HANDLES_COLOR);
	}
}

export class ErrorHandlesLinkFactory extends StandardLinkFactory<ErrorHandlesLinkModel> {
	public constructor() {
		super(ErrorHandlesLinkModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): ErrorHandlesLinkModel {
		return new ErrorHandlesLinkModel();
	}
}
