import {MUtils, NodeAttributeValues, ObjectPropValue, PPUtils, PropValue, VUtils} from '@rainbow-d9/n1';
import {CssVars, DOM_KEY_WIDGET, useGlobalHandlers} from '@rainbow-d9/n2';
import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {FileDefDeserializer, FileDefSerializer, YamlDefLoader, YamlDefSaver} from './definition';
import {EditDialog} from './edit-dialog';
import {Editor} from './editor';
import {PlaygroundBridge} from './playground-bridge';
import {PlaygroundEventBusProvider, PlaygroundEventTypes, usePlaygroundEventBus} from './playground-event-bus';
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
			} as CSSProperties
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
		assistant, decorator, serializer, deserializer,
		allowUploadFile = false, allowDownloadFile = true, allowDownloadImage = true,
		maxMode = true, zenMode = true,
		...rest
	} = props;
	const {$p2r, $onValueChange, $avs: {$disabled, $visible}} = $wrapped;

	const ref = useRef<HTMLDivElement>(null);
	const globalHandlers = useGlobalHandlers();
	const {on, off} = usePlaygroundEventBus();
	const [state, setState] = useState<PlaygroundDelegateState>(() => {
		return {
			serializer: serializer ?? new YamlDefSaver(),
			deserializer: deserializer ?? new YamlDefLoader()
		};
	});
	useEffect(() => {
		if ((serializer == null || serializer !== state.serializer)
			&& (deserializer == null || deserializer !== state.deserializer)) {
			// no need to replace
			return;
		}
		setState(state => {
			return {
				...state,
				serializer: serializer ?? state.serializer,
				deserializer: deserializer ?? state.deserializer
			};
		});
	}, [serializer, deserializer, state.serializer, state.deserializer]);
	useEffect(() => {
		const onResetContent = async (content: string) => {
			await $onValueChange(content, true, {global: globalHandlers});
		};
		on(PlaygroundEventTypes.RESET_CONTENT, onResetContent);
		return () => {
			off(PlaygroundEventTypes.RESET_CONTENT, onResetContent);
		};
	}, [on, off, globalHandlers, $onValueChange]);

	const onContentChanged = async (content?: string) => {
		await $onValueChange(content, false, {global: globalHandlers});
	};
	const content = MUtils.getValue($wrapped.$model, $pp) as unknown as string;

	return <PlaygroundWrapper {...rest} data-disabled={$disabled} data-visible={$visible}
	                          id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
	                          ref={ref}>
		<EditDialog/>
		<PlaygroundBridge content={content} onContentChanged={onContentChanged}/>
		<Editor content={content} assistant={assistant} decorator={decorator}
		        serializer={state.serializer} deserializer={state.deserializer}
		        allowUploadFile={allowUploadFile} allowDownloadFile={allowDownloadFile}
		        allowDownloadImage={allowDownloadImage}
		        maxMode={maxMode} zenMode={zenMode}/>
	</PlaygroundWrapper>;
};

export const Playground = (props: PlaygroundProps) => {
	return <PlaygroundEventBusProvider>
		<PlaygroundDelegate {...props}/>
	</PlaygroundEventBusProvider>;
};

export const UnwrappedPlayground = (props: UnwrappedPlaygroundProps) => {
	const {$pp = 'value', value = '', disabled, visible, onValueChange, ...rest} = props;

	const $onValueChange = (content?: PropValue) => {
		if (onValueChange != null) {
			onValueChange(content as string);
		}
	};
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root: ObjectPropValue = {[$pp]: value};

	return <Playground {...rest}
	                   $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                   $pp={$pp}
	                   id={rest.id ?? VUtils.generateUniqueId()}/>;
};
