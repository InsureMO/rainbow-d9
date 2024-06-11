import {
	ExternalDefMismatchIndicator,
	ExternalDefsHandlerOptions,
	NodeDef,
	StandaloneRoot,
	useForceUpdate,
	useThrottler,
	VUtils
} from '@rainbow-d9/n1';
import {ButtonFill, ButtonInk, IntlLabel, UnwrappedButton} from '@rainbow-d9/n2';
import {NodeDefExt, parseDoc} from '@rainbow-d9/n3';
import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import {PlaygroundIcons} from '../icons';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {ViewerProps} from '../types';
import {PLAYGROUND_WIDGET_WRAPPER} from '../widget-wrapper';
import {ErrorBoundary} from './error-boundary';
import {ParseError, ViewerWrapper, WidgetWrapper, WidgetWrapperToolbar} from './widgets';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const clearExternalDefs = (opts: any) => {
	if (opts == null || VUtils.isPrimitive(opts) || typeof opts === 'function') {
		// do nothing
	} else if (Array.isArray(opts)) {
		opts.forEach(clearExternalDefs);
	} else if (typeof opts === 'object') {
		Object.keys(opts).forEach(key => {
			const value = opts[key];
			if (value instanceof ExternalDefMismatchIndicator) {
				delete opts[key];
			} else {
				clearExternalDefs(value);
			}
		});
	}
};

export const ViewerToolbarButton = (props: { icon: PlaygroundIcons | string; click: () => void }) => {
	const {icon, click, ...rest} = props;

	const onClicked = () => click();

	return <UnwrappedButton ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN}
	                        onClick={onClicked} leads={[`$icons.${icon}`]} {...rest}/>;
};

export interface ViewerKernelState {
	locator: boolean;
}

export const ViewerKernel = (props: ViewerProps & { content: string }) => {
	const {mockData, externalDefs, minViewerWidth, content} = props;

	const vwRef = useRef<HTMLDivElement>(null);
	const wwRef = useRef<HTMLDivElement>(null);
	const wwtRef = useRef<HTMLDivElement>(null);
	const {replace, clear} = useThrottler();
	const {on, off, fire} = usePlaygroundEventBus();
	const forceUpdate = useForceUpdate();
	const [state, setState] = useState<ViewerKernelState>({locator: true});
	useEffect(() => {
		const onSwitchViewerWrapper = (wrapper: { locator: boolean }) => setState(state => ({
			...state, locator: wrapper.locator
		}));
		on(PlaygroundEventTypes.SWITCH_VIEWER_WRAPPER, onSwitchViewerWrapper);
		return () => {
			off(PlaygroundEventTypes.SWITCH_VIEWER_WRAPPER, onSwitchViewerWrapper);
		};
	}, [on, off]);
	useEffect(() => {
		const onForceUpdateViewer = () => {
			forceUpdate();
		};
		on(PlaygroundEventTypes.FORCE_UPDATE_VIEWER, onForceUpdateViewer);
		return () => {
			off(PlaygroundEventTypes.FORCE_UPDATE_VIEWER, onForceUpdateViewer);
		};
	}, [on, off, forceUpdate]);

	try {
		const {
			node: def, success, error
		} = parseDoc(content, {keepMd: true, forPlayground: PLAYGROUND_WIDGET_WRAPPER});
		if (!success) {
			// noinspection ExceptionCaughtLocallyJS
			throw typeof error === 'string' ? new Error(error) : (error ?? new Error('Unpredicted parse error occurred.'));
		}

		const clearLocator = () => {
			const ww = wwRef.current;
			ww.style.top = '';
			ww.style.left = '';
			ww.style.width = '';
			ww.style.height = '';
			ww.style.opacity = '0';
			ww.removeAttribute('data-view-anchor');
			clear(false);
		};
		const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
			if (!state.locator) {
				return;
			}
			let target = event.target as HTMLElement;
			const forPlayground = target.getAttribute('data-for-playground');
			if (forPlayground !== 'true') {
				target = target.closest('[data-for-playground]');
			}
			if (target != null) {
				const widgetType = target.getAttribute('data-w');
				if (widgetType === 'd9-page') {
					clearLocator();
				} else {
					const vwRect = vwRef.current.getBoundingClientRect();
					const vwScrollTop = vwRef.current.scrollTop;
					const vwScrollLeft = vwRef.current.scrollLeft;
					const targetRect = target.getBoundingClientRect();

					const ww = wwRef.current;
					ww.style.top = `${targetRect.top - vwRect.top + vwScrollTop - 2}px`;
					ww.style.left = `${targetRect.left - vwRect.left + vwScrollLeft - 4}px`;
					ww.style.width = `${targetRect.width + 8}px`;
					ww.style.height = `${targetRect.height + 4}px`;
					ww.style.opacity = '1';
					replace(() => ww.setAttribute('data-view-anchor', 'true'), 300);
					const wwt = wwtRef.current;
					wwt.style.bottom = `${window.innerHeight - targetRect.top}px`;
					wwt.style.left = `${targetRect.left - 4}px`;

					const $key = target.getAttribute('data-for-playground-key');
					if (ww.getAttribute('data-current-for-playground-key') !== $key
						|| ww.getAttribute('data-current-w') !== widgetType) {
						ww.setAttribute('data-current-for-playground-key', $key);
						ww.setAttribute('data-current-w', widgetType);
					}
				}
			} else {
				clearLocator();
			}
		};
		const onMouseLeave = () => {
			if (!state.locator) {
				return;
			}
			clearLocator();
		};
		const onScroll = () => {
			if (!state.locator) {
				return;
			}
			clearLocator();
		};
		const onToolbarMouseMove = (event: MouseEvent<HTMLDivElement>) => {
			event.stopPropagation();
			event.preventDefault();
		};
		const onLocateClicked = () => {
			const ww = wwRef.current;
			const $key = ww.getAttribute('data-current-for-playground-key');
			const widgetType = ww.getAttribute('data-current-w');
			fire(PlaygroundEventTypes.ASK_NODE_DEF, $key, widgetType, (def: NodeDef & NodeDefExt) => {
				const {preparsed} = def;
				if (preparsed == null) {
					return;
				}
				const {content: {position: {start: {line}}}} = preparsed;
				fire(PlaygroundEventTypes.LOCATE_LINE, line);
			});
		};

		// noinspection JSUnusedGlobalSymbols
		const enhancedExternalDefs = {
			onDetermined: (options: ExternalDefsHandlerOptions) => {
				clearExternalDefs(options);
			},
			...(externalDefs ?? {})
		};

		return <ViewerWrapper minViewerWidth={minViewerWidth}
		                      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
		                      onScroll={onScroll}
		                      ref={vwRef}>
			{state.locator
				? <>
					<WidgetWrapper ref={wwRef}/>
					<WidgetWrapperToolbar onMouseMove={onToolbarMouseMove} ref={wwtRef}>
						<ViewerToolbarButton icon={PlaygroundIcons.LOCATE} click={onLocateClicked}/>
					</WidgetWrapperToolbar>
				</>
				: null}
			{/**
			 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
			 @ts-ignore */}
			<ErrorBoundary content={content}>
				<StandaloneRoot {...def} $root={mockData} externalDefs={enhancedExternalDefs}/>
			</ErrorBoundary>
		</ViewerWrapper>;
	} catch (error) {
		return <ViewerWrapper minViewerWidth={minViewerWidth}>
			<ParseError>
				{(error as Error).message ||
					<IntlLabel keys={['playground', 'error', 'parse']} value="Parse error occurred."/>}
			</ParseError>
		</ViewerWrapper>;
	}
};