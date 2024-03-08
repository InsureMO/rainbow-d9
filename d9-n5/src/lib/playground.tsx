import {BaseModel, ExternalDefs, MUtils, NodeAttributeValues, PPUtils, PropValue, VUtils} from '@rainbow-d9/n1';
import {CssVars, DOM_KEY_WIDGET, useGlobalHandlers, Utils} from '@rainbow-d9/n2';
import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Editor} from './editor';
import {Help} from './help';
import {PlaygroundBridge} from './playground-bridge';
import {PlaygroundEventBusProvider, PlaygroundEventTypes, usePlaygroundEventBus} from './playground-event-bus';
import {Toolbar} from './toolbar';
import {ExternalDefsTypes, PlaygroundProps, UnwrappedPlaygroundProps} from './types';
import {Viewer} from './viewer';
import {PlaygroundCssVars} from './widgets';

// noinspection CssUnresolvedCustomProperty
export const PlaygroundWrapper = styled.div.attrs<{ editorSize?: number }>(
	({editorSize}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-playground',
			style: {
				'--min-height': '500px',
				'--grid-columns': `auto ${editorSize != null ? Utils.toCssSize(editorSize) : 'min(400px, 40%)'} 1fr`,
				'--grid-rows': '1fr auto'
			}
		};
	})<{ editorSize?: number }>`
    display: grid;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    grid-template-columns: var(--grid-columns);
    grid-template-rows: var(--grid-rows);
    min-height: var(--min-height);
    height: var(--min-height);
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    overflow: hidden;

    &[data-maximized=true]:not([data-visible=false]) {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: ${CssVars.BACKGROUND_COLOR};
        border: 0;
        border-radius: 0;
        z-index: ${PlaygroundCssVars.Z_INDEX};
    }

    &[data-visible=false] {
        display: none;
    }
`;

export interface PlaygroundState {
	initialized: boolean;
	maximized: boolean;
}

export interface PlaygroundLayoutState {
	editorSize?: number;
}

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

export const PlaygroundDelegate = (props: PlaygroundProps) => {
	const {
		$pp, $wrapped,
		mockData,
		externalDefs, externalDefsTypes,
		...rest
	} = props;
	const {$p2r, $onValueChange, $avs: {$disabled, $visible}} = $wrapped;

	const {on, off} = usePlaygroundEventBus();
	const ref = useRef<HTMLDivElement>(null);
	const mockDataRef = useRef<BaseModel>(null);
	const externalDefRef = useRef<ExternalDefs>(null);
	const externalDefsTypesRef = useRef<ExternalDefsTypes>(null);
	const globalHandlers = useGlobalHandlers();
	const [state, setState] = useState<PlaygroundState>({
		initialized: false, maximized: false
	});
	const [layout, setLayout] = useState<PlaygroundLayoutState>({});
	useEffect(() => {
		if (!state.initialized || ref.current == null) {
			return;
		}
		const editor = ref.current!.querySelector('div[data-w=d9-playground-editor]');
		const {width} = editor!.getBoundingClientRect();
		setLayout({editorSize: width});
	}, [state.initialized]);
	useEffect(() => {
		if (state.initialized) {
			return;
		}

		(async () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const ask = <T = any>(given: T | (() => Promise<T>), defaultValue?: T) => async (): Promise<T | undefined> => {
				let ret: T;
				if (typeof given === 'function') {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					ret = await given();
				} else {
					ret = given;
				}
				return ret ?? defaultValue;
			};
			const [mock, defs, types] = await Promise.all([
				ask(mockData, {})(), ask(externalDefs)(), ask(externalDefsTypes)()
			]);
			mockDataRef.current = mock;
			externalDefRef.current = defs;
			externalDefsTypesRef.current = types;
			setState(state => ({...state, initialized: true}));
		})();
	}, [state.initialized, mockData, externalDefs, externalDefsTypes]);
	useEffect(() => {
		const onMaximize = () => setState(state => ({...state, maximized: true}));
		const onQuitMaximize = () => setState(state => ({...state, maximized: false}));
		const onZen = () => {
			document.documentElement.requestFullscreen && document.documentElement.requestFullscreen({navigationUI: 'hide'});
			onMaximize();
		};
		const onQuitZen = () => {
			onQuitMaximize();
			document.exitFullscreen && document.exitFullscreen();
		};
		const onFullScreenChanged = () => {
			if (document.fullscreenElement == null) {
				onQuitMaximize();
			}
		};
		window.addEventListener('fullscreenchange', onFullScreenChanged);
		on(PlaygroundEventTypes.MAXIMIZE, onMaximize);
		on(PlaygroundEventTypes.QUIT_MAXIMIZE, onQuitMaximize);
		on(PlaygroundEventTypes.ZEN, onZen);
		on(PlaygroundEventTypes.QUIT_ZEN, onQuitZen);
		return () => {
			window.removeEventListener('fullscreenchange', onFullScreenChanged);
			off(PlaygroundEventTypes.MAXIMIZE, onMaximize);
			off(PlaygroundEventTypes.QUIT_MAXIMIZE, onQuitMaximize);
			off(PlaygroundEventTypes.ZEN, onZen);
			off(PlaygroundEventTypes.QUIT_ZEN, onQuitZen);
		};
	}, [on, off]);

	if (!state.initialized) {
		return null;
	}

	const onContentChanged = async (content?: string) => {
		await $onValueChange(content, false, {global: globalHandlers});
	};
	const content = MUtils.getValue($wrapped.$model, $pp) as unknown as string;
	const resizeTo = (width: number) => setLayout({editorSize: width});

	return <PlaygroundWrapper {...rest} data-disabled={$disabled} data-visible={$visible}
	                          data-maximized={state.maximized} editorSize={layout.editorSize}
	                          id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
	                          ref={ref}>
		<PlaygroundBridge onContentChanged={onContentChanged}/>
		<Toolbar/>
		<Editor content={content} externalDefsTypes={externalDefsTypesRef.current}/>
		<Help/>
		<Viewer mockData={mockDataRef.current!} externalDefs={externalDefRef.current}/>
		<Slider resizeTo={resizeTo}/>
	</PlaygroundWrapper>;
};

export const Playground = (props: PlaygroundProps) => {
	return <PlaygroundEventBusProvider>
		<PlaygroundDelegate {...props}/>
	</PlaygroundEventBusProvider>;
};

export const UnwrappedPlayground = (props: UnwrappedPlaygroundProps) => {
	const {disabled, visible, onValueChange, ...rest} = props;

	const $onValueChange = (content?: PropValue) => {
		onValueChange && onValueChange(content as string);
	};
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {};

	return <Playground {...rest}
	                   $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                   id={rest.id ?? VUtils.generateUniqueId()}/>;
};
