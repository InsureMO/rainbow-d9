import {VUtils} from '@rainbow-d9/n1';
import {ButtonFill, ButtonInk, CssVars, DOM_KEY_WIDGET, UnwrappedButton} from '@rainbow-d9/n2';
import React, {MouseEvent, ReactNode, useEffect, useState} from 'react';
import styled from 'styled-components';
import {PlaygroundIcons} from './icons';
import {PlaygroundEventTypes, usePlaygroundEventBus} from './playground-event-bus';
import {PlaygroundCssVars} from './widgets';

// noinspection CssUnresolvedCustomProperty
export const ToolbarWrapper = styled.div.attrs(() => {
	return {
		[DOM_KEY_WIDGET]: 'd9-playground-toolbar',
		style: {
			'--width': '81px',
			'--primary-width': '41px',
			'--secondary-width': '40px'
		}
	};
})`
    display: grid;
    position: relative;
    grid-row: span 2;
    grid-template-columns: var(--primary-width) var(--secondary-width);
    grid-template-rows: 1fr;
    width: var(--width);
    background-color: ${PlaygroundCssVars.TOOLBAR_BACKGROUND_COLOR};
    border-right: ${CssVars.BORDER};

    button[data-w=d9-button] {
        align-self: center;
        border-color: transparent;
        padding: 0;

        &[data-fill=plain][data-ink=primary] {
            color: ${CssVars.FONT_COLOR};
            border-color: transparent;

            &[data-active=true] {
                &:before {
                    opacity: 0.5;
                }

                > span[data-w=d9-deco-lead] {
                    color: ${CssVars.INVERT_COLOR};
                    fill: ${CssVars.INVERT_COLOR};
                }
            }

            &:before {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: ${CssVars.BORDER_RADIUS};
                background-color: ${PlaygroundCssVars.TOOLBAR_BUTTON_ACTIVE_COLOR};
                opacity: 0;
                transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
                z-index: 0;
            }

            &:hover, &:focus {
                box-shadow: none;
            }

            &:hover {
                background-color: ${PlaygroundCssVars.TOOLBAR_BUTTON_HOVER_COLOR};
                overflow: visible;

                > span[data-role=text] {
                    display: block;
                }
            }

            > span[data-w=d9-deco-lead] {
                width: ${PlaygroundCssVars.TOOLBAR_BUTTON_SIZE};
                height: ${PlaygroundCssVars.TOOLBAR_BUTTON_SIZE};
                padding: 0;
                color: ${CssVars.FONT_COLOR};
                fill: ${CssVars.FONT_COLOR};

                > svg {
                    height: calc(${PlaygroundCssVars.TOOLBAR_BUTTON_SIZE} * 0.7);
                    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
                }
            }

            > span[data-role=text] {
                display: none;
                position: absolute;
                top: 0;
                left: calc(100% + 8px);
                font-variant: none;
                background-color: ${PlaygroundCssVars.TOOLBAR_TOOLTIP_BACKGROUND_COLOR};
                box-shadow: ${PlaygroundCssVars.TOOLBAR_TOOLTIP_SHADOW};
                border-radius: ${CssVars.BORDER_RADIUS};
                z-index: ${PlaygroundCssVars.Z_INDEX + 1};
            }
        }
    }
`;
export const PrimaryToolbar = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-toolbar-primary'})`
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 8px 0;

    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: calc(100% - 1px);
        width: 1px;
        height: 100%;
        background-color: ${CssVars.BORDER_COLOR};
        opacity: 0.3;
    }
`;
export const SecondaryToolbar = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-toolbar-secondary'})`
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 8px 0;
`;
export const ToolbarSeparator = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-playground-toolbar-separator'})`
    display: block;
    position: relative;
    margin: 4px 0;

    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 20%;
        width: 60%;
        height: 1px;
        background-color: ${CssVars.BORDER_COLOR};
        opacity: 0.7;
    }
