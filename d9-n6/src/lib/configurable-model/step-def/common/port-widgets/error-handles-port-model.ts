import {OutgoingPortModel} from './outgoing-port-model';

export abstract class ErrorHandlesPortModel extends OutgoingPortModel {
	protected constructor(type: string, name: string) {
		super(type, name);
	}
}
