import {DOM_KEY_WIDGET, Utils} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {EditorContainer} from '../code-editor';

export const JsEditorContainer = styled(EditorContainer).attrs(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	({'data-height': height}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-js-editor',
			style: {
				'--height': Utils.toCssSize(height ?? 300)
			}
		};
	})``;
