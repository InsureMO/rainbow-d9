import {CssVars, DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../../widgets';

export const VerticalLinesEditorContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-specific-element-editor-vertical'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    grid-row-gap: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_GRID_ROW_GAP};

    > div[data-w=d9-deco-input][data-di-prefix-text=true] {
        &[data-disabled=true] > span:first-child {
            cursor: default;
            background-color: ${CssVars.DISABLE_COLOR};
        }

        > span:first-child {
            font-size: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_INPUT_PREFIX_FONT_SIZE};
            transition: background-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
        }
    }
`;

export const VerticalLinesEditor = (props: { children: ReactNode }) => {
	return <VerticalLinesEditorContainer>
		{props.children}
	</VerticalLinesEditorContainer>;
};
