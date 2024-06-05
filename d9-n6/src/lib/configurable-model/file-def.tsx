import {VUtils} from '@rainbow-d9/n1';
import React, {ReactNode} from 'react';
import {FileDef} from '../definition';
import {
	ConfigurableElement,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeMissed,
	ConfigurableModel
} from '../edit-dialog';

export interface FileDefModel extends ConfigurableModel, FileDef {
}

export const visibleOnPipeline = (model: FileDefModel) => model.type === 'pipeline';
export const elementCode: ConfigurableElement = {
	code: 'code', label: 'Code', anchor: 'code',
	badge: (model: FileDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.code)) {
			return model.code.trim();
		} else {
			return '?';
		}
	}
};
export const elementEnabled: ConfigurableElement = {
	code: 'enabled', label: 'Enabled', anchor: 'enabled',
	badge: model => model.enabled !== false
		? <ConfigurableElementBadgeChecked/>
		: <ConfigurableElementBadgeMissed/>
};
export const elementRoute: ConfigurableElement = {
	code: 'route', label: 'Route', anchor: 'route',
	visible: visibleOnPipeline
};
export const elementMethod: ConfigurableElement = {code: 'method', label: 'Method', anchor: 'method'};
export const elementHeaders: ConfigurableElement = {code: 'headers', label: 'Headers', anchor: 'headers'};
export const elementPathParams: ConfigurableElement = {
	code: 'pathParams', label: 'Path Parameters', anchor: 'path-params'
};
export const elementQueryParams: ConfigurableElement = {
	code: 'queryParams', label: 'Query Parameters', anchor: 'query-params'
};
export const elementBody: ConfigurableElement = {code: 'body', label: 'Body', anchor: 'body'};
export const elementFiles: ConfigurableElement = {code: 'files', label: 'Files', anchor: 'files'};
export const elementRequest: ConfigurableElement = {
	code: 'request', label: 'Request', anchor: 'request',
	children: [
		elementMethod, elementHeaders, elementPathParams, elementQueryParams,
		elementBody, elementFiles
	],
	visible: visibleOnPipeline
};
export const elementExposeHeaders: ConfigurableElement = {
	code: 'exposeHeaders', label: 'Expose Headers', anchor: 'expose-headers'
};
export const elementExposeFile: ConfigurableElement = {
	code: 'exposeFile', label: 'Expose File', anchor: 'expose-file'
};
export const elementResponse: ConfigurableElement = {
	code: 'response', label: 'Response', anchor: 'response',
	children: [elementExposeHeaders, elementExposeFile],
	visible: visibleOnPipeline
};
export const elementType: ConfigurableElement = {
	code: 'type', label: 'Type', anchor: 'type',
	children: [elementRoute, elementRequest, elementResponse]
};
export const elements = [elementCode, elementEnabled, elementType];
