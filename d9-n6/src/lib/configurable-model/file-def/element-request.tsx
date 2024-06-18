import {ConfigurableElement} from '../../edit-dialog';
import {Labels} from '../../labels';
import {elementBody} from './element-body';
import {elementFiles} from './element-files';
import {elementHeaders} from './element-headers';
import {elementMethod} from './element-method';
import {elementPathParams} from './element-path-params';
import {elementQueryParams} from './element-query-params';
import {ANCHOR_TYPE, visibleOnApi} from './helper';

export const elementRequest: ConfigurableElement = {
	code: 'request', label: Labels.ApiRequestLabel, anchor: 'request',
	children: [
		elementMethod, elementHeaders, elementPathParams, elementQueryParams,
		elementBody, elementFiles
	],
	visibleOn: [ANCHOR_TYPE], visible: visibleOnApi, group: true
};
