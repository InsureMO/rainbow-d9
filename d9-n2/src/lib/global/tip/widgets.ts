import {VUtils} from '@rainbow-d9/n1';
import styled from 'styled-components';
import {CssVars, DOM_KEY_WIDGET} from '../../constants';
import {toCssSize} from '../../utils';

// noinspection CssUnresolvedCustomProperty
export const TipContainer = styled.div.attrs<{
	visible: boolean;
	minWidth?: string | number; maxWidth?: string | number; maxHeight?: string | number;
	tag?: string;
	top?: number; left?: number;
}>(
	({visible, minWidth, maxWidth, maxHeight, tag, top, left}) => {
		const shown = visible === true && top != null && left != null;
		return {
			[DOM_KEY_WIDGET]: 'd9-tip',
			...(VUtils.isNotBlank(tag) ? {[tag]: ''} : {}),
			style: {
				'--min-width': toCssSize(minWidth),
				'--max-width': toCssSize(maxWidth),
				'--max-height': toCssSize(maxHeight),
				'--top': toCssSize(top),
				'--left': toCssSize(left),
				opacity: shown ? 1 : 0,
				pointerEvents: shown ? 'auto' : 'none'
			}
		};
	})<{
	visible: boolean;
	minWidth?: string | number; maxWidth?: string | number; maxHeight?: string | number;
	tag?: string;
	top?: number; left?: number;
}>`
    display: grid;
    position: fixed;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    min-width: var(--min-width);
    max-width: var(--max-width);
    max-height: var(--max-height);
    top: var(--top);
    left: var(--left);
    background-color: ${CssVars.BACKGROUND_COLOR};
    border: ${CssVars.TIP_BORDER};
    border-radius: ${CssVars.TIP_BORDER_RADIUS};
    box-shadow: ${CssVars.TIP_SHADOW};
    z-index: ${CssVars.TIP_Z_INDEX};
    overflow: hidden;
`;
export const TipHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-tip-header'})`
    display: flex;
    position: relative;
    align-items: center;
    height: ${CssVars.TIP_HEADER_HEIGHT};
    min-height: ${CssVars.TIP_HEADER_HEIGHT};
    border-bottom: ${CssVars.TIP_HEADER_BORDER};
`;
export const TipTitle = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-tip-header-title'})`
    display: flex;
    position: relative;
    align-items: center;
    flex-grow: 1;
    font-family: ${CssVars.CAPTION_FONT_FAMILY};
    font-size: ${CssVars.TIP_HEADER_FONT_SIZE};
    font-weight: ${CssVars.TIP_HEADER_FONT_WEIGHT};
    color: ${CssVars.CAPTION_FONT_COLOR};
    padding: 0 ${CssVars.TIP_HEADER_PADDING};
`;
export const TipBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-tip-body'})`
    display: flex;
    position: relative;
    padding: 0 ${CssVars.TIP_BODY_PADDING};
`;
export const TipLabel = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-tip-label'})`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${CssVars.INPUT_HEIGHT};
    line-height: ${CssVars.LINE_HEIGHT};
    padding: calc((${CssVars.INPUT_HEIGHT} - ${CssVars.LINE_HEIGHT}) / 2) 0;
`;
