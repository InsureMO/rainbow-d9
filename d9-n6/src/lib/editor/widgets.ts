import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../widgets';

// noinspection CssUnresolvedCustomProperty
export const EditorWrapper = styled.div.attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-editor',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
    display: block;
    position: relative;
    align-self: stretch;
    background-image: ${PlaygroundCssVars.EDITOR_BACKGROUND_IMAGE};
    background-size: ${PlaygroundCssVars.EDITOR_BACKGROUND_SIZE};
    background-position: ${PlaygroundCssVars.EDITOR_BACKGROUND_POSITION};
    overflow: auto;

    > div.o23-playground-editor-content {
        height: 100%;
    }
`;

export const ParseError = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-viewer-error'})`
    display: flex;
    position: relative;
    align-items: center;
    padding: 16px 32px;
    color: ${PlaygroundCssVars.EDITOR_ERROR_COLOR};
    font-size: 1.5em;
    font-style: italic;
    font-weight: 500;
`;