import {BaseModelOptions} from '@projectstorm/react-canvas-core';
import {DefaultLinkModel, LinkModel, PortModel, PortModelAlignment} from '@projectstorm/react-diagrams';
import {Undefinable} from '@rainbow-d9/n1';

export interface LinkExtras {
	index?: number;
}

export abstract class OutgoingPortModel extends PortModel {
	protected constructor(type: string, name: string, alignment: PortModelAlignment) {
		super({type, name, alignment});
	}

	/**
	 * source is this port
	 */
	public createLinkModel(extras?: LinkExtras): LinkModel {
		return this.createOutgoingLinkModel(extras);
	}

	public createOutgoingLinkModel(extras?: LinkExtras): LinkModel {
		const link = this.createDefaultLinkModel(extras);
		link.setSourcePort(this);
		return link;
	}

	protected toLinkModelOptions(extras?: LinkExtras): Undefinable<BaseModelOptions> {
		return extras == null ? (void 0) : {extras};
	}

	protected createDefaultLinkModel(extras?: LinkExtras): LinkModel {
		return new DefaultLinkModel(this.toLinkModelOptions(extras));
	}
}
