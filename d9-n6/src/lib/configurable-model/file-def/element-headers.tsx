import React, {ReactNode} from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {Labels} from '../../labels';
import {AllIgnoredOrArrayEditor, allOrArray} from './helper';
import {PipelineFileDefModel} from './types';

const HeadersEditor = (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
	return <AllIgnoredOrArrayEditor {...props} name="headers" lead={Labels.ParameterNames}/>;
};
export const elementHeaders: ConfigurableElement = {
	code: 'headers', label: 'Headers', anchor: 'headers',
	badge: (model: PipelineFileDefModel): ReactNode => allOrArray(model.headers),
	editor: HeadersEditor,
	helpDoc: HelpDocs.pipelineHeaders
};
