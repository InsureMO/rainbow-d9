import {VUtils, WidgetType} from '@rainbow-d9/n1';
import {ButtonFill, ButtonInk, CssVars, DOM_KEY_WIDGET, UnwrappedButton} from '@rainbow-d9/n2';
import React, {MouseEvent, ReactNode, useEffect, useState} from 'react';
import styled from 'styled-components';
import {PlaygroundIcons} from '../icons';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {PlaygroundWidget, PlaygroundWidgetGroup, PlaygroundWidgetGroupKey} from '../types';
import {PlaygroundCssVars} from '../widgets';

export interface ToolbarProps {
	groups: Array<PlaygroundWidgetGroup>;
	widgets: Array<PlaygroundWidget>;
}

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

export const ToolbarButton = (props: { icon: PlaygroundIcons | string; tooltip?: ReactNode; click: () => void }) => {
	const {icon, tooltip, click, ...rest} = props;

	const onClicked = () => click();
	const onTooltipClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
	};

	return <UnwrappedButton ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN}
	                        onClick={onClicked} leads={[`$icons.${icon}`]} {...rest}>
		{VUtils.isNotBlank(tooltip)
			? <ToolbarButtonTooltip onClick={onTooltipClicked}>{tooltip}</ToolbarButtonTooltip>
			: null}
	</UnwrappedButton>;
};

export interface PrimaryBarState {
	editorBadge: boolean;
	locator: boolean;
	zen: boolean;
	maximized: boolean;
	group: PlaygroundWidgetGroupKey | string;
}

export interface PrimaryBarProps {
	groups: ToolbarProps['groups'];
}

export const PrimaryBar = (props: PrimaryBarProps) => {
	const {groups} = props;

	const {fire} = usePlaygroundEventBus();
	const [state, setState] = useState<PrimaryBarState>({
		editorBadge: false, locator: true, zen: false, maximized: false, group: groups[0]?.key ?? ''
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

	const onGroupClicked = (group: PlaygroundWidgetGroupKey | string) => () => {
		setState(state => ({...state, group}));
		fire(PlaygroundEventTypes.WIDGET_GROUP_CHANGE, group);
	};
	const onShowBadgeClicked = () => {
		fire(PlaygroundEventTypes.SWITCH_EDITOR_BADGE, true);
		setState(state => ({...state, editorBadge: true}));
	};
	const onHideBadgeClicked = () => {
		fire(PlaygroundEventTypes.SWITCH_EDITOR_BADGE, false);
		setState(state => ({...state, editorBadge: false}));
	};
	const onShowLocatorClicked = () => {
		fire(PlaygroundEventTypes.SWITCH_VIEWER_WRAPPER, {locator: true});
		setState(state => ({...state, locator: true}));
	};
	const onHideLocatorClicked = () => {
		fire(PlaygroundEventTypes.SWITCH_VIEWER_WRAPPER, {locator: false});
		setState(state => ({...state, locator: false}));
	};
	const onMockJsonClicked = () => {
		fire(PlaygroundEventTypes.EDIT_MOCK_JSON);
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
		{groups.map(({icon, tooltip, key: group}) => {
			return <ToolbarButton icon={icon} tooltip={tooltip}
			                      click={onGroupClicked(group)}
			                      data-active={state.group === group} key={group}/>;
		})}
		<ToolbarSeparator/>
		{state.editorBadge
			? <ToolbarButton icon={PlaygroundIcons.HIDE_EDITOR_BADGE} tooltip="Hide Editor Badge"
			                 click={onHideBadgeClicked}/>
			: <ToolbarButton icon={PlaygroundIcons.SHOW_EDITOR_BADGE} tooltip="Show Editor Badge"
			                 click={onShowBadgeClicked}/>}
		{state.locator
			? <ToolbarButton icon={PlaygroundIcons.HIDE_LOCATOR} tooltip="Hide Widget Locator"
			                 click={onHideLocatorClicked}/>
			: <ToolbarButton icon={PlaygroundIcons.SHOW_LOCATOR} tooltip="Show Widget Locator"
			                 click={onShowLocatorClicked}/>}
		<ToolbarButton icon={PlaygroundIcons.JSON} tooltip="Mock JSON" click={onMockJsonClicked}/>
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
	group: PlaygroundWidgetGroupKey | string;
}

export interface WidgetButton {
	key: string;
	icon: PlaygroundIcons | string;
	tooltip: string;
}

export interface SecondaryBarProps {
	groups: ToolbarProps['groups'];
	buttons: Record<PlaygroundWidgetGroupKey | string, Array<WidgetButton>>;
}

export const SecondaryBar = (props: SecondaryBarProps) => {
	const {groups, buttons} = props;

	const {on, off, fire} = usePlaygroundEventBus();
	const [state, setState] = useState<SecondaryBarState>({
		group: groups[0]?.key ?? ''
	});
	useEffect(() => {
		const onWidgetGroupChange = (group: PlaygroundWidgetGroupKey | string) => {
			setState(state => ({...state, group}));
		};
		on(PlaygroundEventTypes.WIDGET_GROUP_CHANGE, onWidgetGroupChange);
		return () => {
			off(PlaygroundEventTypes.WIDGET_GROUP_CHANGE, onWidgetGroupChange);
		};
	}, [on, off]);

	const onAddWidget = (keyOrWidgetType: WidgetType | string) => () => {
		fire(PlaygroundEventTypes.INSERT_WIDGET_TEMPLATE, keyOrWidgetType);
	};

	return <SecondaryToolbar>
		{(buttons[state.group] ?? []).map(button => {
			const {key, icon, tooltip} = button;
			return <ToolbarButton icon={icon} tooltip={tooltip} click={onAddWidget(key)} key={key}/>;
		})}
	</SecondaryToolbar>;
};

export const Toolbar = (props: ToolbarProps) => {
	const {groups, widgets} = props;
	const buttons = widgets.reduce((buttons, widget) => {
		const {$wt, $key, icon, tooltip, group, notInToolbar} = widget;
		if (notInToolbar) {
			// this widget will not show in toolbar, ignored
		} else {
			if (buttons[group] == null) {
				buttons[group] = [];
			}
			buttons[group].push({
				key: $key ?? $wt, icon, tooltip: VUtils.isBlank(tooltip) ? ($key ?? $wt) : tooltip
			});
		}
		return buttons;
	}, {} as Record<PlaygroundWidgetGroupKey | string, Array<WidgetButton>>);

	return <ToolbarWrapper>
		<PrimaryBar groups={groups}/>
		<SecondaryBar groups={groups} buttons={buttons}/>
	</ToolbarWrapper>;
};
