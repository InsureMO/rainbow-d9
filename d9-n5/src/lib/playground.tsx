import {BaseModel} from '@rainbow-d9/n1';
import {CssVars} from '@rainbow-d9/n2';
import React, {useRef} from 'react';
import styled from 'styled-components';
import {D9Editor} from './editor';
import {PlaygroundBridge} from './playground-bridge';
import {PlaygroundEventBusProvider} from './playground-event-bus';
import {D9PlaygroundProps} from './types';
import {D9Viewer} from './viewer';

// noinspection CssUnresolvedCustomProperty
export const D9PlaygroundWrapper = styled.div.attrs(() => {
	return {
		'data-w': 'd9-playground',
		style: {
			'--height': '500px',
			'--grid-columns': 'min(400px, 40%) 1fr'
		}
	};
})`
    display: grid;
    position: relative;
    grid-template-columns: var(--grid-columns);
    grid-template-rows: 1fr;
    min-height: var(--height);
    height: var(--height);
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    overflow: hidden;
`;

export const PlaygroundDelegate = (props: D9PlaygroundProps) => {
	const {
		content, onContentChanged, model,
		externalDefs, externalDefsTypes,
		...rest
	} = props;

	const modelRef = useRef<BaseModel>(model ?? {});

	return <D9PlaygroundWrapper {...rest}>
		<PlaygroundBridge onContentChanged={onContentChanged}/>
		<D9Editor content={content} externalDefsTypes={externalDefsTypes}/>
		<D9Viewer model={modelRef.current} externalDefs={externalDefs}/>
	</D9PlaygroundWrapper>;
};

export const D9Playground = (props: D9PlaygroundProps) => {
	return <PlaygroundEventBusProvider>
		<PlaygroundDelegate {...props}/>
	</PlaygroundEventBusProvider>;
};