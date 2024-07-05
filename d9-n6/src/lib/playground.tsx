import {MUtils, NodeAttributeValues, ObjectPropValue, PPUtils, PropValue, VUtils} from '@rainbow-d9/n1';
import {CssVars, DOM_KEY_WIDGET, useGlobalHandlers} from '@rainbow-d9/n2';
import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {FileDefDeserializer, FileDefSerializer, YamlDefLoader, YamlDefSaver} from './definition';
import {EditDialog} from './edit-dialog';
import {Editor} from './editor';
import {PlaygroundBridge} from './playground-bridge';
import {PlaygroundEventBusProvider} from './playground-event-bus';
import {PlaygroundProps, UnwrappedPlaygroundProps} from './types';
import {PlaygroundCssVars} from './widgets';

// noinspection CssUnresolvedCustomProperty
export const PlaygroundWrapper = styled.div.attrs(
	() => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground',
			style: {
				'--min-height': '500px',
				'--grid-columns': `1fr`,
				'--grid-rows': '1fr'
			}
		};
	})`
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

    &[data-visible=false] {
        display: none;
    }

    &[data-diagram-work-mode] {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: ${CssVars.BACKGROUND_COLOR};
        border: 0;
        border-radius: 0;
        z-index: ${PlaygroundCssVars.EDITOR_MAX_Z_INDEX};
    }
`;

export interface PlaygroundDelegateState {
	serializer: FileDefSerializer;
	deserializer: FileDefDeserializer;
}

export const PlaygroundDelegate = (props: PlaygroundProps) => {
	const {
		$pp, $wrapped,
		usage, assistant,
		serializer, deserializer,
		...rest
	} = props;
	const {$p2r, $onValueChange, $avs: {$disabled, $visible}} = $wrapped;

	const ref = useRef<HTMLDivElement>(null);
	const globalHandlers = useGlobalHandlers();
	const [state, setState] = useState<PlaygroundDelegateState>(() => {
		return {
			serializer: serializer ?? new YamlDefSaver(),
			deserializer: deserializer ?? new YamlDefLoader()
		};
	});
	useEffect(() => {
		setState(state => {
			return {
				...state,
				serializer: serializer ?? state.serializer,
				deserializer: deserializer ?? state.deserializer
			};
		});
	}, [serializer, deserializer]);

	const onContentChanged = async (content?: string) => {
		await $onValueChange(content, false, {global: globalHandlers});
	};
	const content = MUtils.getValue($wrapped.$model, $pp) as unknown as string;

	return <PlaygroundWrapper {...rest} data-disabled={$disabled} data-visible={$visible}
	                          id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
	                          ref={ref}>
		<PlaygroundBridge content={content} onContentChanged={onContentChanged}/>
		<Editor content={content} usage={usage} assistant={assistant}
		        serializer={state.serializer} deserializer={state.deserializer}/>
	</PlaygroundWrapper>;
};

export const Playground = (props: PlaygroundProps) => {
	return <PlaygroundEventBusProvider>
		<EditDialog/>
		<PlaygroundDelegate {...props}/>
	</PlaygroundEventBusProvider>;
};

export const UnwrappedPlayground = (props: UnwrappedPlaygroundProps) => {
	const {$pp = 'value', value = '', disabled, visible, onValueChange, ...rest} = props;

	const $onValueChange = (content?: PropValue) => {
		onValueChange && onValueChange(content as string);
	};
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root: ObjectPropValue = {[$pp]: value};

	return <Playground {...rest}
	                   $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                   $pp={$pp}
	                   id={rest.id ?? VUtils.generateUniqueId()}/>;
};
