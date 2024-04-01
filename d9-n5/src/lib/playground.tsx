import {MUtils, NodeAttributeValues, ObjectPropValue, PPUtils, PropValue, VUtils} from '@rainbow-d9/n1';
import {CssVars, DOM_KEY_WIDGET, useGlobalHandlers} from '@rainbow-d9/n2';
import React, {useRef} from 'react';
import styled from 'styled-components';
import {Editor} from './editor';
import {Help} from './help';
import {useAvailableWidgets, useInitialize, useViewMode} from './hooks';
import {PlaygroundBridge} from './playground-bridge';
import {PlaygroundEventBusProvider, PlaygroundEventTypes, usePlaygroundEventBus} from './playground-event-bus';
import {Slider} from './slider';
import {Toolbar} from './toolbar';
import {PlaygroundProps, PlaygroundWidgetUsage, UnwrappedPlaygroundProps} from './types';
import {Viewer} from './viewer';
import {PlaygroundCssVars} from './widgets';

// noinspection CssUnresolvedCustomProperty
export const PlaygroundWrapper = styled.div.attrs(
	() => {
		return {
			[DOM_KEY_WIDGET]: 'd9-playground',
			style: {
				'--min-height': '500px',
				'--grid-columns': `auto auto 1fr`,
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

export const PlaygroundDelegate = (props: PlaygroundProps) => {
	const {
		$pp, $wrapped,
		mockData,
		externalDefs, externalDefsTypes,
		widgets, usage: {useN2 = true, useCharts = false} = {} as PlaygroundWidgetUsage,
		minViewerWidth,
		...rest
	} = props;
	const {$p2r, $onValueChange, $avs: {$disabled, $visible}} = $wrapped;

	const ref = useRef<HTMLDivElement>(null);
	const globalHandlers = useGlobalHandlers();
	const {fire} = usePlaygroundEventBus();
	const {
		initialized,
		mockData: initializedMockData,
		externalDefs: initializedExternalDefs, externalDefsTypes: initializedExternalDefsTypes
	} = useInitialize({mockData, externalDefs, externalDefsTypes});
	const availableWidgets = useAvailableWidgets(widgets, {useN2, useCharts});
	const {zen, maximized} = useViewMode();

	if (!initialized) {
		return null;
	}

	const onContentChanged = async (content?: string) => {
		await $onValueChange(content, false, {global: globalHandlers});
	};
	const resizeTo = (width: number) => {
		fire(PlaygroundEventTypes.RESIZE_EDITOR, width);
	};
	const content = MUtils.getValue($wrapped.$model, $pp) as unknown as string;

	return <PlaygroundWrapper {...rest} data-disabled={$disabled} data-visible={$visible}
	                          data-zen={zen} data-maximized={maximized}
	                          id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
	                          ref={ref}>
		<PlaygroundBridge content={content} onContentChanged={onContentChanged}/>
		<Toolbar groups={availableWidgets.groups} widgets={availableWidgets.widgets}/>
		<Editor content={content}
		        externalDefsTypes={initializedExternalDefsTypes} widgets={availableWidgets}/>
		<Help/>
		<Viewer mockData={initializedMockData!} externalDefs={initializedExternalDefs}
		        minViewerWidth={minViewerWidth}/>
		<Slider resizeTo={resizeTo}/>
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
		onValueChange && onValueChange(content as string);
	};
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root: ObjectPropValue = {[$pp]: value};

	return <Playground {...rest}
	                   $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                   $pp={$pp}
	                   id={rest.id ?? VUtils.generateUniqueId()}/>;
};
