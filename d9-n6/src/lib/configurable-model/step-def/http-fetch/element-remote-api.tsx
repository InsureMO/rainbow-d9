import {ConfigurableElement} from '../../../edit-dialog';
import {Labels} from '../../../labels';
import {elementDecorateUrl} from './element-decorate-url';
import {elementEndpoint} from './element-endpoint';
import {elementMethod} from './element-method';
import {elementSystem} from './element-system';
import {elementTimeout} from './element-timeout';

export const elementRemoteApi: ConfigurableElement = {
	code: 'remote-api', label: Labels.StepHttpRemoteApi, anchor: 'remote-api',
	children: [elementSystem, elementEndpoint, elementDecorateUrl, elementMethod, elementTimeout],
	group: true
};
