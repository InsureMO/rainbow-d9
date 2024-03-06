import {VUtils} from '@rainbow-d9/n1';
import {ButtonFill, ButtonInk, CssVars, DOM_KEY_WIDGET, UnwrappedButton} from '@rainbow-d9/n2';
import React, {MouseEvent, ReactNode, useEffect, useState} from 'react';
import styled from 'styled-components';
import {PlaygroundIcons} from '../icons';
import {PlaygroundEventTypes, usePlaygroundEventBus, WidgetGroup} from '../playground-event-bus';
import {PlaygroundCssVars} from '../widgets';

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

export interface PrimaryBarState {
	zen: boolean;
	maximized: boolean;
	group: WidgetGroup;
}

export interface WidgetButtonGroup {
	icon: PlaygroundIcons;
	tooltip: string;
	group: WidgetGroup;
}

export const WidgetButtonGroups: Array<WidgetButtonGroup> = [
	{icon: PlaygroundIcons.CONTAINER_GROUP, tooltip: 'Container', group: WidgetGroup.CONTAINERS},
	{icon: PlaygroundIcons.INPUT_GROUP, tooltip: 'Input', group: WidgetGroup.INPUTS},
	{icon: PlaygroundIcons.OPTIONS_GROUP, tooltip: 'Choices', group: WidgetGroup.OPTIONS},
	{icon: PlaygroundIcons.DISPLAY_GROUP, tooltip: 'Label & Chart', group: WidgetGroup.DISPLAY}
];

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
		fire(PlaygroundEventTypes.WIDGET_GROUP_CHANGE, group);
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
		{WidgetButtonGroups.map(({icon, tooltip, group}) => {
			return <ToolbarButton icon={icon} tooltip={tooltip}
			                      click={onGroupClicked(group)}
			                      data-active={state.group === group} key={group}/>;
		})}
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

export interface SecondaryBarState {
	group: WidgetGroup;
}

export interface WidgetButton {
	key: string;
	icon: PlaygroundIcons;
	tooltip: string;
}

export const WidgetButtons: Record<WidgetGroup, Array<WidgetButton>> = {
	[WidgetGroup.CONTAINERS]: [
		{key: 'Section', icon: PlaygroundIcons.SECTION, tooltip: 'Section'},
		{key: 'Box', icon: PlaygroundIcons.BOX, tooltip: 'Box'},
		{key: 'Table', icon: PlaygroundIcons.TABLE, tooltip: 'Table'},
		{key: 'Tabs', icon: PlaygroundIcons.TABS, tooltip: 'Tabs'},
		{key: 'Wizard', icon: PlaygroundIcons.WIZARD, tooltip: 'Wizard'},
		{key: 'Tree', icon: PlaygroundIcons.TREE, tooltip: 'Tree'},
		{key: 'ButtonBar', icon: PlaygroundIcons.BUTTON_BAR, tooltip: 'Button Bar'}
	],
	[WidgetGroup.INPUTS]: [
		{key: 'Button', icon: PlaygroundIcons.BUTTON, tooltip: 'Button'},
		{key: 'Link', icon: PlaygroundIcons.LINK, tooltip: 'Hyperlink'},
		{key: 'Input', icon: PlaygroundIcons.INPUT, tooltip: 'Input'},
		{key: 'NumberInput', icon: PlaygroundIcons.NUMBER_INPUT, tooltip: 'Number Input'},
		{key: 'Password', icon: PlaygroundIcons.PASSWORD, tooltip: 'Password'},
		{key: 'DecoInput', icon: PlaygroundIcons.DECO_INPUT, tooltip: 'Decorable Input'},
		{key: 'DecoNumber', icon: PlaygroundIcons.DECO_NUMBER, tooltip: 'Decorable Number Input'},
		{key: 'TextArea', icon: PlaygroundIcons.TEXTAREA, tooltip: 'Textarea'},
		{key: 'Date', icon: PlaygroundIcons.DATE, tooltip: 'Date Picker'},
		{key: 'Datetime', icon: PlaygroundIcons.DATETIME, tooltip: 'DateTime Picker'}
	],
	[WidgetGroup.OPTIONS]: [
		{key: 'Dropdown', icon: PlaygroundIcons.DROPDOWN, tooltip: 'Dropdown'},
		{key: 'MultiDropdown', icon: PlaygroundIcons.MULTI_DROPDOWN, tooltip: 'Multiple Choices'},
		{key: 'Checkbox', icon: PlaygroundIcons.CHECKBOX, tooltip: 'Checkbox'},
		{key: 'Checks', icon: PlaygroundIcons.CHECKS, tooltip: 'Checkbox Group'},
		{key: 'Radio', icon: PlaygroundIcons.RADIO, tooltip: 'Radio Button'},
		{key: 'Radios', icon: PlaygroundIcons.RADIOS, tooltip: 'Radio Button Group'}
	],
	[WidgetGroup.DISPLAY]: [
		{key: 'Caption', icon: PlaygroundIcons.CAPTION, tooltip: 'Caption'},
		{key: 'Label', icon: PlaygroundIcons.LABEL, tooltip: 'Label'},
		{key: 'ChartPie', icon: PlaygroundIcons.CHART_PIE, tooltip: 'Pie Chart'},
		{key: 'ChartBar', icon: PlaygroundIcons.CHART_BAR, tooltip: 'Bar Chart'},
		{key: 'ChartLine', icon: PlaygroundIcons.CHART_LINE, tooltip: 'Line Chart'}
	]
};

export const SecondaryBar = () => {
	const {on, off} = usePlaygroundEventBus();
	const [state, setState] = useState<SecondaryBarState>({
		group: WidgetGroup.INPUTS
	});
	useEffect(() => {
		const onWidgetGroupChange = (group: WidgetGroup) => {
			setState(state => ({...state, group}));
		};
		on(PlaygroundEventTypes.WIDGET_GROUP_CHANGE, onWidgetGroupChange);
		return () => {
			off(PlaygroundEventTypes.WIDGET_GROUP_CHANGE, onWidgetGroupChange);
		};
	}, [on, off]);

	return <SecondaryToolbar>
		{WidgetButtons[state.group].map(({key, icon, tooltip}) => {
			return <ToolbarButton icon={icon} tooltip={tooltip} click={VUtils.noop} key={key}/>;
		})}
	</SecondaryToolbar>;
};

export const Toolbar = () => {
	return <ToolbarWrapper>
		<PrimaryBar/>
		<SecondaryBar/>
	</ToolbarWrapper>;
};
