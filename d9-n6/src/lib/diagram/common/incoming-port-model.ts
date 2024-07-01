import {DefaultLinkModel, LinkModel, PortModel, PortModelAlignment} from '@projectstorm/react-diagrams';

export abstract class IncomingPortModel extends PortModel {
	protected constructor(type: string, name: string, alignment: PortModelAlignment) {
		super({type, name, alignment});
	}

	/**
	 * source is this port
	 */
	public createLinkModel(): LinkModel {
		return this.createIncomingLinkModel();
	}

	public createIncomingLinkModel(): LinkModel {
		const link = this.createDefaultLinkModel();
		link.setTargetPort(this);
		return link;
	}

	protected createDefaultLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}
