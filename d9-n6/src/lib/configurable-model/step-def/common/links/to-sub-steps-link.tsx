import {DefaultLinkModel} from '@projectstorm/react-diagrams';
import {StepNodeModel} from '../../../../diagram';
import {findStepDef} from '../../all-step-defs';

export abstract class ToSubStepsLinkModel extends DefaultLinkModel {
	protected constructor(type: string) {
		super({type});
	}

	public getSVGPath(): string {
		if (this.points.length == 2) {
			const sourceNode = this.getSourcePort().getNode() as StepNodeModel;
			const {use} = sourceNode.step;
			const def = findStepDef(use);
			const ports = def.findSubPorts(sourceNode);
			// one port, one link
			const links = ports.map(port => Object.values(port.getLinks())[0]);
			const linkCount = links.length;
			const minTargetX = links.map(link => link.getLastPoint().getX()).reduce((x1, x2) => Math.min(x1, x2));
			const sourceX = this.getFirstPoint().getX();
			const sourceY = this.getFirstPoint().getY();
			const targetX = this.getLastPoint().getX();
			const targetY = this.getLastPoint().getY();
			const absoluteCenterX = (minTargetX - sourceX) / 2;
			const linkGutter = 6;
			const centerXStart = linkCount % 2 === 0
				? (absoluteCenterX - linkGutter * linkCount / 2)
				: (absoluteCenterX - linkGutter * Math.floor(linkCount / 2));
			const myIndex = links.indexOf(this);
			const centerX = Math.min(sourceX, targetX) + centerXStart + (linkCount - myIndex - 1) * linkGutter;
			const centerY = Math.min(sourceY, targetY) + Math.abs((sourceY - targetY) / 2);
			const radius = Math.min(8, Math.abs(sourceY - centerY));
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
}
