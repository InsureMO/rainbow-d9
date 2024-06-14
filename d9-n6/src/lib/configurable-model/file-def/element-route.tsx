import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedInput} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeMissed,
	ConfigurableElementEditorProps,
	EditDialogEventTypes,
	useEditDialogEventBus
} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {ANCHOR_PATH_PARAMS, ANCHOR_ROUTE, ANCHOR_TYPE, visibleOnApi} from './helper';
import {PipelineFileDefModel} from './types';

export const RouteEditor = (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
	const {model, onValueChanged} = props;

	const {fire} = useEditDialogEventBus();
	const onValueChange = (value: PropValue) => {
		model.route = value as string;
		const pathParamNames = model.route.split(/[/.-]/)
			.map(name => name.trim())
			.filter(name => name.startsWith(':'))
			.map(name => name.substring(1));
		model.temporary = {...(model.temporary ?? {}), pathParams: pathParamNames.join(', ')};
		if (model.pathParams != null && model.pathParams !== true) {
			model.pathParams = pathParamNames;
			// also notify path parameters change
			fire(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, ANCHOR_PATH_PARAMS);
		}
		onValueChanged();
	};
	return <UnwrappedInput onValueChange={onValueChange} value={model.route ?? ''}/>;
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
	editor: RouteEditor,
	helpDoc: HelpDocs.pipelineRoute
};
