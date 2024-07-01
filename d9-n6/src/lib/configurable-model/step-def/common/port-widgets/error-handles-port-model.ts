import {PortModelAlignment} from '@projectstorm/react-diagrams';
import {OutgoingPortModel} from '../../../../diagram';

export abstract class ErrorHandlesPortModel extends OutgoingPortModel {
	protected constructor(type: string, name: string, alignment: PortModelAlignment) {
		super(type, name, alignment);
	}
}
