import {CssVars} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../../../../widgets';

// noinspection CssUnresolvedCustomProperty
export const SubNodesPortContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: calc(-1 * ${PlaygroundCssVars.NODE_PORT_BORDER_WIDTH});
    right: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / -2 - ${PlaygroundCssVars.NODE_BORDER_WIDTH});
    width: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    background-color: var(--background-color);
    border: var(--border);
    border-top-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    transition: width ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, right ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-fold=true], &:hover {
        right: calc(0px - ${PlaygroundCssVars.NODE_PORT_HEIGHT} - ${PlaygroundCssVars.NODE_BORDER_WIDTH});
        width: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT});

        > svg:first-child {
            width: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
            opacity: 1;
        }
    }

    > svg:first-child {
        height: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
        width: 0;
        opacity: 0;
        color: var(--icon-color);
        overflow: hidden;
        transition: width ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

        &[data-icon=o23-fold-sub-nodes] {
            margin-left: -4px;
        }

        &[data-icon=o23-unfold-sub-nodes] {
            margin-left: -3px;
        }
    }

    > div:last-child {
        position: absolute;
        top: 0;
        left: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
        width: 0;
        height: 100%;
    }
`;
