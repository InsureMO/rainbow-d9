import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedCheckbox, UnwrappedDecorateInput, UnwrappedDropdown, UnwrappedInput} from '@rainbow-d9/n2';
import React, {ReactNode, useRef} from 'react';
import {
	ApiMultipleNamedFiles,
	ApiNamedFile,
	ApiNonameOrNamedFiles,
	FileDef,
	isPipelineDef,
	PipelineFileDef,
	PipelineStepFileDef,
	PipelineStepSetsFileDef,
	PipelineStepUseDef
} from '../definition';
import {
	ConfigurableElement,
	ConfigurableElementBadgeAll,
	ConfigurableElementBadgeBanned,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeCount,
	ConfigurableElementBadgeIgnored,
	ConfigurableElementBadgeMissed,
	ConfigurableElementBadgeNotAvailable,
	ConfigurableElementEditorProps,
	ConfigurableModel
} from '../edit-dialog';
import {HelpDocs} from '../help-docs';
import {Labels} from '../labels';
import {VerticalLinesEditor} from './vertical-lines-editor';

export interface FileDefModel extends ConfigurableModel, FileDef {
}

export interface PipelineFileDefModel extends FileDefModel, PipelineFileDef {
	type: PipelineFileDef['type'];
	api: boolean;
	temporary?: {
		headers?: string;
		pathParams?: string;
		queryParams?: string;
		files?: string // single or multiple files with single name
			| ApiNonameOrNamedFiles // with single name, explicitly declared it is single or multiple. default multiple is false
			| Array<ApiNamedFile> // multiple files with multiple names
			| ApiMultipleNamedFiles;
	};
}

export interface StepOrSetsFileDefModel extends FileDefModel, PipelineStepUseDef {
	type: PipelineStepFileDef['type'] | PipelineStepSetsFileDef['type'];
}

export const prepareModel = (def: FileDef): ConfigurableModel => {
	const model: FileDefModel = {
		code: def.code,
		type: def.type,
		enabled: def.enabled
	};
	if (isPipelineDef(def)) {
		const pipeline = def as PipelineFileDef;
		const pipelineModel = model as PipelineFileDefModel;
		if (VUtils.isNotBlank(pipeline.route)) {
			// api
			pipelineModel.api = true;
			pipelineModel.route = pipeline.route;
			pipelineModel.method = pipeline.method;
			pipelineModel.headers = pipeline.headers;
			pipelineModel.pathParams = pipeline.pathParams;
			pipelineModel.queryParams = pipeline.queryParams;
			pipelineModel.body = pipeline.body;
			pipelineModel.files = pipeline.files;
			pipelineModel.exposeHeaders = pipeline.exposeHeaders;
			pipelineModel.exposeFile = pipeline.exposeFile;
			pipelineModel.temporary = {
				headers: pipeline.headers === true ? (void 0) : pipeline.headers?.filter(header => VUtils.isNotBlank(header)).join(', '),
				pathParams: pipeline.pathParams === true ? (void 0) : pipeline.pathParams?.filter(param => VUtils.isNotBlank(param)).join(', '),
				queryParams: pipeline.queryParams === true ? (void 0) : pipeline.queryParams?.filter(param => VUtils.isNotBlank(param)).join(', ')
			};
		} else {
			pipelineModel.api = false;
		}
	} else {
		const step = def as unknown as PipelineStepUseDef;
		(model as StepOrSetsFileDefModel).use = step.use;
	}
	return model;
};

export const allOrArray = (value?: null | true | Array<string>) => {
	if (value === true) {
		return <ConfigurableElementBadgeAll/>;
	} else if (Array.isArray(value)) {
		const length = value.filter(header => VUtils.isNotBlank(header)).length;
		return <ConfigurableElementBadgeCount count={length}/>;
	} else {
		return <ConfigurableElementBadgeIgnored/>;
	}
};

