import {DOM_KEY_WIDGET, Utils} from '@rainbow-d9/n2';
import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from './widgets';

// noinspection CssUnresolvedCustomProperty
export const SideSlider = styled.div.attrs<{ active: boolean; left: number }>(
	({active, left}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-playground-side-slider',
			style: {
				left: active ? 0 : Utils.toCssSize(left),
				width: active ? '100%' : (void 0),
				'--handle-left': active ? Utils.toCssSize(left) : 0
			}
		};
	})<{ active: boolean; left: number }>`
    display: block;
    position: absolute;
    top: 0;
    height: 100%;
    cursor: ew-resize;
    z-index: 1;

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: var(--handle-left);
        width: 7px;
        height: 100%;
        transition: background-color 300ms ease-in-out;
    }

    &:hover {
        &:before {
            background-color: ${PlaygroundCssVars.SLIDER_BACKGROUND_COLOR};
        }
    }
`;

export interface PlaygroundSliderState {
	active: boolean;
	left?: number;
	startX?: number;
}

export const Slider = (props: { resizeTo: (width: number) => void }) => {
	const {resizeTo} = props;

	const ref = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<PlaygroundSliderState>({active: false});
	useEffect(() => {
		if (ref.current == null) {
			return;
		}
		const {
			width: editorWidth
		} = ref.current.parentElement.querySelector('div[data-w=d9-playground-editor]').getBoundingClientRect();
		setState(state => ({...state, left: editorWidth + 81}));
	}, []);

	const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		if (event.button === 0) {
			// respond to primary button only
			const {screenX: startX} = event;
			setState(state => ({...state, active: true, startX}));
		}
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onMouseUp = (_event: MouseEvent<HTMLDivElement>) => {
		setState(state => ({...state, active: false}));
	};
	const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		if (!state.active) {
			return;
		}
		const {screenX} = event;
		const newWidth = Math.min(800, Math.max(200, state.left - 81 - state.startX + screenX));
		resizeTo(newWidth);
		setState(state => ({...state, startX: screenX, left: newWidth + 81}));
	};

	return <SideSlider active={state.active} left={state.left ?? 0}
	                   onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}
	                   ref={ref}/>;
};