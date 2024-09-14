import {CssVars, DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React, {ReactNode, useRef, useState} from 'react';
import styled from 'styled-components';
import {Max, Min} from '../../icons';
import {PlaygroundCssVars} from '../../widgets';

export const CodeEditorContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-code-editor'})`
    display: block;
    position: relative;
    width: 100%;

    &[data-max=true] {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: ${CssVars.BACKGROUND_COLOR};
        border: 0;
        border-radius: 0;
        z-index: calc(${PlaygroundCssVars.EDITOR_MAX_Z_INDEX} + 1);

        > div:not([data-w=o23-playground-code-editor-max-switcher]) {
            width: 100%;
            height: 100%;
            min-height: 100%;
            max-height: 100%;
            border: 0;
        }
    }

    &[data-visible=false] {
        display: none;
    }
`;
export const MaxSwitcher = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-code-editor-max-switcher'})`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: 8px;
    right: 8px;
    width: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_WIDTH};
    height: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_HEIGHT};
    color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_COLOR};
    border: ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER};
    border-radius: calc(${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER_RADIUS} * 2);
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    cursor: pointer;
    z-index: 1;

    &:hover {
        color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_COLOR};
        background-color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_BACKGROUND_COLOR};
        border-color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_COLOR};

        > svg {
            opacity: 1;
        }
    }

    > svg {
        opacity: 0.5;
        width: calc(${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_WIDTH} * 0.8);
        height: calc(${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_HEIGHT} * 0.8);
        transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;

export const CodeEditorWrapper = (props: { children: ReactNode }) => {
	const {children, ...rest} = props;

	const ref = useRef<HTMLDivElement>(null);
	const [max, setMax] = useState(false);

	const onMaxSwitchClicked = () => setMax(!max);

	return <CodeEditorContainer {...rest} data-max={max} ref={ref}>
		<MaxSwitcher onClick={onMaxSwitchClicked}>{max ? <Min/> : <Max/>}</MaxSwitcher>
		{children}
	</CodeEditorContainer>;
};