const ANCHOR_TYPE = 'type';
const ANCHOR_ROUTE = 'route';
export const visibleOnPipeline = (model: FileDefModel) => model.type === 'pipeline';
export const visibleOnApi = (model: PipelineFileDefModel) => visibleOnPipeline(model) && model.api === true;
export const elementCode: ConfigurableElement = {
	code: 'code', label: 'Code', anchor: 'code',
	badge: (model: FileDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.code)) {
			return model.code.trim();
		} else {
			return <ConfigurableElementBadgeMissed/>;
		}
	},
	editor: (props: ConfigurableElementEditorProps<FileDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.code = value as string;
			onValueChanged();
		};
		return <UnwrappedInput onValueChange={onValueChange} value={model.code ?? ''}/>;
	},
	helpDoc: HelpDocs.pipelineCode
};
export const elementEnabled: ConfigurableElement = {
	code: 'enabled', label: 'Enabled', anchor: 'enabled',
	badge: model => model.enabled !== false
		? <ConfigurableElementBadgeChecked/>
		: <ConfigurableElementBadgeBanned/>,
	editor: (props: ConfigurableElementEditorProps<FileDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.enabled = value as boolean;
			onValueChanged();
		};
		return <UnwrappedCheckbox onValueChange={onValueChange} value={model.enabled ?? true}/>;
	},
	helpDoc: HelpDocs.pipelineEnabled
};
export const elementRoute: ConfigurableElement = {
	code: 'route', label: 'Route', anchor: ANCHOR_ROUTE,
	badge: (model: PipelineFileDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.route)) {
			return model.route.trim();
		} else {
			return <ConfigurableElementBadgeMissed/>;
		}
	},
	visibleOn: [ANCHOR_TYPE], visible: visibleOnApi,
	editor: (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.route = value as string;
			onValueChanged();
		};
		return <UnwrappedInput onValueChange={onValueChange} value={model.route ?? ''}/>;
	},
	helpDoc: HelpDocs.pipelineRoute
};
export const elementMethod: ConfigurableElement = {
	code: 'method', label: 'Method', anchor: 'method',
	badge: (model: PipelineFileDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.method)) {
			return model.method.trim().toUpperCase();
		} else {
			return <ConfigurableElementBadgeMissed/>;
		}
	},
	editor: (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.method = value as PipelineFileDefModel['method'];
			onValueChanged();
		};
		const options = [
			{value: 'get', label: 'GET'},
			{value: 'post', label: 'POST'},
			{value: 'put', label: 'PUT'},
			{value: 'delete', label: 'DELETE'},
			{value: 'patch', label: 'PATCH'}
		];
		return <UnwrappedDropdown value={model.method ?? ''} onValueChange={onValueChange} options={options}
		                          clearable={false}
		                          style={{justifySelf: 'start', width: 'unset', minWidth: 'min(200px, 100%)'}}/>;
	},
	helpDoc: HelpDocs.pipelineMethod
};

export interface AllIgnoredOrArrayEditorProps extends ConfigurableElementEditorProps<PipelineFileDefModel> {
	name: 'headers' | 'pathParams' | 'queryParams';
	lead: ReactNode;
}

