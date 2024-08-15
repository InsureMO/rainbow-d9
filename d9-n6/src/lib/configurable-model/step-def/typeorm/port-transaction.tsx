import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PrePort} from '../../../diagram';
import {Labels} from '../../../labels';
import {StepPortProps} from '../common';
import {TypeOrmStepDefModel, TypeOrmWithAutonomousStepDefModel} from './types';

export const PortTransaction = (props: StepPortProps<TypeOrmStepDefModel>) => {
	const {step: def} = props;

	const {transaction} = def;

	if (VUtils.isNotBlank(transaction)) {
		return <PrePort label={Labels.StepTypeOrmTransaction} required={true}
		                defined={true} all={true} allAsGiven={transaction.trim()}/>;
	} else {
		return <PrePort label={Labels.StepTypeOrmTransaction} required={true} defined={false}/>;
	}
};

export const PortTransactionWithAutonomous = (props: StepPortProps<TypeOrmWithAutonomousStepDefModel>) => {
	const {step: model} = props;

	const {autonomous, transaction} = model;

	if (autonomous === true) {
		return <PrePort label={Labels.TransactionAutonomous} required={true} defined={true}/>;
	} else if (VUtils.isNotBlank(transaction)) {
		return <PrePort label={Labels.StepTypeOrmTransaction} required={true}
		                defined={true} all={true} allAsGiven={transaction.trim()}/>;
	} else {
		return <PrePort label={Labels.StepTypeOrmTransaction} required={true} defined={false}/>;
	}
};
