import {DefaultLinkModel} from '@projectstorm/react-diagrams';
import {DefaultLinkModelOptions} from '@projectstorm/react-diagrams-defaults/dist/@types/link/DefaultLinkModel';
import {DEFAULTS} from '../../../../constants';
import {StepNodeModel} from '../../../../diagram';
import {findStepDef} from '../../all-step-defs';
import {StepsPortModel} from '../port-widgets';

export abstract class ToSubStepsLinkModel extends DefaultLinkModel {
	protected constructor(type: string, options?: Pick<DefaultLinkModelOptions, 'selectedColor'>) {
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

	protected computeCenterX(sourceX: number, targetX: number) {
		const sourceNode = this.getSourcePort().getNode() as StepNodeModel;
		const {use} = sourceNode.step;
		const def = findStepDef(use);
		const ports = def.findSubPorts(sourceNode);
		// one port, one link
		const links = ports.map(port => Object.values(port.getLinks())[0]);
		const hasStepsLink = links[0].getSourcePort() instanceof StepsPortModel;
		const minTargetX = links
			.map(link => Math.max(link.getFirstPoint().getX(), link.getLastPoint().getX()))
			.reduce((x1, x2) => Math.min(x1, x2));
		const absoluteCenterX = (minTargetX - Math.min(sourceX, targetX)) / 2;
		// if steps link exists, count minus 1
		const linkCount = links.length - (hasStepsLink ? 1 : 0);
		const linkGutter = this.getGutterSize();
		const centerXStart = absoluteCenterX - linkGutter * (linkCount - 1) / 2;
		// if steps link exists, index minus 1
		const myIndex = hasStepsLink ? Math.max(0, links.indexOf(this) - 1) : links.indexOf(this);
		return Math.min(sourceX, targetX) + centerXStart + (linkCount - myIndex - 1) * linkGutter;
	}

	protected getGutterSize(): number {
		return DEFAULTS.diagram.linkGutterSize;
	}
}
