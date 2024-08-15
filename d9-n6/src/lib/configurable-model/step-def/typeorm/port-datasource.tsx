import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PrePort} from '../../../diagram';
import {Labels} from '../../../labels';
import {StepPortProps} from '../common';
import {TypeOrmStepDefModel} from './types';

export const PortDatasource = (props: StepPortProps<TypeOrmStepDefModel>) => {
	const {step: model, node: {assistant}} = props;

	const {datasource} = model;

	if (VUtils.isBlank(datasource)) {
		return <PrePort label={Labels.StepTypeOrmDatasource} required={true} defined={false}/>;
	}
	if (datasource.startsWith('env:')) {
		const key = datasource.substring(4);
		if (VUtils.isBlank(key)) {
			return <PrePort label={Labels.StepTypeOrmDatasource} required={true} defined={false}/>;
		} else {
			return <PrePort label={Labels.StepTypeOrmDatasource} required={true} defined={true}
			                all={true} allAsGiven={key}/>;
		}
	} else {
		const found = (assistant.askTypeOrmDatasources() ?? []).find(ds => ds.code === datasource);
		if (found != null) {
			return <PrePort label={found.name || found.code} required={true} defined={true}/>;
		} else {
			return <PrePort label={Labels.StepTypeOrmDatasource} required={true} defined={false}/>;
		}
	}
};
