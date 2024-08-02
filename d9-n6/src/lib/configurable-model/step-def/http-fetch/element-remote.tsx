import {ConfigurableElement} from '../../../edit-dialog';
import {Labels} from '../../../labels';
import {elementDecorateUrl} from './element-decorate-url';
import {elementEndpoint} from './element-endpoint';
import {elementSystem} from './element-system';

export const elementRemote: ConfigurableElement = {
	code: 'remote', label: Labels.StepHttpRemote, anchor: 'remote',
	children: [elementSystem, elementEndpoint, elementDecorateUrl],
	group: true
};
