import {ConfigurableElement} from '../../../edit-dialog';
import {Labels} from '../../../labels';
import {elementEndpoint} from './element-endpoint';
import {elementSystem} from './element-system';

export const elementRemote: ConfigurableElement = {
	code: 'remote', label: Labels.StepHttpRemote, anchor: 'remote',
	children: [elementSystem, elementEndpoint],
	group: true
};
