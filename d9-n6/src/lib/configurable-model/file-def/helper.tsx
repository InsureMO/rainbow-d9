import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedDecorateInput, UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {ReactNode, useRef} from 'react';
import {
	ConfigurableElementBadgeAll,
	ConfigurableElementBadgeCount,
	ConfigurableElementBadgeIgnored,
	ConfigurableElementEditorProps
} from '../../edit-dialog';
import {Labels} from '../../labels';
import {CommonElementEditorStyles, VerticalLinesEditor} from '../common';
import {FileDefModel, PipelineFileDefModel} from './types';

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

export const ANCHOR_TYPE = 'type';
export const ANCHOR_ROUTE = 'route';
export const ANCHOR_PATH_PARAMS = 'path-params';

export const visibleOnPipeline = (model: FileDefModel) => model.type === 'pipeline';
export const visibleOnNotApi = (model: PipelineFileDefModel) => visibleOnPipeline(model) && model.api !== true;
export const visibleOnApi = (model: PipelineFileDefModel) => visibleOnPipeline(model) && model.api === true;

export interface AllIgnoredOrArrayEditorProps extends ConfigurableElementEditorProps<PipelineFileDefModel> {
	name: 'headers' | 'pathParams' | 'queryParams';
	lead: ReactNode;
}

export const AllIgnoredOrArrayOptions = [
	{value: 'all', label: Labels.All},
	{value: 'ignored', label: Labels.Ignored},
	{value: 'specified', label: Labels.Specified}
];

export const AllIgnoredOrArrayEditor = (props: AllIgnoredOrArrayEditorProps) => {
	const {model, onValueChanged, name, lead} = props;

	const inputRef = useRef<HTMLDivElement>(null);

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
	const value = model[name] == null ? 'ignored' : model[name] === true ? 'all' : 'specified';

	return <VerticalLinesEditor>
		<UnwrappedDropdown value={value} onValueChange={onValueChange} options={AllIgnoredOrArrayOptions}
		                   clearable={false} style={CommonElementEditorStyles.dropdown}/>
		<UnwrappedDecorateInput leads={[lead]}
		                        value={model.temporary?.[name] ?? ''}
		                        onValueChange={onArrayValueChange}
		                        disabled={value !== 'specified'} ref={inputRef}
		                        data-di-prefix-text={true}/>
	</VerticalLinesEditor>;
};
