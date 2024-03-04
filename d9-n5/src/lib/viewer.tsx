import {
	ExternalDefMismatchIndicator,
	ExternalDefsHandlerOptions,
	StandaloneRoot,
	useThrottler,
	VUtils
} from '@rainbow-d9/n1';
import {parseDoc} from '@rainbow-d9/n3';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {PlaygroundEventTypes, usePlaygroundEventBus} from './playground-event-bus';
import {D9ViewerProps} from './types';

// noinspection CssUnresolvedCustomProperty
export const D9ViewerWrapper = styled.div.attrs(() => {
	return {
		'data-w': 'd9-playground-viewer',
		style: {}
	};
})`
    display: block;
    position: relative;
    align-self: stretch;
    overflow: auto;

    > div[data-w=d9-page] {
        margin: 16px;
    }
`;
export const ParseError = styled.div.attrs({'data-w': 'd9-playground-viewer-error'})`
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

export const D9Viewer = (props: D9ViewerProps) => {
	const {model, externalDefs} = props;

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

	try {
		const {node: def} = parseDoc(content);
		// noinspection JSUnusedGlobalSymbols
		const enhancedExternalDefs = {
			onDetermined: (options: ExternalDefsHandlerOptions) => {
				clearExternalDefs(options);
			},
			...(externalDefs ?? {})
		};
		return <D9ViewerWrapper>
			<StandaloneRoot {...def} $root={model} externalDefs={enhancedExternalDefs}/>
		</D9ViewerWrapper>;
	} catch (error) {
		return <D9ViewerWrapper>
			<ParseError>{(error as Error).message || 'Parse error occurred.'}</ParseError>
		</D9ViewerWrapper>;
	}
};
