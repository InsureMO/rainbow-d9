import {ConfigurableElement} from '../../../edit-dialog';
import {Labels} from '../../../labels';
import {elementReadResponse} from './element-read-response';
import {elementResponseErrorHandles} from './element-response-error-handles';

export const elementRemoteResponse: ConfigurableElement = {
	code: 'remote-response', label: Labels.StepHttpRemoteResponse, anchor: 'remote-response',
	children: [elementReadResponse, elementResponseErrorHandles],
	group: true
};
