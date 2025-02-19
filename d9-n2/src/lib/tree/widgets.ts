import {CSSProperties} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from '../constants';
import {SDP, WSDP} from '../styled-components-styles';
import {UnwrappedDecorateInput} from '../unwrapped/decorate-input';
import {toCssSize} from '../utils';

// noinspection CssUnresolvedCustomProperty
export const ATree = styled.div.attrs<WSDP<{ height: number | string }>>(
	({id, [DOM_KEY_WIDGET]: dataW, height}) => {
		return {
			[DOM_KEY_WIDGET]: dataW || 'd9-tree',
			[DOM_ID_WIDGET]: id,
			style: {'--height': toCssSize(height)} as CSSProperties
		};
	})<{ height: number | string }>`
    display: flex;
    position: relative;
    flex-direction: column;
    align-self: start;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    height: var(--height);
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    overflow: hidden;

    &[data-visible=false] {
        display: none;
    }
`;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const TreeSearchInput = styled(UnwrappedDecorateInput)`
    min-height: ${CssVars.INPUT_HEIGHT};
    background-color: ${CssVars.BACKGROUND_COLOR};
    border-top-left-radius: ${CssVars.BORDER_RADIUS};
    border-top-right-radius: ${CssVars.BORDER_RADIUS};
    border-bottom: ${CssVars.BORDER};
    overflow: hidden;
    transition: border-bottom-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-visible=false] {
        height: 0;
        min-height: 0;
        border-bottom: 0;
    }

    &:focus-within {
        border-bottom-color: ${CssVars.PRIMARY_COLOR};
    }

    > span[data-w=d9-deco-lead] {
        border-top: 0;
        border-left: 0;
        border-bottom: 0;
        border-bottom-left-radius: 0;

        > svg {
            opacity: 0.3;
            height: calc(${CssVars.FONT_SIZE} * 0.9);
            width: calc(${CssVars.FONT_SIZE} * 0.9);
        }
    }

    > input[data-w=d9-input] {
        border: 0;
        border-bottom-right-radius: 0;

        &:hover, &:focus {
            box-shadow: none;
        }
    }
`;
export const TreeContentContainer = styled.div.attrs<SDP>({
	[DOM_KEY_WIDGET]: 'd9-tree-content-container',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
    display: flex;
    position: relative;
    flex-grow: 1;
    flex-direction: column;
    align-self: stretch;
    border-bottom-left-radius: ${CssVars.BORDER_RADIUS};
    border-bottom-right-radius: ${CssVars.BORDER_RADIUS};
    overflow: auto;
`;
export const TreeNodeWrapper = styled.div.attrs<WSDP<{ level: number }>>(
	{[DOM_KEY_WIDGET]: 'd9-tree-node-wrapper'})<{ level: number }>`
    display: flex;
    position: relative;
    flex-direction: column;

    &[data-last-of-parent=false]:after {
        content: '';
        display: ${({level}) => level === 0 ? 'none' : 'block'};
        position: absolute;
        top: 0;
        left: ${({level}) => 13.5 + 20 * (level - 1)}px;
        width: 1px;
        height: 100%;
        background-color: ${CssVars.TREE_LINE_COLOR};
    }
`;
const TreeNode = styled.div.attrs<{ level: number }>({})<{ level: number }>`
    display: flex;
    position: relative;
    height: ${CssVars.INPUT_HEIGHT};
    min-height: ${CssVars.INPUT_HEIGHT};
    padding-left: ${({level}) => 20 * level}px;
    align-items: center;
    white-space: nowrap;

    &:before {
        content: '';
        display: ${({level}) => level === 0 ? 'none' : 'block'};
        position: absolute;
        top: 0;
        left: ${({level}) => 13.5 + 20 * (level - 1)}px;
        width: 8px;
        height: 50%;
        border-left: 1px solid ${CssVars.TREE_LINE_COLOR};
        border-bottom: 1px solid ${CssVars.TREE_LINE_COLOR};
        border-bottom-left-radius: 4px;
    }
`;
export const TreeNodeContainer = styled(TreeNode).attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-tree-node-container'})`
    cursor: pointer;

    &[data-expanded=true] {
        > svg:first-child {
            transform: rotateZ(90deg);
        }
    }

    &[data-expanded=false] ~ *:not(div[data-w=d9-tree-node-operators]) {
        display: none;
    }
`;
// noinspection CssUnresolvedCustomProperty
export const TreeNodeOperators = styled.div.attrs<{ top: number; right: number }>(({top, right}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-tree-node-operators',
		style: {
			'--top': `${top}px`,
			'--right': `${right}px`
		} as CSSProperties
	};
})<{ top: number; right: number }>`
    display: flex;
    position: fixed;
    top: var(--top);
    right: var(--right);
    margin-right: 8px;
    align-items: center;
    background-color: ${CssVars.BACKGROUND_COLOR};
    border-radius: ${CssVars.BORDER_RADIUS};
    opacity: 1;
    z-index: ${CssVars.DROPDOWN_Z_INDEX};
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-visible=false] {
        opacity: 0;
        pointer-events: none;
        user-select: none;
        transition: none;
    }

    &:hover > button {
        opacity: 1;
    }

    > button {
        height: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
        opacity: 0.3;
        transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

        &:first-child {
            border-top-left-radius: calc(${CssVars.INPUT_HEIGHT} * 3 / 8);
            border-bottom-left-radius: calc(${CssVars.INPUT_HEIGHT} * 3 / 8);
        }

        &:last-child {
            border-top-right-radius: calc(${CssVars.INPUT_HEIGHT} * 3 / 8);
            border-bottom-right-radius: calc(${CssVars.INPUT_HEIGHT} * 3 / 8);
        }

        &:not(:last-child) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        &:not(:first-child) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            overflow: visible;

            &:before {
                content: '';
                display: block;
                position: absolute;
                top: 20%;
                left: -1px;
                height: 60%;
                width: 1px;
                background-color: ${CssVars.INVERT_COLOR};
            }
        }

        &:hover {
            z-index: 1;
        }

        > span[data-w=d9-deco-lead] {
            height: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
            min-width: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
            padding: 0;

            > svg {
                height: calc(${CssVars.FONT_SIZE} * 0.8);
                width: calc(${CssVars.FONT_SIZE} * 0.8);
            }
        }
    }