`;
export const ToolbarButtonTooltip = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-toolbar-tooltip'})`
    display: flex;
    position: relative;
    align-items: center;
    height: calc(${PlaygroundCssVars.TOOLBAR_BUTTON_SIZE} * 1.2);
    padding: 0 12px;
    white-space: nowrap;
    overflow: hidden;
`;

export const ToolbarButton = (props: { icon: PlaygroundIcons; tooltip?: ReactNode; click: () => void }) => {
	const {icon, tooltip, click, ...rest} = props;

	const onClicked = () => click();
	const onTooltipClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
	};

	return <UnwrappedButton ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN}
	                        onClick={onClicked} leads={[`$icons.${icon}`]} {...rest}>
		{VUtils.isNotBlank(tooltip) ?
			<ToolbarButtonTooltip onClick={onTooltipClicked}>{tooltip}</ToolbarButtonTooltip> : null}
	</UnwrappedButton>;
};

export enum WidgetGroup {
	CONTAINERS = 'container-group', INPUTS = 'input-group'
}

export interface PrimaryBarState {
	zen: boolean;
	maximized: boolean;
	group: WidgetGroup;
}

export const PrimaryBar = () => {
	const {fire} = usePlaygroundEventBus();
	const [state, setState] = useState<PrimaryBarState>({
		zen: false, maximized: false, group: WidgetGroup.INPUTS
	});
	useEffect(() => {
		const onFullScreenChanged = () => {
			if (document.fullscreenElement == null) {
				setState(state => ({...state, maximized: false, zen: false}));
			}
		};
		window.addEventListener('fullscreenchange', onFullScreenChanged);
		return () => {
			window.removeEventListener('fullscreenchange', onFullScreenChanged);
		};
	}, []);

	const onGroupClicked = (group: WidgetGroup) => () => {
		setState(state => ({...state, group}));
	};
	const onMaxClicked = () => {
		fire(PlaygroundEventTypes.MAXIMIZE);
		setState(state => ({...state, maximized: true}));
	};
	const onMinClicked = () => {
		fire(PlaygroundEventTypes.QUIT_MAXIMIZE);
		setState(state => ({...state, maximized: false}));
	};
	const onZenClicked = () => {
		fire(PlaygroundEventTypes.ZEN);
		setState(state => ({...state, zen: true}));
	};
	const onWindowClicked = () => {
		fire(PlaygroundEventTypes.QUIT_ZEN);
		setState(state => ({...state, zen: false}));
	};

	return <PrimaryToolbar>
		<ToolbarButton icon={PlaygroundIcons.CONTAINER_GROUP} tooltip="Containers"
		               click={onGroupClicked(WidgetGroup.CONTAINERS)}
		               data-active={state.group === WidgetGroup.CONTAINERS}/>
		<ToolbarButton icon={PlaygroundIcons.INPUT_GROUP} tooltip="Inputs"
		               click={onGroupClicked(WidgetGroup.INPUTS)}
		               data-active={state.group === WidgetGroup.INPUTS}/>
		<ToolbarSeparator/>
		{!state.zen && state.maximized
			? <ToolbarButton icon={PlaygroundIcons.MINIMIZE} tooltip="Quit Maximization" click={onMinClicked}/>
			: null}
		{!state.zen && !state.maximized
			? <ToolbarButton icon={PlaygroundIcons.MAXIMIZE} tooltip="Maximize" click={onMaxClicked}/>
			: null}
		{state.zen
			? <ToolbarButton icon={PlaygroundIcons.WINDOW} tooltip="Quit Zen Mode" click={onWindowClicked}/>
			: <ToolbarButton icon={PlaygroundIcons.ZEN} tooltip="Zen Mode" click={onZenClicked}/>}
	</PrimaryToolbar>;
};

export const Toolbar = () => {
	return <ToolbarWrapper>
		<PrimaryBar/>
		<SecondaryToolbar>

		</SecondaryToolbar>
	</ToolbarWrapper>;
};
