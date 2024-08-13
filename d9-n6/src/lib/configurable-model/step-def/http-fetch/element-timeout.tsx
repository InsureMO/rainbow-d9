import {PropValue, VUtils} from '@rainbow-d9/n1';
import {CssVars, UnwrappedCheckboxes, UnwrappedDecorateInput} from '@rainbow-d9/n2';
import React, {useRef} from 'react';
import styled from 'styled-components';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../../edit-dialog';
import {NavigatorElementBadgeWrapper} from '../../../edit-dialog/widgets';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {createValueOrAnotherBadge} from '../../common';
import {HttpStepDefModel} from './types';

const TimeoutEditor = styled.div`
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
            min-width: 150px;
        }
    }
`;
const MethodEditor = (props: ConfigurableElementEditorProps<HttpStepDefModel>) => {
	const {model, onValueChanged} = props;

	const inputRef = useRef<HTMLInputElement>(null);
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
	return <TimeoutEditor>
		<UnwrappedDecorateInput leads={noTimeout}
		                        value={valueRef.current} onValueChange={onValueChange}
		                        disabled={noTimeoutRef.current}
		                        ref={inputRef}/>
	</TimeoutEditor>;
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
	editor: MethodEditor,
	helpDoc: HelpDocs.stepHttpTimeout
};