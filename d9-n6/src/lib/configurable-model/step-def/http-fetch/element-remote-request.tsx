import {ConfigurableElement} from '../../../edit-dialog';
import {Labels} from '../../../labels';
import {elementBodyUsed} from './element-body-used';
import {elementGenerateBody} from './element-generate-body';
import {elementGenerateHeaders} from './element-generate-headers';
import {elementOmittedTransparentHeaderNames} from './element-omitted-transparent-header-names';
import {elementTransparentHeaderNames} from './element-transparent-header-names';

export const elementRemoteRequest: ConfigurableElement = {
	code: 'remote-request', label: Labels.StepHttpRemoteRequest, anchor: 'remote-request',
	children: [
		elementTransparentHeaderNames, elementOmittedTransparentHeaderNames,
		elementGenerateHeaders, elementBodyUsed, elementGenerateBody
	],
	group: true
};
