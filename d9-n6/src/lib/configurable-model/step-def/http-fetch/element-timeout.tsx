import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedCheckboxes, UnwrappedDecorateInput} from '@rainbow-d9/n2';
import React, {useRef} from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../../edit-dialog';
import {NavigatorElementBadgeWrapper} from '../../../edit-dialog/widgets';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {CheckAndValueEditor, createValueOrAnotherBadge} from '../../common';
import {HttpStepDefModel} from './types';

const TimeoutEditor = (props: ConfigurableElementEditorProps<HttpStepDefModel>) => {
	const {model, onValueChanged} = props;

	const inputRef = useRef<HTMLDivElement>(null);
	const valueRef = useRef<string>(`${model.timeout ?? ''}`);
	const noTimeoutRef = useRef(model.timeout == null || model.timeout <= 0);

	const onNoTimeoutChange = (value: PropValue) => {
		if (value === true) {
			delete model.timeout;
			noTimeoutRef.current = true;
		} else {
			const test = VUtils.isPositive(value);
			if (test.test) {
				model.timeout = test.value;
			} else {
				delete model.timeout;
			}
			noTimeoutRef.current = false;
			setTimeout(() => inputRef.current?.querySelector('input')?.focus(), 50);
		}
		onValueChanged();
	};
	const onValueChange = (value: PropValue) => {
		const test = VUtils.isPositive(value);
		if (test.test) {
			model.timeout = test.value;
		} else {
			delete model.timeout;
		}

		valueRef.current = value as string;
		onValueChanged();
	};

	const noTimeout = [
		<UnwrappedCheckboxes onValueChange={onNoTimeoutChange} value={noTimeoutRef.current}
		                     options={[{value: true, label: Labels.NoTimeout}]}
		                     single={true} boolOnSingle={true}/>
	];
	return <CheckAndValueEditor inputWidth={150}>
		<UnwrappedDecorateInput leads={noTimeout}
		                        value={valueRef.current} onValueChange={onValueChange}
		                        disabled={noTimeoutRef.current}
		                        ref={inputRef}/>
	</CheckAndValueEditor>;
};
export const elementTimeout: ConfigurableElement = {
	code: 'timeout', label: Labels.StepHttpTimeout, anchor: 'timeout',
	badge: createValueOrAnotherBadge<HttpStepDefModel>({
		check: model => VUtils.isNotBlank(model.timeout),
		one: model => model.timeout,
		another: <NavigatorElementBadgeWrapper data-role="use-default">
			{Labels.NoTimeout}
		</NavigatorElementBadgeWrapper>
	}),
	editor: TimeoutEditor,
	helpDoc: HelpDocs.stepHttpTimeout
};