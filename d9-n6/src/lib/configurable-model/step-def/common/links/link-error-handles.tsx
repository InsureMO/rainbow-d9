import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {PlaygroundCssVars} from '../../../../widgets';
import {StandardLinkFactory} from './standard-link';
import {ToSubStepsLinkModel, ToSubStepsLinkModelOptions} from './to-sub-steps-link';

export class ErrorHandlesLinkModel extends ToSubStepsLinkModel {
	public static readonly TYPE = 'error-handles-link';

	public constructor(options?: Omit<ToSubStepsLinkModelOptions, 'selectedColor'>) {
		super(ErrorHandlesLinkModel.TYPE, {selectedColor: PlaygroundCssVars.LINK_ERROR_HANDLES_SELECTED_COLOR, ...(options ?? {})});
		this.setColor(PlaygroundCssVars.LINK_ERROR_HANDLES_COLOR);
	}
}

export class ErrorHandlesLinkFactory extends StandardLinkFactory<ErrorHandlesLinkModel> {
	public constructor() {
		super(ErrorHandlesLinkModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): ErrorHandlesLinkModel {
		throw new Error('DO NOT use ErrorHandlesLinkFactory#generateModel.');
	}

	protected getLinkDataW(): string {
		return 'o23-playground-error-handles-link';
	}

	protected getLinkSegmentDasharray(): string {
		return PlaygroundCssVars.LINK_ERROR_HANDLES_DASHARRAY;
	}

	protected getLinkSegmentSelectedDasharray(): string {
		return PlaygroundCssVars.LINK_ERROR_HANDLES_SELECTED_DASHARRAY;
	}
}
