import React, {ReactNode} from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {Labels} from '../../labels';
import {AllIgnoredOrArrayEditor, allOrArray} from './helper';
import {PipelineFileDefModel} from './types';

const QueryParamsEditor = (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
	return <AllIgnoredOrArrayEditor {...props} name="queryParams" lead={Labels.ParameterNames}/>;
};
export const elementQueryParams: ConfigurableElement = {
	code: 'queryParams', label: Labels.ApiQueryParametersLabel, anchor: 'query-params',
	badge: (model: PipelineFileDefModel): ReactNode => allOrArray(model.queryParams),
	editor: QueryParamsEditor,
	helpDoc: HelpDocs.pipelineQueryParams
};
