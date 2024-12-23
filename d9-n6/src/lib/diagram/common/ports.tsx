import {Nullable} from '@rainbow-d9/n1';
import {DOM_KEY_WIDGET, SDP} from '@rainbow-d9/n2';
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
	caseTransform?: 'caps' | 'up';
	danger?: boolean;
	children?: ReactNode;
}

export const computePortIconAndBadge = (props: PortProps) => {
	const {
		required, defined,
		count, all, allAsBoolean = false, allAsGiven,
		caseTransform
	} = props;

	let icon: JSX.Element;
	let badge: Nullable<JSX.Element> = null;
	if (defined) {
		icon = <PortChecked/>;
		if (count != null) {
			badge = <span data-role="count" data-case-transform={caseTransform}>{count}</span>;
		} else if (all != null) {
			if (allAsBoolean) {
				if (all === true) {
					badge = <span data-role="all" data-case-transform="up">{Labels.YesChar}</span>;
				} else {
					badge = <span data-role="all" data-case-transform="up">{Labels.NoChar}</span>;
				}
			} else if (allAsGiven != null) {
				badge = <span data-role="all" data-case-transform={caseTransform}>{allAsGiven}</span>;
			} else if (all === true) {
				badge = <span data-role="all" data-case-transform="up">{Labels.All}</span>;
			}
		}
	} else if (required) {
		icon = <PortIncorrect/>;
	} else {
		icon = <PortUndefined/>;
	}

	return {icon, badge};
};

export const PrePortContainer = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'o23-playground-pre-port'})`
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

        > span[data-role~=count],
        > span[data-role~=all] {
            background: ${PlaygroundCssVars.NODE_PRE_PORT_BADGE_DANGER_BACKGROUND};
        }
    }

    &[data-role~=first-sub-step] {
        border: ${PlaygroundCssVars.NODE_PORT_FIRST_SUB_STEP_BORDER};
        background: ${PlaygroundCssVars.NODE_PORT_FIRST_SUB_STEP_BACKGROUND};
    }

    > svg:first-child {
        height: 1em;
        width: 1em;
        margin-right: 6px;
    }

    > span[data-role~=count],
    > span[data-role~=all] {
        display: flex;
        position: relative;
        align-items: center;
        height: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.6);
        font-size: 0.6em;
        padding: 0 8px;
        background: ${PlaygroundCssVars.NODE_PRE_PORT_BADGE_BACKGROUND};
        margin-left: 6px;
        border: ${PlaygroundCssVars.NODE_PRE_PORT_BADGE_BORDER};
        border-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.3);
    }

    > span[data-case-transform=caps] {
        text-transform: capitalize;
    }

    > span[data-case-transform=up] {
        text-transform: uppercase;
    }
`;

export const PrePort = (props: PortProps) => {
	const {label, required, defined, danger = false, children, ...rest} = props;

	const {icon, badge} = computePortIconAndBadge(props);

	return <PrePortContainer data-required={required} data-defined={defined} data-danger={danger} {...rest}>
		{icon}
		<span>{label}</span>
		{badge}
		{children}
	</PrePortContainer>;
};

export const PostPortContainer = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'o23-playground-post-port'})`
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

        > span[data-role~=count],
        > span[data-role~=all] {
            background: ${PlaygroundCssVars.NODE_POST_PORT_BADGE_DANGER_BACKGROUND};
        }
    }

    &[data-role~=steps] {
        border: ${PlaygroundCssVars.NODE_PORT_STEPS_BORDER};
        background: ${PlaygroundCssVars.NODE_PORT_STEPS_BACKGROUND};
    }

    &[data-role~=catchable-error],
    &[data-role~=uncatchable-error],
    &[data-role~=exposed-error],
    &[data-role~=any-error] {
        border: ${PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BORDER};
        background: ${PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BACKGROUND};
    }

    > svg:first-child {
        height: 1em;
        width: 1em;
        margin-right: 6px;
    }

    > span[data-role~=count],
    > span[data-role~=all] {
        display: flex;
        position: relative;
        align-items: center;
        height: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.6);
        font-size: 0.6em;
        padding: 0 8px;
        background: ${PlaygroundCssVars.NODE_POST_PORT_BADGE_BACKGROUND};
        margin-left: 6px;
        border: ${PlaygroundCssVars.NODE_POST_PORT_BADGE_BORDER};
        border-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.3);
    }

    > span[data-case-transform=caps] {
        text-transform: capitalize;
    }

    > span[data-case-transform=up] {
        text-transform: uppercase;
    }
`;

export const PostPort = (props: PortProps) => {
	const {label, required, defined, danger = false, children, ...rest} = props;

	const {icon, badge} = computePortIconAndBadge(props);

	return <PostPortContainer data-required={required} data-defined={defined} data-danger={danger} {...rest}>
		{icon}
		<span>{label}</span>
		{badge}
		{children}
	</PostPortContainer>;
};
