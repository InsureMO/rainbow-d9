import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from '../constants';
import {toCssSize} from '../utils';

// noinspection CssUnresolvedCustomProperty
export const ATree = styled.div.attrs<{ height: number | string }>(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	({id, 'data-w': dataW, height}) => {
		return {
			[DOM_KEY_WIDGET]: dataW || 'd9-tree',
			[DOM_ID_WIDGET]: id,
			'data-v-scroll': '',
			'data-h-scroll': '',
			style: {height: toCssSize(height)}
		};
	})<{ height: number | string }>`
    display: flex;
    position: relative;
    flex-direction: column;
    align-self: start;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    overflow: auto;

    &[data-visible=false] {
        display: none;
    }
`;
export const TreeNodeWrapper = styled.div.attrs<{ level: number }>(
	{'data-w': 'd9-tree-node-wrapper'})<{ level: number }>`
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

    &:hover {
        background-color: ${CssVars.HOVER_COLOR};
    }

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
export const TreeNodeContainer = styled(TreeNode).attrs({'data-w': 'd9-tree-node-container'})`
    padding-right: 16px;
    cursor: pointer;

    &[data-expanded=true] {
        > svg:first-child {
            transform: rotateZ(90deg);
        }
    }

    &[data-expanded=false] ~ * {
        display: none;
    }
`;
export const TreeNodeContent = styled.span.attrs({'data-w': 'd9-tree-node-content'})`
    display: flex;
    position: relative;
    flex-grow: 1;
    align-items: center;
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
export const TreeNodeToggle = styled.span.attrs({'data-w': 'd9-tree-node-toggle'})`
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
export const TreeNodeIndex = styled.span.attrs({'data-w': 'd9-tree-node-index'})`
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
export const TreeNodeLabel = styled.span.attrs({'data-w': 'd9-tree-node-label'})`
    display: flex;
    position: relative;
    align-items: center;

    &:first-child {
        padding-left: 9px;
    }
`;
