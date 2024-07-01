import {DefaultLinkModel, LinkModel, PortModel, PortModelAlignment} from '@projectstorm/react-diagrams';

export abstract class OutgoingPortModel extends PortModel {
	protected constructor(type: string, name: string, alignment: PortModelAlignment) {
		super({type, name, alignment});
	}

	/**
	 * source is this port
	 */
	public createLinkModel(): LinkModel {
		return this.createOutgoingLinkModel();
	}

	public createOutgoingLinkModel(): LinkModel {
		const link = this.createDefaultLinkModel();
		link.setSourcePort(this);
		return link;
	}

	protected createDefaultLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}
