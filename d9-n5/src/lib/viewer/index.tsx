import {
	ExternalDefMismatchIndicator,
	ExternalDefsHandlerOptions,
	NodeDef,
	StandaloneRoot,
	useThrottler,
	VUtils
} from '@rainbow-d9/n1';
import {NodeDefExt, parseDoc} from '@rainbow-d9/n3';
import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {ViewerProps} from '../types';
import {PLAYGROUND_WIDGET_WRAPPER} from '../widget-wrapper';
import {ErrorBoundary} from './error-boundary';
import {ParseError, ViewerWrapper, WidgetWrapper} from './widgets';

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

export const ViewerKernel = (props: ViewerProps & { content: string }) => {
	const {mockData, externalDefs, minViewerWidth, content} = props;

	const vwRef = useRef<HTMLDivElement>(null);
	const wwRef = useRef<HTMLDivElement>(null);
	const {replace, clear} = useThrottler();
	const {fire} = usePlaygroundEventBus();

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
			clear(false);
		};
		const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
			let target = event.target as HTMLElement;
			const forPlayground = target.getAttribute('data-for-playground');
			if (forPlayground !== 'true') {
				target = target.closest('[data-for-playground]');
			}
			if (target != null) {
				const widgetType = target.getAttribute('data-w');
				if (widgetType === 'd9-page') {
					clearLocator();
					return;
				}
				const vw = vwRef.current.getBoundingClientRect();
				const elm = target.getBoundingClientRect();

				const ww = wwRef.current;
				ww.style.top = `${elm.top - vw.top - 2}px`;
				ww.style.left = `${elm.left - vw.left - 2}px`;
				ww.style.width = `${elm.width + 4}px`;
				ww.style.height = `${elm.height + 4}px`;
				ww.style.opacity = '1';

				const $key = target.getAttribute('data-for-playground-key');
				if (ww.getAttribute('data-current-for-playground-key') !== $key
					|| ww.getAttribute('data-current-w') !== widgetType) {
					ww.setAttribute('data-current-for-playground-key', $key);
					ww.setAttribute('data-current-w', widgetType);
					replace(() => ww.setAttribute('data-view-anchor', 'true'), 300);
				}
			}
		};
		const onMouseLeave = () => clearLocator();
		const onLocateClicked = () => {
			const ww = wwRef.current;
			const $key = ww.getAttribute('data-current-for-playground-key');
			const widgetType = ww.getAttribute('data-current-w');
			fire(PlaygroundEventTypes.ASK_NODE_DEF, $key, widgetType, (def: NodeDef & NodeDefExt) => {
				console.log(def);
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
		                      ref={vwRef}>
			<WidgetWrapper ref={wwRef}/>
			{/**
			 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
			 @ts-ignore */}
			<ErrorBoundary content={content}>
				<StandaloneRoot {...def} $root={mockData} externalDefs={enhancedExternalDefs}/>
			</ErrorBoundary>
		</ViewerWrapper>;
	} catch (error) {
		return <ViewerWrapper minViewerWidth={minViewerWidth}>
			<ParseError>{(error as Error).message || 'Parse error occurred.'}</ParseError>
		</ViewerWrapper>;
	}
};

export const Viewer = (props: ViewerProps) => {
	const {minViewerWidth} = props;

	const {on, off} = usePlaygroundEventBus();
	const {replace} = useThrottler();
	const [content, setContent] = useState('');
	useEffect(() => {
		const onContentChanged = (content?: string) => {
			replace(() => setContent(content ?? ''), 500);
		};
		on(PlaygroundEventTypes.CONTENT_CHANGED, onContentChanged);
		return () => {
			off(PlaygroundEventTypes.CONTENT_CHANGED, onContentChanged);
		};
	}, [on, off, replace]);

	if (VUtils.isBlank(content)) {
		return <ViewerWrapper minViewerWidth={minViewerWidth}>
			<ParseError>No configuration.</ParseError>
		</ViewerWrapper>;
	}

	return <ViewerKernel {...props} content={content}/>;
};
