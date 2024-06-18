import {ConfigurableElement} from '../../edit-dialog';
import {Labels} from '../../labels';
import {elementExposeFile} from './element-expose-file';
import {elementExposeHeaders} from './element-expose-headers';
import {ANCHOR_TYPE, visibleOnApi} from './helper';

export const elementResponse: ConfigurableElement = {
	code: 'response', label: Labels.ApiResponseLabel, anchor: 'response',
	children: [elementExposeHeaders, elementExposeFile],
	visibleOn: [ANCHOR_TYPE], visible: visibleOnApi, group: true
};
