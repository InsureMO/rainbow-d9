import {Nullable} from '@rainbow-d9/n1';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {PortChecked, PortIncorrect, PortUndefined} from '../../icons';
import {Labels} from '../../labels';
import {PlaygroundCssVars} from '../../widgets';

export interface PortProps {
	label: ReactNode;
	required: boolean;
	defined: boolean;
	count?: number;
	all?: boolean;
	allAsBoolean?: boolean;
	allAsGiven?: ReactNode;
	danger?: boolean;
}

export const computePortIconAndBadge = (props: PortProps) => {
	const {required, defined, count, all, allAsBoolean = false, allAsGiven} = props;

	let icon: JSX.Element;
	let badge: Nullable<JSX.Element> = null;
	if (defined) {
		icon = <PortChecked/>;
		if (count != null) {
			badge = <span data-role="count">{count}</span>;
		} else if (all != null) {
			if (allAsBoolean) {
				if (all === true) {
					badge = <span data-role="all">{Labels.YesChar}</span>;
				} else {
					badge = <span data-role="all">{Labels.NoChar}</span>;
				}
			} else if (allAsGiven != null) {
				badge = <span data-role="all">{allAsGiven}</span>;
			} else if (all === true) {
				badge = <span data-role="all">{Labels.All}</span>;
			}
		}
	} else if (required) {
		icon = <PortIncorrect/>;
	} else {
		icon = <PortUndefined/>;
	}

	return {icon, badge};
};

export const PrePortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-pre-port'})`
    display: flex;
    position: relative;
    align-self: end;
    align-items: center;
    justify-self: start;
    color: ${PlaygroundCssVars.NODE_PRE_PORT_COLOR};
    background: ${PlaygroundCssVars.NODE_PRE_PORT_BACKGROUND};
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    border: ${PlaygroundCssVars.NODE_PRE_PORT_BORDER};
    border-top-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    font-weight: ${PlaygroundCssVars.NODE_PRE_PORT_FONT_WEIGHT};
    font-size: ${PlaygroundCssVars.NODE_PRE_PORT_FONT_SIZE};
    text-transform: capitalize;
    padding: ${PlaygroundCssVars.NODE_PRE_PORT_PADDING};
    margin-left: -1px;
    grid-column: 1;
    white-space: nowrap;

    &[data-defined=false] {
        border: ${PlaygroundCssVars.NODE_PRE_PORT_UNDEFINED_BORDER};
        background: ${PlaygroundCssVars.NODE_PRE_PORT_UNDEFINED_BACKGROUND};
    }

    &[data-required=true][data-defined=false] {
        border: ${PlaygroundCssVars.NODE_PRE_PORT_LACKING_BORDER};
        background: ${PlaygroundCssVars.NODE_PRE_PORT_LACKING_BACKGROUND};
    }

    &[data-danger=true] {
        border: ${PlaygroundCssVars.NODE_PRE_PORT_DANGER_BORDER};
        background: ${PlaygroundCssVars.NODE_PRE_PORT_DANGER_BACKGROUND};

        > span[data-role=count],
        > span[data-role=all] {
            background: ${PlaygroundCssVars.NODE_PRE_PORT_BADGE_DANGER_BACKGROUND};
        }
    }

    > svg:first-child {
        height: 1em;
        width: 1em;
        margin-right: 6px;
    }

    > span[data-role=count],
    > span[data-role=all] {
        display: flex;
        position: relative;
        align-items: center;
        height: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.6);
        font-size: 0.6em;
        font-variant: petite-caps;
        padding: 0 8px;
        background: ${PlaygroundCssVars.NODE_PRE_PORT_BADGE_BACKGROUND};
        margin-left: 6px;
        border: ${PlaygroundCssVars.NODE_PRE_PORT_BADGE_BORDER};
        border-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.3);
    }
`;

export const PrePort = (props: PortProps) => {
	const {label, required, defined, danger = false} = props;

	const {icon, badge} = computePortIconAndBadge(props);

	return <PrePortContainer data-required={required} data-defined={defined} data-danger={danger}>
		{icon}
		<span>{label}</span>
		{badge}
	</PrePortContainer>;
};

export const PostPortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-post-port'})`
    display: flex;
    position: relative;
    align-self: end;
    align-items: center;
    justify-self: end;
    color: ${PlaygroundCssVars.NODE_POST_PORT_COLOR};
    background: ${PlaygroundCssVars.NODE_POST_PORT_BACKGROUND};
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    border: ${PlaygroundCssVars.NODE_POST_PORT_BORDER};
    border-top-left-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-left-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    font-weight: ${PlaygroundCssVars.NODE_POST_PORT_FONT_WEIGHT};
    font-size: ${PlaygroundCssVars.NODE_POST_PORT_FONT_SIZE};
    text-transform: capitalize;
    padding: ${PlaygroundCssVars.NODE_POST_PORT_PADDING};
    margin-right: -1px;
    grid-column: 3;
    white-space: nowrap;

    &[data-defined=false] {
        border: ${PlaygroundCssVars.NODE_POST_PORT_UNDEFINED_BORDER};
        background: ${PlaygroundCssVars.NODE_POST_PORT_UNDEFINED_BACKGROUND};
    }

    &[data-required=true][data-defined=false] {
        border: ${PlaygroundCssVars.NODE_POST_PORT_LACKING_BORDER};
        background: ${PlaygroundCssVars.NODE_POST_PORT_LACKING_BACKGROUND};
    }

    &[data-danger=true] {
        border: ${PlaygroundCssVars.NODE_POST_PORT_DANGER_BORDER};
        background: ${PlaygroundCssVars.NODE_POST_PORT_DANGER_BACKGROUND};

        > span[data-role=count],
        > span[data-role=all] {
            background: ${PlaygroundCssVars.NODE_POST_PORT_BADGE_DANGER_BACKGROUND};
        }
    }

    &[data-role=sub-steps] {
        border: ${PlaygroundCssVars.NODE_POST_PORT_SUB_STEPS_BORDER};
        background: ${PlaygroundCssVars.NODE_POST_PORT_SUB_STEPS_BACKGROUND};
    }

    > svg:first-child {
        height: 1em;
        width: 1em;
        margin-right: 6px;
    }

    > span[data-role=count],
    > span[data-role=all] {
        display: flex;
        position: relative;
        align-items: center;
        height: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.6);
        font-size: 0.6em;
        font-variant: petite-caps;
        padding: 0 8px;
        background: ${PlaygroundCssVars.NODE_POST_PORT_BADGE_BACKGROUND};
        margin-left: 6px;
        border: ${PlaygroundCssVars.NODE_POST_PORT_BADGE_BORDER};
        border-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.3);
    }
`;

export const PostPort = (props: PortProps) => {
	const {label, required, defined, danger = false, ...rest} = props;

	const {icon, badge} = computePortIconAndBadge(props);

	return <PostPortContainer data-required={required} data-defined={defined} data-danger={danger} {...rest}>
		{icon}
		<span>{label}</span>
		{badge}
	</PostPortContainer>;
};
