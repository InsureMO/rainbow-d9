import {
	ExternalDefMismatchIndicator,
	ExternalDefsHandlerOptions,
	StandaloneRoot,
	useThrottler,
	VUtils
} from '@rainbow-d9/n1';
import {parseDoc} from '@rainbow-d9/n3';
import React, {useEffect, useState} from 'react';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {ViewerProps} from '../types';
import {ErrorBoundary} from './error-boundary';
import {ParseError, ViewerWrapper} from './widgets';

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

export const Viewer = (props: ViewerProps) => {
	const {mockData, externalDefs} = props;

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
		return <ViewerWrapper>
			<ParseError>No configuration.</ParseError>
		</ViewerWrapper>;
	}

	try {
		const {node: def} = parseDoc(content);
		// noinspection JSUnusedGlobalSymbols
		const enhancedExternalDefs = {
			onDetermined: (options: ExternalDefsHandlerOptions) => {
				clearExternalDefs(options);
			},
			...(externalDefs ?? {})
		};
		return <ViewerWrapper>
			{/**
			 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
			 @ts-ignore */}
			<ErrorBoundary content={content}>
				<StandaloneRoot {...def} $root={mockData} externalDefs={enhancedExternalDefs}/>
			</ErrorBoundary>
		</ViewerWrapper>;
	} catch (error) {
		return <ViewerWrapper>
			<ParseError>{(error as Error).message || 'Parse error occurred.'}</ParseError>
		</ViewerWrapper>;
	}
};
