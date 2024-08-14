import {PropValue, VUtils} from '@rainbow-d9/n1';
import {CssVars, UnwrappedCheckboxes, UnwrappedDecorateInput} from '@rainbow-d9/n2';
import React, {ReactNode, useRef} from 'react';
import styled from 'styled-components';
import {
	ConfigurableElement,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeMissed,
	ConfigurableElementEditorProps
} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {createCheckOrMissBadge, createStrEditor} from '../../common';
import {TypeOrmStepDefModel, TypeOrmWithAutonomousStepDefModel} from './types';

/**
 * for no autonomous
 */
export const elementTransaction = {
	code: 'transaction', label: Labels.StepTypeOrmTransaction, anchor: 'transaction',
	badge: createCheckOrMissBadge({check: (model: TypeOrmStepDefModel) => VUtils.isNotBlank(model.transaction)}),
	editor: createStrEditor<TypeOrmStepDefModel>({
		getValue: model => model.transaction,
		setValue: (model, value) => model.transaction = value,
		placeholder: '$default-transaction'
	}),
	helpDoc: HelpDocs.stepTypeOrmTransaction
};

const AutonomousOrTransactionEditorWrapper = styled.div`
    > div[data-w=d9-deco-input] {
        > span[data-w=d9-deco-lead]:first-child {
            padding-right: 0;

            > div[data-w=d9-checkboxes] > span[data-w=d9-checkboxes-option]:first-child {
                padding-right: calc(${CssVars.INPUT_INDENT} + 4px);
                margin-right: 0;

                > div[data-w=d9-checkbox] {
                    transform: scale(0.8);
                }
            }
        }

        > input {
            flex-grow: unset;
            min-width: 250px;
        }
    }
`;
const AutonomousOrTransactionEditor = (props: ConfigurableElementEditorProps<TypeOrmWithAutonomousStepDefModel>) => {
	const {model, onValueChanged} = props;

	const inputRef = useRef<HTMLInputElement>(null);

	const onAutonomousChange = (value: PropValue) => {
		if (value === true) {
			model.autonomous = true;
		} else {
			model.autonomous = false;
			setTimeout(() => inputRef.current?.querySelector('input')?.focus(), 50);
		}
		onValueChanged();
	};
	const onTransactionChange = (value: PropValue) => {
		model.transaction = value as string;
		onValueChanged();
	};

	const autonomousCheck = [
		<UnwrappedCheckboxes onValueChange={onAutonomousChange} value={model.autonomous ?? false}
		                     options={[{value: true, label: Labels.TransactionAutonomous}]}
		                     single={true} boolOnSingle={true}/>
	];
	return <AutonomousOrTransactionEditorWrapper>
		<UnwrappedDecorateInput leads={autonomousCheck}
		                        value={model.transaction ?? ''} onValueChange={onTransactionChange}
		                        disabled={model.autonomous === true}
		                        placeholder="$default-transaction"
		                        ref={inputRef}/>
	</AutonomousOrTransactionEditorWrapper>;
};
/**
 * for autonomous available
 */
export const elementAutonomousOrTransaction: ConfigurableElement = {
	code: 'transaction', label: Labels.StepTypeOrmTransaction, anchor: 'transaction',
	badge: (model: TypeOrmWithAutonomousStepDefModel): ReactNode => {
		const {autonomous, transaction} = model;
		if (autonomous === true) {
			return Labels.TransactionAutonomous;
		} else if (VUtils.isBlank(transaction)) {
			return <ConfigurableElementBadgeMissed/>;
		} else {
			return <ConfigurableElementBadgeChecked/>;
		}
	},
	editor: AutonomousOrTransactionEditor,
	helpDoc: HelpDocs.stepTypeOrmAutonomousOrTransaction
};
