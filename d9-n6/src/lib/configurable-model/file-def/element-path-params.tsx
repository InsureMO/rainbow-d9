import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedDecorateInput, UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {Labels} from '../../labels';
import {CommonElementEditorStyles} from '../styles';
import {VerticalLinesEditor} from '../vertical-lines-editor';
import {AllIgnoredOrArrayOptions, allOrArray, ANCHOR_PATH_PARAMS, ANCHOR_ROUTE} from './helper';
import {PipelineFileDefModel} from './types';

const PathParamsEditor = (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
	const {model, onValueChanged} = props;

	const writeToModel = (value?: string) => {
		const array = (value ?? '').split(/[,;]/).map(header => header.trim()).filter(header => VUtils.isNotBlank(header));
		if (array.length === 0) {
			model.pathParams = [];
		} else {
			model.pathParams = array;
		}
	};
	const onValueChange = (value: PropValue) => {
		if (value === 'all') {
			model.pathParams = true;
		} else if (value === 'ignored') {
			delete model.pathParams;
		} else {
			writeToModel(model.temporary?.pathParams);
		}
		onValueChanged();
	};
	const value = model.pathParams == null ? 'ignored' : model.pathParams === true ? 'all' : 'specified';

	return <VerticalLinesEditor>
		<UnwrappedDropdown value={value} onValueChange={onValueChange} options={AllIgnoredOrArrayOptions}
		                   clearable={false} style={CommonElementEditorStyles.dropdown}/>
		<UnwrappedDecorateInput leads={[Labels.ParameterNames]}
		                        value={model.temporary?.pathParams ?? ''}
		                        onValueChange={VUtils.noop}
		                        disabled={true}
		                        data-di-prefix-text={true}/>
	</VerticalLinesEditor>;
};
export const elementPathParams: ConfigurableElement = {
	code: 'pathParams', label: Labels.ApiPathParametersLabel, anchor: ANCHOR_PATH_PARAMS,
	badge: (model: PipelineFileDefModel): ReactNode => allOrArray(model.pathParams),
	changeBy: [ANCHOR_ROUTE],
	editor: PathParamsEditor,
	helpDoc: HelpDocs.pipelinePathParams
};
