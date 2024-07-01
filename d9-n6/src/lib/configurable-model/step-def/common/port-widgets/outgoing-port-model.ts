import {DefaultLinkModel, LinkModel, PortModel, PortModelAlignment} from '@projectstorm/react-diagrams';

export abstract class OutgoingPortModel extends PortModel {
	protected constructor(type: string, name: string) {
		super({type, name, alignment: PortModelAlignment.RIGHT});
	}

	/**
	 * source is this port
	 */
	public createLinkModel(): LinkModel {
		return this.createOutgoingLinkModel();
	}

	public createOutgoingLinkModel(): LinkModel {
		const link = new DefaultLinkModel();
		link.setSourcePort(this);
		return link;
	}
}
