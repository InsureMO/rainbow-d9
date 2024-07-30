import {DefaultLinkModel} from '@projectstorm/react-diagrams';
import {DefaultLinkModelOptions} from '@projectstorm/react-diagrams-defaults';
import {DEFAULTS} from '../../../../constants';
import {StepNodeModel} from '../../../../diagram';
import {findStepDef} from '../../all-step-defs';
import {StepsPortModel} from '../port-widgets';

export type ToSubStepsLinkModelOptions = Partial<Omit<DefaultLinkModelOptions, 'type'>>;

export abstract class ToSubStepsLinkModel extends DefaultLinkModel {
	protected constructor(type: string, options?: ToSubStepsLinkModelOptions) {
		super({type, ...(options ?? {})});
	}

	public getSVGPath(): string {
		if (this.points.length == 2) {
			const sourceX = this.getFirstPoint().getX();
			const sourceY = this.getFirstPoint().getY();
			const targetX = this.getLastPoint().getX();
			const targetY = this.getLastPoint().getY();
			const centerX = this.computeCenterX(sourceX, targetX);
			const centerY = Math.min(sourceY, targetY) + Math.abs((sourceY - targetY) / 2);
			const radius = Math.min(DEFAULTS.diagram.linkArcRadius, Math.abs(sourceY - centerY));
			if (sourceY === targetY) {
				return `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
			} else if (sourceY > targetY) {
				return [
					`M ${sourceX} ${sourceY}`,
					`L ${centerX - radius} ${sourceY}`,
					`A ${radius} ${radius} 0 0 0 ${centerX} ${sourceY - radius}`,
					`L ${centerX} ${targetY + radius}`,
					`A ${radius} ${radius} 0 0 1 ${centerX + radius} ${targetY}`,
					`L ${targetX} ${targetY}`
				].join(' ');
			} else {
				return [
					`M ${sourceX} ${sourceY}`,
					`L ${centerX - radius} ${sourceY}`,
					`A ${radius} ${radius} 0 0 1 ${centerX} ${sourceY + radius}`,
					`L ${centerX} ${targetY - radius}`,
					`A ${radius} ${radius} 0 0 0 ${centerX + radius} ${targetY}`,
					`L ${targetX} ${targetY}`
				].join(' ');
			}
		}
	}

	/**
	 * returns boolean: hasStepsLink, array: ports
	 */
	protected askPorts(node: StepNodeModel) {
		const {use} = node.step;
		const def = findStepDef(use);
		const ports = def.findSubPorts(node);
		// typically, first port links to sub step nodes
		const firstPort = ports[0];
		const linksOfFirstPort = Object.values(firstPort.getLinks());
		if (linksOfFirstPort.length === 0) {
			return {ports, hasStepsLink: false, stepsLinkCount: 0};
		}
		const sourcePort = linksOfFirstPort[0].getSourcePort();
		if (!(sourcePort instanceof StepsPortModel)) {
			// source port of link is not steps port, which means no sub steps
			return {ports, hasStepsLink: false, stepsLinkCount: 0};
		}
		return {ports, hasStepsLink: true, stepsLinkCount: linksOfFirstPort.length};
	}

	protected computeCenterX(sourceX: number, targetX: number) {
		const sourceNode = this.getSourcePort().getNode() as StepNodeModel;
		const {ports, hasStepsLink, stepsLinkCount} = this.askPorts(sourceNode);
		// one port, multiple links
		const links = ports.map(port => Object.values(port.getLinks())).flat();
		// get min target x, since there are multiple links, link to multiple target nodes
		const minTargetX = links
			.map(link => Math.max(link.getFirstPoint().getX(), link.getLastPoint().getX()))
			.reduce((x1, x2) => Math.min(x1, x2));
		// get absolute center x, it is relative to source and target
		const absoluteCenterX = (minTargetX - Math.min(sourceX, targetX)) / 2;
		// get link count which is not to sub step
		const nonStepsLinkCount = links.length - stepsLinkCount;
		// gutter between 2 link lines
		const linkGutter = this.getGutterSize();
		// to avoid link lines overlap, compute the center X start first
		// link to sub steps is not counted in, for example, there are 4 links
		// lines:  |     |  a  |     |, to compute the center X start (X of first line)
		// absoluteCenterX (a) - lineGutter * (4 - 1) / 2
		// center x start is relative to source and target
		const centerXStart = absoluteCenterX - linkGutter * (nonStepsLinkCount - 1) / 2;
		// if steps link exists, index minus steps link count
		// if this is a link to sub step, index is negative, max my index is -1
		let myIndex = hasStepsLink ? (links.indexOf(this) - stepsLinkCount) : links.indexOf(this);
		if (myIndex < 0) {
			if (stepsLinkCount > 1 && nonStepsLinkCount > 0) {
				// if there is more than one sub step links, and also has at least one link not to sub steps
				// make center x move a gutter size righter, as below,
				// links to sub steps: center x start + (4 - (-1) - 1) * lineGutter, right to last line
				myIndex = -1;
			} else {
				// otherwise let center x to be same as the last line
				myIndex = 0;
			}
		}
		// the earliest appearing link corresponds to the line further to the right
		// for example, there are 4 links
		// lines:  |     |  a  |     |, center x start is at first line
		// link 0: center x start + (4 - 0 - 1) * lineGutter, last (4th) line
		// link 1: center x start + (4 - 1 - 1) * lineGutter, third line
		// link 2: center x start + (4 - 2 - 1) * lineGutter, second line
		// link 3: center x start + (4 - 3 - 1) * lineGutter, first line
		return Math.min(sourceX, targetX) + centerXStart + (nonStepsLinkCount - myIndex - 1) * linkGutter;
	}

	protected getGutterSize(): number {
		return DEFAULTS.diagram.linkGutterSize;
	}
}
