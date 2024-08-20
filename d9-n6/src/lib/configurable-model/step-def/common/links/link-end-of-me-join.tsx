import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {DefaultLinkModel} from '@projectstorm/react-diagrams';
import {PlaygroundCssVars} from '../../../../widgets';
import {StandardLinkFactory} from './standard-link';

export class EndOfMeJoinLinkModel extends DefaultLinkModel {
	public static readonly TYPE = 'end-of-me-join-link';

	public constructor() {
		super({type: EndOfMeJoinLinkModel.TYPE});
	}

	public getSVGPath(): string {
		if (this.points.length == 2) {
			const sourceX = this.getFirstPoint().getX();
			const sourceY = this.getFirstPoint().getY();
			const targetX = this.getLastPoint().getX();
			const targetY = this.getLastPoint().getY();
			return `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
		}
	}
}

export class EndOfMeJoinLinkFactory extends StandardLinkFactory<EndOfMeJoinLinkModel> {
	public constructor() {
		super(EndOfMeJoinLinkModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): EndOfMeJoinLinkModel {
		throw new Error('DO NOT use EndOfMeJoinLinkFactory#generateModel.');
	}

	protected getLinkDataW(): string {
		return 'o23-playground-end-of-me-join-link';
	}

	protected getLinkSegmentDasharray(): string {
		return PlaygroundCssVars.LINK_END_OF_ME_JOIN_DASHARRAY;
	}

	protected getLinkSegmentSelectedDasharray(): string {
		return PlaygroundCssVars.LINK_END_OF_ME_JOIN_SELECTED_DASHARRAY;
	}
}
