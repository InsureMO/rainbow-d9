import {
	ExternalDefMismatchIndicator,
	ExternalDefsHandlerOptions,
	StandaloneRoot,
	useThrottler,
	VUtils
} from '@rainbow-d9/n1';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import {parseDoc} from '@rainbow-d9/n3';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {ViewerProps} from '../types';

// noinspection CssUnresolvedCustomProperty
export const ViewerWrapper = styled.div.attrs(() => {
	return {
		[DOM_KEY_WIDGET]: 'd9-playground-viewer',
		style: {}
	};
})`
    display: block;
    position: relative;
    align-self: stretch;
    grid-column: 3;
    grid-row: 1 / span 2;
    overflow: auto;

    > div[data-w=d9-page] {
        margin: 16px;
    }
`;
export const ParseError = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-viewer-error'})`
    display: flex;
    position: relative;
    align-items: center;
    padding: 16px 32px;
`;

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
		const onContentInitialized = (content?: string) => {
			setContent(content ?? '');
		};
		const onContentChanged = (content?: string) => {
			replace(() => setContent(content ?? ''), 500);
		};
		on(PlaygroundEventTypes.CONTENT_INITIALIZED, onContentInitialized);
		on(PlaygroundEventTypes.CONTENT_CHANGED, onContentChanged);
		return () => {
			off(PlaygroundEventTypes.CONTENT_INITIALIZED, onContentInitialized);
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
			<StandaloneRoot {...def} $root={mockData} externalDefs={enhancedExternalDefs}/>
		</ViewerWrapper>;
	} catch (error) {
		return <ViewerWrapper>
			<ParseError>{(error as Error).message || 'Parse error occurred.'}</ParseError>
		</ViewerWrapper>;
	}
};
