import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedDecorateInput, UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {ReactNode, useState} from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {Labels} from '../../labels';
import {CommonElementEditorStyles, VerticalLinesEditor} from '../common';
import {ANCHOR_TYPE, visibleOnApi} from './helper';
import {PipelineFileDefModel} from './types';

const beautifyAuthorizations = (model: PipelineFileDefModel): Array<string> => {
	return [...new Set(model.authorizations == null
		? []
		: (typeof model.authorizations === 'string'
			? model.authorizations.trim().split(',').map(auth => auth.trim()).filter(auth => VUtils.isNotBlank(auth))
			: model.authorizations.map(auth => (auth ?? '').trim()).filter(auth => VUtils.isNotBlank(auth))))];

};
export const AuthorizationsEditor = (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
	const {model, onValueChanged} = props;

	const authorizations = beautifyAuthorizations(model);
	const [roles, setRoles] = useState(() => {
		if (authorizations.length === 0) {
			return '';
		} else if (authorizations.includes('anonymous')) {
			return '';
		} else {
			return authorizations.filter(auth => auth !== 'authenticated').join(', ');
		}
	});

	const onValueChange = (value: PropValue) => {
		if (value === 'ignored') {
			delete model.authorizations;
		} else if (value === 'anonymous') {
			model.authorizations = 'anonymous';
		} else {
			const exists = roles.split(',').map(role => role.trim()).filter(role => role.length !== 0);
			if (exists.length === 0) {
				model.authorizations = 'authenticated';
			} else {
				model.authorizations = exists;
			}
		}
		onValueChanged();
	};
	const onRolesChange = (value: PropValue) => {
		const roles = value as string;
		if (roles.trim().length === 0) {
			model.authorizations = 'authenticated';
		} else {
			model.authorizations = roles.split(',').map(role => role.trim()).filter(role => role.length !== 0);
		}
		onValueChanged(false);
		setRoles(roles);
	};

	const value = authorizations.length === 0 ? 'ignored' : authorizations.includes('anonymous') ? 'anonymous' : 'authenticated';
	const options = [
		{value: 'ignored', label: Labels.NoAuth},
		{value: 'anonymous', label: Labels.AuthAnonymous},
		{value: 'authenticated', label: Labels.AuthAuthenticated}
	];
	return <VerticalLinesEditor>
		<UnwrappedDropdown value={value} onValueChange={onValueChange} options={options}
		                   clearable={false} style={CommonElementEditorStyles.dropdown}/>
		<UnwrappedDecorateInput leads={[Labels.AuthRoles]}
		                        value={roles}
		                        onValueChange={onRolesChange}
		                        disabled={value !== 'authenticated'}
		                        data-di-prefix-text={true}/>
	</VerticalLinesEditor>;
};
export const elementAuthorizations: ConfigurableElement = {
	code: 'authorizations', label: Labels.ApiAuthorizationsLabel, anchor: 'authorizations',
	badge: (model: PipelineFileDefModel): ReactNode => {
		const authorizations = beautifyAuthorizations(model);
		if (authorizations.length === 0) {
			return Labels.NoAuth;
		} else if (authorizations.includes('anonymous')) {
			return Labels.AuthAnonymous;
		} else {
			return Labels.AuthAuthenticated;
		}
	},
	visibleOn: [ANCHOR_TYPE], visible: visibleOnApi,
	editor: AuthorizationsEditor,
	helpDoc: HelpDocs.pipelineAuthorizations
};