export const AllIgnoredOrArrayEditor = (props: AllIgnoredOrArrayEditorProps) => {
	const {model, onValueChanged, name, lead} = props;

	const inputRef = useRef<HTMLInputElement>(null);

	const writeToModel = (value?: string) => {
		const array = (value ?? '').split(/[,;]/).map(header => header.trim()).filter(header => VUtils.isNotBlank(header));
		if (array.length === 0) {
			model[name] = [];
		} else {
			model[name] = array;
		}
	};
	const onValueChange = (value: PropValue) => {
		if (value === 'all') {
			model[name] = true;
		} else if (value === 'ignored') {
			delete model[name];
		} else {
			writeToModel(model.temporary?.[name]);
			setTimeout(() => inputRef.current?.querySelector('input')?.focus(), 50);
		}
		onValueChanged();
	};
	const onArrayValueChange = (value: PropValue) => {
		writeToModel(value as string);
		model.temporary = {...(model.temporary ?? {}), [name]: value as string};
		onValueChanged();
	};
	const value = model[name] == null ? 'ignored' : model[name] === true ? 'all' : 'customized';
	const options = [
		{value: 'all', label: Labels.All},
		{value: 'ignored', label: Labels.Ignored},
		{value: 'customized', label: Labels.Customized}
	];

	return <VerticalLinesEditor>
		<UnwrappedDropdown value={value} onValueChange={onValueChange} options={options}
		                   clearable={false}
		                   style={{justifySelf: 'start', width: 'unset', minWidth: 'min(200px, 100%)'}}/>
		<UnwrappedDecorateInput leads={[lead]}
		                        value={model.temporary?.[name] ?? ''} onValueChange={onArrayValueChange}
		                        disabled={value !== 'customized'} ref={inputRef}
		                        data-di-prefix-text={true}/>
	</VerticalLinesEditor>;
};
const HeadersEditor = (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
	return <AllIgnoredOrArrayEditor {...props} name="headers" lead={Labels.ParameterNames}/>;
};
export const elementHeaders: ConfigurableElement = {
	code: 'headers', label: 'Headers', anchor: 'headers',
	badge: (model: PipelineFileDefModel): ReactNode => {
		return allOrArray(model.headers);
	},
	editor: HeadersEditor,
	helpDoc: HelpDocs.pipelineHeaders
};
const PathParamsEditor = (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
	return <AllIgnoredOrArrayEditor {...props} name="pathParams" lead={Labels.ParameterNames}/>;
};
export const elementPathParams: ConfigurableElement = {
	code: 'pathParams', label: 'Path Parameters', anchor: 'path-params',
	badge: (model: PipelineFileDefModel): ReactNode => {
		return allOrArray(model.pathParams);
	},
	changeBy: [ANCHOR_ROUTE],
	editor: PathParamsEditor,
	helpDoc: HelpDocs.pipelinePathParams
};
const QueryParamsEditor = (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
	return <AllIgnoredOrArrayEditor {...props} name="queryParams" lead={Labels.ParameterNames}/>;
};
export const elementQueryParams: ConfigurableElement = {
	code: 'queryParams', label: 'Query Parameters', anchor: 'query-params',
	badge: (model: PipelineFileDefModel): ReactNode => {
		return allOrArray(model.queryParams);
	},
	editor: QueryParamsEditor,
	helpDoc: HelpDocs.pipelineQueryParams
};
export const elementBody: ConfigurableElement = {
	code: 'body', label: 'Body', anchor: 'body',
	badge: (model: PipelineFileDefModel): ReactNode => {
		if (model.body === true) {
			return <ConfigurableElementBadgeChecked/>;
		} else {
			return <ConfigurableElementBadgeIgnored/>;
		}
	}
};
export const elementFiles: ConfigurableElement = {
	code: 'files', label: 'Files', anchor: 'files',
	badge: (model: PipelineFileDefModel): ReactNode => {
		if (model.files != null && model.files !== false) {
			return <ConfigurableElementBadgeChecked/>;
		} else {
			return <ConfigurableElementBadgeIgnored/>;
		}
	}
};
export const elementRequest: ConfigurableElement = {
	code: 'request', label: 'Request', anchor: 'request',
	children: [
		elementMethod, elementHeaders, elementPathParams, elementQueryParams,
		elementBody, elementFiles
	],
	visibleOn: [ANCHOR_TYPE], visible: visibleOnApi, group: true
};
export const elementExposeHeaders: ConfigurableElement = {
	code: 'exposeHeaders', label: 'Expose Headers', anchor: 'expose-headers',
	badge: (model: PipelineFileDefModel): ReactNode => {
		const count = Object.keys(model.exposeHeaders ?? {}).length;
		if (count !== 0) {
			return <ConfigurableElementBadgeCount count={count}/>;
		} else {
			return <ConfigurableElementBadgeNotAvailable/>;
		}
	}
};
export const elementExposeFile: ConfigurableElement = {
	code: 'exposeFile', label: 'Expose File', anchor: 'expose-file',
	badge: (model: PipelineFileDefModel): ReactNode => {
		if (model.exposeFile === true) {
			return <ConfigurableElementBadgeChecked/>;
		} else {
			return <ConfigurableElementBadgeNotAvailable/>;
		}
	}
};
export const elementResponse: ConfigurableElement = {
	code: 'response', label: 'Response', anchor: 'response',
	children: [elementExposeHeaders, elementExposeFile],
	visibleOn: [ANCHOR_TYPE], visible: visibleOnApi, group: true
};
export const elementType: ConfigurableElement = {
	code: 'type', label: 'Type', anchor: ANCHOR_TYPE,
	badge: (model: FileDefModel): ReactNode => {
		switch (true) {
			case model.type === 'pipeline' && (model as PipelineFileDefModel).api === true:
				return Labels.PipelineTypeApi;
			case  model.type === 'pipeline':
				return Labels.PipelineTypePipeline;
			case model.type === 'step-sets':
				return Labels.PipelineTypeStepSet;
			case model.type === 'step':
				return Labels.PipelineTypeStep;
			default:
				return <ConfigurableElementBadgeMissed/>;
		}
	},
	editor: (props: ConfigurableElementEditorProps<FileDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			if (value === 'api') {
				model.type = 'pipeline';
				(model as PipelineFileDefModel).api = true;
			} else if (value === 'pipeline') {
				model.type = 'pipeline';
				(model as PipelineFileDefModel).api = false;
			} else {
				model.type = value as 'step-sets' | 'step';
				delete (model as PipelineFileDefModel).api;
			}
			onValueChanged();
		};
		const value = ((model as PipelineFileDefModel).api === true ? 'api' : model.type) ?? 'pipeline';
		const options = [
			{value: 'pipeline', label: Labels.PipelineTypePipeline},
			{value: 'api', label: Labels.PipelineTypeApi},
			{value: 'step-sets', label: Labels.PipelineTypeStepSet},
			{value: 'step', label: Labels.PipelineTypeStep}
		];
		return <UnwrappedDropdown value={value} onValueChange={onValueChange} options={options}
		                          clearable={false}
		                          style={{justifySelf: 'start', width: 'unset', minWidth: 'min(200px, 100%)'}}/>;
	},
	helpDoc: HelpDocs.pipelineType,
	children: [elementRoute, elementRequest, elementResponse]
};
export const elements = [elementCode, elementEnabled, elementType];
