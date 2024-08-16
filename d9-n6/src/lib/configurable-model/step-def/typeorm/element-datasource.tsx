import {PropValue, VUtils} from '@rainbow-d9/n1';
import {CssVars, UnwrappedCheckboxes, UnwrappedInput} from '@rainbow-d9/n2';
import React, {useRef} from 'react';
import styled from 'styled-components';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundModuleAssistant} from '../../../types';
import {createCheckOrMissBadge, createDropdownOnAssistantEditor} from '../../common';
import {TypeOrmStepDefModel} from './types';

const askDatasourceOptions = (assistant: Required<PlaygroundModuleAssistant>) => (assistant.askTypeOrmDatasources() ?? []).map(datasource => {
	return {value: datasource.code, label: VUtils.blankThen(datasource.name, datasource.code)};
});
const DatasourceDropdown = createDropdownOnAssistantEditor<TypeOrmStepDefModel, string>({
	getValue: model => model.datasource,
	setValue: (model, value) => model.datasource = value,
	askOptions: askDatasourceOptions
});
const DatasourceEditorContainer = styled.div`
    display: flex;
    position: relative;
    height: ${CssVars.INPUT_HEIGHT};

    > div[data-w=d9-checkboxes] {
        border: ${CssVars.BORDER};
        /* noinspection CssReplaceWithShorthandSafely */
        border-right-width: 0;
        border-top-left-radius: ${CssVars.BORDER_RADIUS};
        border-bottom-left-radius: ${CssVars.BORDER_RADIUS};

        > span[data-w="d9-checkboxes-option"]:first-child {
            padding-right: calc(${CssVars.INPUT_INDENT} + 4px);
            margin-left: 0;
            margin-right: 0;
            min-height: calc(${CssVars.INPUT_HEIGHT} - ${CssVars.BORDER_WIDTH} * 2);
            padding-top: 0;
            padding-bottom: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;

            > div[data-w=d9-checkbox] {
                transform: scale(0.8);
            }
        }
    }

    > div[data-w=d9-dropdown] {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    > input {
        flex-grow: unset;
        min-width: 250px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    &[data-by-envs=true] {
        > div[data-w=d9-dropdown] {
            display: none;
        }
    }

    &[data-by-envs=false] {
        > input {
            display: none;
        }
    }
`;
const DatasourceEditor = (props: ConfigurableElementEditorProps<TypeOrmStepDefModel>) => {
	const {model, onValueChanged} = props;

	const inputRef = useRef<HTMLInputElement>(null);

	const onDatasourceTypeChange = (value: PropValue) => {
		if (value === true) {
			// by env, backup code, recover env key
			model.temporary = {...(model.temporary ?? {}), datasourceByEnvs: true, datasourceCode: model.datasource};
			model.datasource = `env:${model.temporary.datasourceEnvKey ?? ''}`;
			setTimeout(() => inputRef.current?.focus(), 50);
		} else {
			// by code, backup env key, recover code
			model.temporary = {
				...(model.temporary ?? {}),
				datasourceByEnvs: false,
				datasourceEnvKey: (model.datasource ?? '').substring(4)
			};
			model.datasource = model.temporary?.datasourceCode;
		}
		onValueChanged();
	};
	const onEnvKeyChange = (value: PropValue) => {
		model.datasource = `env:${value ?? ''}`;
		onValueChanged();
	};
	const envKey = model.temporary?.datasourceByEnvs === true ? (model.datasource ?? '').substring(4) : '';

	return <DatasourceEditorContainer data-by-envs={model.temporary?.datasourceByEnvs === true}>
		<UnwrappedCheckboxes onValueChange={onDatasourceTypeChange} value={model.temporary.datasourceByEnvs ?? false}
		                     options={[{value: true, label: Labels.DatasourceByEnv}]}
		                     single={true} boolOnSingle={true}/>
		<UnwrappedInput value={envKey} onValueChange={onEnvKeyChange} ref={inputRef}/>
		<DatasourceDropdown {...props} />
	</DatasourceEditorContainer>;
};
export const elementDatasource: ConfigurableElement = {
	code: 'datasource', label: Labels.StepTypeOrmDatasource, anchor: 'datasource',
	badge: createCheckOrMissBadge({check: (model: TypeOrmStepDefModel) => VUtils.isNotBlank(model.datasource)}),
	editor: DatasourceEditor,
	helpDoc: HelpDocs.stepTypeOrmDatasource
};
