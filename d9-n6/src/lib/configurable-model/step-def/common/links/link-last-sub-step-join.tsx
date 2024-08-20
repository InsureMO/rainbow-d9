import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {DefaultLinkModel} from '@projectstorm/react-diagrams';
import {DEFAULTS} from '../../../../constants';
import {PreviousStepPortModel} from '../../../../diagram';
import {PlaygroundCssVars} from '../../../../widgets';
import {FirstSubStepPortModel} from '../port-widgets';
import {StandardLinkFactory} from './standard-link';

export class LastSubStepJoinLinkModel extends DefaultLinkModel {
	public static readonly TYPE = 'last-sub-step-join-link';

	public constructor() {
		super({type: LastSubStepJoinLinkModel.TYPE});
	}

	public getSVGPath(): string {
		if (this.points.length == 2) {
			const sourceX = this.getFirstPoint().getX();
			const sourceY = this.getFirstPoint().getY();
			const targetX = this.getLastPoint().getX();
			const targetY = this.getLastPoint().getY();
			const radius = DEFAULTS.diagram.linkArcRadius;
			const {index, count} = this.getJoinIndex();
			if (index === count - 1) {
				// last one
				return [
					`M ${sourceX} ${sourceY}`,
					`L ${sourceX} ${targetY - radius}`,
					`A ${radius} ${radius} 0 0 1 ${sourceX - radius} ${targetY}`,
					`L ${targetX} ${targetY}`
				].join(' ');
			} else {
				const sinkingOffset = this.getSinkingOffset();
				const gutterSize = this.getGutterSize();
				const {firstX, firstY, secondX} = this.getTargetNodePositionBase();
				/********************************/
				//    ┌─────┐      ┌─────┐
				//    │     │      │     │
				//    └─────┘      └─────┘
				//       │            │
				//       │ ╭──────────╯
				//       │ │
				//       │ │
				//       │ ╰────╮
				//    ┌─────┐   │
				//    │     │───╯
				//    └─────┘
				/********************************/
				return [
					`M ${sourceX} ${sourceY}`,
					`L ${sourceX} ${sourceY + sinkingOffset - radius}`,
					`A ${radius} ${radius} 0 0 1 ${sourceX - radius} ${sourceY + sinkingOffset}`,
					`L ${firstX + gutterSize * (index + 1) + radius} ${sourceY + sinkingOffset}`,
					`A ${radius} ${radius} 0 0 0 ${firstX + gutterSize * (index + 1)} ${sourceY + sinkingOffset + radius}`,
					`L ${firstX + gutterSize * (index + 1)} ${firstY - gutterSize * (index + 1) - radius}`,
					`A ${radius} ${radius} 0 0 0 ${firstX + gutterSize * (index + 1) + radius} ${firstY - gutterSize * (index + 1)}`,
					`L ${secondX + gutterSize * (index + 1) - radius} ${firstY - gutterSize * (index + 1)}`,
					`A ${radius} ${radius} 0 0 1 ${secondX + gutterSize * (index + 1)} ${firstY - gutterSize * (index + 1) + radius}`,
					`L ${secondX + gutterSize * (index + 1)} ${targetY - radius}`,
					`A ${radius} ${radius} 0 0 1 ${secondX + gutterSize * (index + 1) - radius} ${targetY}`,
					`L ${targetX} ${targetY}`
				].join(' ');
			}
		}
	}

	/**
	 * starts from 0
	 */
	protected getJoinIndex(): { index: number; count: number } {
		const sourceY = this.getFirstPoint().getY();
		let index = 0;
		const links = Object.values(this.getTargetPort().getLinks());
		links.forEach(link => {
			if (link.getFirstPoint().getY() < sourceY) {
				index++;
			}
		});
		return {index, count: links.length};
	}

	protected getSinkingOffset(): number {
		const node = this.getSourcePort().getNode();
		const nodeBottom = node.getY() + node.height;
		const previousNode = [
			...Object.values(node.getPort(PreviousStepPortModel.NAME)?.getLinks() ?? {}),
			...Object.values(node.getPort(FirstSubStepPortModel.NAME)?.getLinks() ?? {})
		][0].getSourcePort().getNode();
		const previousNodeBottom = previousNode.getY() + previousNode.height;
		if (nodeBottom <= previousNodeBottom) {
			return previousNodeBottom - nodeBottom + DEFAULTS.diagram.linkJoinEndSinkingOffset;
		} else {
			return DEFAULTS.diagram.linkJoinEndSinkingOffset;
		}
	}

	protected getGutterSize(): number {
		return DEFAULTS.diagram.linkJoinEndGutterSize;
	}

	protected getTargetNodePositionBase() {
		const node = this.getTargetPort().getNode();
		const previousPort = node.getPort(PreviousStepPortModel.NAME);
		// x of previous port of target node
		const firstX = Object.values(previousPort.getLinks())[0].getLastPoint().getX();
		// y of target node
		const firstY = node.getY();
		// x of right side of target node
		const secondX = node.getX() + node.width;
		return {firstX, firstY, secondX};
	}
}

export class LastSubStepJoinLinkFactory extends StandardLinkFactory<LastSubStepJoinLinkModel> {
	public constructor() {
		super(LastSubStepJoinLinkModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): LastSubStepJoinLinkModel {
		throw new Error('DO NOT use LastSubStepJoinLinkFactory#generateModel.');
	}

	protected getLinkDataW(): string {
		return 'o23-playground-last-sub-step-join-link';
	}

	protected getLinkSegmentDasharray(): string {
		return PlaygroundCssVars.LINK_LAST_SUB_STEP_JOIN_DASHARRAY;
	}

	protected getLinkSegmentSelectedDasharray(): string {
		return PlaygroundCssVars.LINK_LAST_SUB_STEP_JOIN_SELECTED_DASHARRAY;
	}
}