`;
export const TreeNodeContent = styled.span.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-tree-node-content'})`
    display: flex;
    position: relative;
    flex-grow: 1;
    align-items: center;
    align-self: stretch;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};

    &[data-operator=true] {
        text-decoration: underline;
        font-size: 0.8em;
        color: ${CssVars.PRIMARY_COLOR};
        opacity: 0.7;
    }
`;
export const TreeNodeToggle = styled.span.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-tree-node-toggle'})`
    display: inline-block;
    width: 28px;
    height: 28px;
    margin-left: 0;

    &[data-expanded=true] > svg:first-child {
        transform: rotate(90deg);
    }

    > svg:first-child {
        height: 12px;
        width: 12px;
        margin: 8px;
        fill: ${CssVars.FONT_COLOR};
        transition: transform ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;
export const TreeNodeIndex = styled.span.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-tree-node-index'})`
    display: flex;
    position: relative;
    align-items: center;
    margin-right: 8px;
    font-weight: 500;
    font-size: 0.8em;

    &:first-child {
        padding-left: 9px;
    }
`;
export const TreeNodeLabel = styled.span.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-tree-node-label'})`
    display: flex;
    position: relative;
    align-items: center;
    align-self: stretch;

    &:first-child {
        padding-left: 9px;
    }
`;
// noinspection CssUnresolvedCustomProperty
export const TreeHoverShade = styled.div.attrs<{ top: number; height: number; visible: boolean }>(
	({top, height, visible}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-tree-node-hover-shade',
			style: {
				'--top': toCssSize(top), '--height': toCssSize(height), '--visible': visible ? 'block' : 'none'
			} as CSSProperties
		};
	})<{ top: number; height: number; visible: boolean }>`
    display: var(--visible);
    position: absolute;
    background-color: ${CssVars.HOVER_COLOR};
    top: var(--top);
    left: 0;
    width: 100%;
    height: var(--height);
    user-select: none;
    pointer-events: none;
    z-index: -1;
`;