import {BaseModel, ExternalDefs, MUtils, NodeAttributeValues, PPUtils, PropValue, VUtils} from '@rainbow-d9/n1';
import {CssVars, useGlobalHandlers} from '@rainbow-d9/n2';
import React, {ForwardedRef, forwardRef, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {D9Editor} from './editor';
import {Help} from './help';
import {PlaygroundBridge} from './playground-bridge';
import {PlaygroundEventBusProvider} from './playground-event-bus';
import {D9Toolbar} from './toolbar';
import {D9PlaygroundProps, ExternalDefsTypes, UnwrappedPlaygroundProps} from './types';
import {D9Viewer} from './viewer';

// noinspection CssUnresolvedCustomProperty
export const D9PlaygroundWrapper = styled.div.attrs(() => {
	return {
		'data-w': 'd9-playground',
		style: {
			'--height': '500px',
			'--grid-columns': 'auto min(400px, 40%) 1fr',
			'--grid-rows': '1fr auto'
		}
	};
})`
    display: grid;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    grid-template-columns: var(--grid-columns);
    grid-template-rows: var(--grid-rows);
    min-height: var(--height);
    height: var(--height);
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    overflow: hidden;

    &[data-visible=false] {
        display: none;
    }
`;

export interface PlaygroundState {
	initialized: boolean;
}

export const PlaygroundDelegate = forwardRef((props: D9PlaygroundProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		$pp, $wrapped,
		mockData,
		externalDefs, externalDefsTypes,
		...rest
	} = props;
	const {$p2r, $onValueChange, $avs: {$disabled, $visible}} = $wrapped;

	const mockDataRef = useRef<BaseModel>(null);
	const externalDefRef = useRef<ExternalDefs>(null);
	const externalDefsTypesRef = useRef<ExternalDefsTypes>(null);
	const globalHandlers = useGlobalHandlers();
	const [state, setState] = useState<PlaygroundState>({initialized: false});
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
			setState({initialized: true});
		})();
	}, [state.initialized, mockData, externalDefs, externalDefsTypes]);

	if (!state.initialized) {
		return null;
	}

	const onContentChanged = async (content?: string) => {
		await $onValueChange(content, false, {global: globalHandlers});
	};
	const content = MUtils.getValue($wrapped.$model, $pp) as unknown as string;

	return <D9PlaygroundWrapper {...rest} data-disabled={$disabled} data-visible={$visible}
	                            id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
	                            ref={ref}>
		<PlaygroundBridge onContentChanged={onContentChanged}/>
		<D9Toolbar/>
		<D9Editor content={content} externalDefsTypes={externalDefsTypesRef.current}/>
		<Help/>
		<D9Viewer mockData={mockDataRef.current!} externalDefs={externalDefRef.current}/>
	</D9PlaygroundWrapper>;
});

export const D9Playground = forwardRef((props: D9PlaygroundProps, ref: ForwardedRef<HTMLDivElement>) => {
	return <PlaygroundEventBusProvider>
		<PlaygroundDelegate {...props} ref={ref}/>
	</PlaygroundEventBusProvider>;
});

export const UnwrappedD9Playground = forwardRef((props: UnwrappedPlaygroundProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {disabled, visible, onValueChange, ...rest} = props;

	const $onValueChange = (content?: PropValue) => {
		onValueChange && onValueChange(content as string);
	};
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {};

	return <D9Playground {...rest}
	                     $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                     id={rest.id ?? VUtils.generateUniqueId()}
	                     ref={ref}/>;
});
