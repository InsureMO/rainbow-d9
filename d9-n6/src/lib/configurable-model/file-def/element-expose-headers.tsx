import {PropValue, VUtils} from '@rainbow-d9/n1';
import {CssVars, UnwrappedTextarea} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeCount,
	ConfigurableElementBadgeNotAvailable,
	ConfigurableElementEditorProps
} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {PipelineFileDefModel} from './types';

export const elementExposeHeaders: ConfigurableElement = {
	code: 'exposeHeaders', label: 'Expose Headers', anchor: 'expose-headers',
	badge: (model: PipelineFileDefModel): ReactNode => {
		const count = Object.keys(model.exposeHeaders ?? {}).length;
		if (count !== 0) {
			return <ConfigurableElementBadgeCount count={count}/>;
		} else {
			return <ConfigurableElementBadgeNotAvailable/>;
		}
	},
	editor: (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.temporary = {...(model.temporary ?? {}), exposeHeaders: value as string};
			model.exposeHeaders = (value as string)
				.split('\n')
				.filter(line => VUtils.isNotBlank(line))
				.map(line => [line, line.split(':', 1)[0]])
				.filter(([, key]) => VUtils.isNotBlank(key))
				.map(([line, key]) => [key, line.substring(key.length + 1)])
				.map(([key, value]) => [key.trim(), (value ?? '').trim()])
				.reduce((acc, [key, value]) => {
					acc[key] = value;
					return acc;
				}, {} as PipelineFileDefModel['exposeHeaders']);
			onValueChanged();
		};
		const rows = (model.temporary?.exposeHeaders ?? '').split('\n').length;

		return <UnwrappedTextarea value={model.temporary?.exposeHeaders ?? ''} onValueChange={onValueChange}
		                          style={{
			                          height: `calc(${rows} * ${CssVars.LINE_HEIGHT} + ((${CssVars.INPUT_HEIGHT} - ${CssVars.LINE_HEIGHT}) / 2 - ${CssVars.BORDER_WIDTH}) * 2)`,
			                          maxHeight: `calc(10 * ${CssVars.LINE_HEIGHT} + ((${CssVars.INPUT_HEIGHT} - ${CssVars.LINE_HEIGHT}) / 2 - ${CssVars.BORDER_WIDTH}) * 2)`
		                          }}/>;
	},
	helpDoc: HelpDocs.pipelineExposeHeaders
};
