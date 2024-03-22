import {DOM_KEY_WIDGET, Utils} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {createDisableBadgesForWrapper, createEditorStyles} from './code-mirror-styles';

// noinspection CssUnusedSymbol
export const EditorWrapper = styled.div.attrs<{ editorSize?: number }>(
	({editorSize}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-playground-editor',
			style: {
				width: editorSize == null ? 'min(400px, 40vw)' : Utils.toCssSize(editorSize)
			}
		};
	})<{ editorSize?: number }>`
    display: grid;
    position: relative;
    align-self: stretch;
    grid-column: 2;
    grid-template-columns: 1fr;
    overflow: hidden;

    &[data-editor-badge=false] {
        ${createDisableBadgesForWrapper()}
    }
`;
// noinspection CssUnusedSymbol
export const EditorPanel = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-editor-panel'})`
    display: block;
    position: relative;
    width: 100%;
    align-self: stretch;
    overflow: hidden;

    ${createEditorStyles({badge: true})}
`;