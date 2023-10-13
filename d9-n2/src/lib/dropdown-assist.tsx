import React, {ForwardedRef, forwardRef, MouseEvent, ReactNode, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET} from './constants';
import {useCollapseFixedThing} from './hooks';

export enum DropdownPopupStateActive {
	WILL_ACTIVE = 'will-active', ACTIVE = 'active', HIDDEN = 'hidden'
}

export const isDropdownPopupActive = (active: DropdownPopupStateActive) => {
	return [DropdownPopupStateActive.ACTIVE, DropdownPopupStateActive.WILL_ACTIVE].includes(active);
};

export const DropdownContainer = styled.div.attrs<{ active: DropdownPopupStateActive, atBottom: boolean }>(
	({id, active, atBottom}) => {
		return {
			[DOM_ID_WIDGET]: id,
			'data-active': isDropdownPopupActive(active),
			'data-at-bottom': !!atBottom
		};
	})<{ active: DropdownPopupStateActive, atBottom: boolean }>`
	display          : flex;
	position         : relative;
	align-items      : center;
	padding          : 0 ${CssVars.INPUT_INDENT};
	outline          : none;
	appearance       : none;
	border           : ${CssVars.BORDER};
	border-radius    : ${CssVars.BORDER_RADIUS};
	height           : ${CssVars.INPUT_HEIGHT};
	background-color : transparent;
	transition       : all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
	cursor           : pointer;
	width            : 100%;
	&[data-visible=false] {
		display : none;
	}
	&[disabled], &[data-disabled=true] {
		border-color     : ${CssVars.BORDER_COLOR};
		background-color : ${CssVars.DISABLE_COLOR};
		cursor           : default;
		&:hover, &:focus-within {
			border-color : ${CssVars.BORDER_COLOR};
			box-shadow   : none;
			> span[data-w=d9-dropdown-stick] {
				opacity : 0;
			}
		}
	}
	&:hover {
		box-shadow : ${CssVars.PRIMARY_HOVER_SHADOW};
	}
	&:focus-within {
		box-shadow : ${CssVars.PRIMARY_SHADOW};
	}
	&:hover,
	&:focus-within {
		border-color : ${CssVars.PRIMARY_COLOR};
		> span[data-w=d9-dropdown-stick] {
			opacity : 0.8;
			&[data-clear=true] {
				> svg {
					fill : ${CssVars.DANGER_COLOR};
				}
			}
		}
	}
`;

export const DropdownLabel = styled.span.attrs({'data-w': 'd9-dropdown-label'})`
	flex-grow     : 1;
	display       : flex;
	align-items   : center;
	height        : 100%;
	white-space   : nowrap;
	text-overflow : ellipsis;
	overflow-x    : hidden;
	&[data-please=true] {
		opacity : 0.7;
	}
`;

export const DropdownStickSVG = styled.svg`
	height     : calc(${CssVars.INPUT_HEIGHT} * 2 / 5);
	fill       : ${CssVars.FONT_COLOR};
	transition : all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;

export const DropdownStickCaret = () => {
	return <DropdownStickSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-w="d9-dropdown-caret">
		<path
			d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
	</DropdownStickSVG>;
};

export const DropdownStickClear = () => {
	return <DropdownStickSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-w="d9-dropdown-clear">
		<path
			d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
	</DropdownStickSVG>;
};

export const DropdownStickContainer = styled.span.attrs({'data-w': 'd9-dropdown-stick'})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	height          : calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
	width           : calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
	border-radius   : calc(${CssVars.BORDER_RADIUS});
	margin-left     : 8px;
	margin-right    : calc(${CssVars.INPUT_INDENT} * -1 + 4px);
	opacity         : 0;
	transition      : opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
	overflow        : hidden;
	&[data-clear=true] {
		> svg {
			fill : ${CssVars.DANGER_COLOR};
		}
	}
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		width            : 100%;
		height           : 100%;
		background-color : transparent;
		z-index          : -1;
		transition       : background-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
	}
`;

export const DropdownStick = (props: {
	valueAssigned: boolean;
	clearable: boolean;
	clear: (event: MouseEvent<HTMLSpanElement>) => void;
	disabled: boolean;
}) => {
	const {valueAssigned, clearable, clear, disabled} = props;

	const onClearClicked = (event: MouseEvent<HTMLSpanElement>) => {
		clear(event);
	};

	if (valueAssigned && clearable) {
		return <DropdownStickContainer data-clear={true} data-disabled={disabled} onClick={onClearClicked}>
			<DropdownStickClear />
		</DropdownStickContainer>;
	} else {
		return <DropdownStickContainer data-disabled={disabled}><DropdownStickCaret /></DropdownStickContainer>;
	}
};

export interface DropdownPopupState {
	active: DropdownPopupStateActive;
	atBottom: boolean;
	top: number;
	left: number;
	width: number;
	height: number;
	minWidth: number;
	maxWidth?: number | string;
	minHeight?: number | string;
	maxHeight?: number | string;
}

const DropdownPopupContainer = styled.div.attrs<Omit<DropdownPopupProps, 'children'>>(
	({
		 atBottom, shown, vScroll, hScroll,
		 top, left, height, minWidth, maxWidth, minHeight, maxHeight
	 }) => {
		return {
			'data-w': 'd9-dropdown-popup',
			'data-v-scroll': vScroll ? '' : (void 0),
			'data-h-scroll': hScroll ? '' : (void 0),
			'data-at-bottom': atBottom,
			style: {
				opacity: shown ? 1 : (void 0),
				pointerEvents: shown ? 'auto' : (void 0),
				top: atBottom ? (shown ? (top + height + 3) : (top + height + 29)) : (void 0),
				bottom: atBottom ? (void 0) : (shown ? `calc(100vh - ${top}px + 3px)` : `calc(100vh - ${top}px + 29px)`),
				left,
				minWidth, maxWidth, minHeight, maxHeight,
				overflowY: vScroll ? 'auto' : 'hidden',
				overflowX: hScroll ? 'auto' : 'hidden'
			}
		};
	})<Omit<DropdownPopupProps, 'children'>>`
	display          : block;
	position         : fixed;
	background-color : ${CssVars.BACKGROUND_COLOR};
	border           : ${CssVars.BORDER};
	border-color     : ${CssVars.PRIMARY_COLOR};
	border-radius    : ${CssVars.BORDER_RADIUS};
	box-shadow       : ${CssVars.PRIMARY_HOVER_SHADOW};
	transition       : opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, top ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, bottom ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
	z-index          : ${CssVars.DROPDOWN_Z_INDEX};
	overflow-y       : auto;
	opacity          : 0;
	pointer-events   : none;
`;

export interface DropdownPopupProps extends DropdownPopupState {
	shown: boolean;
	vScroll?: boolean;
	hScroll?: boolean;
	children?: ReactNode;
}

export const DropdownPopup = forwardRef((props: DropdownPopupProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {shown, vScroll, hScroll, children, ...state} = props;

	return <DropdownPopupContainer shown={shown} vScroll={vScroll} hScroll={hScroll} {...state} ref={ref}>
		{children}
	</DropdownPopupContainer>;
});

export const getDropdownPosition = (container: HTMLDivElement) => {
	const rect = container.getBoundingClientRect();
	return {top: rect.top, left: rect.left, width: rect.width, height: rect.height};
};

export const isPopupAtBottom = (top: number, height: number, askPopupHeight: () => number) => {
	const popupHeight = askPopupHeight();
	switch (true) {
		case top + height + popupHeight + 2 < window.innerHeight:
			return true;
		case top - popupHeight - 2 >= 0:
			return false;
		default:
			return true;
	}
};

export const useDropdownControl = (options: {
	askPopupMaxHeight: () => number;
	afterPopupShown?: () => void;
	afterPopupHide?: () => void;
}) => {
	const {askPopupMaxHeight, afterPopupShown, afterPopupHide} = options;

	const containerRef = useRef<HTMLDivElement>(null);
	const popupRef = useRef<HTMLDivElement>(null);
	const [popupState, setPopupState] = useState<DropdownPopupState>({
		active: DropdownPopupStateActive.HIDDEN, atBottom: true,
		top: 0, left: 0, width: 0, height: 0, minWidth: 0, maxHeight: askPopupMaxHeight()
	});
	const [popupShown, setPopupShown] = useState(false);
	useEffect(() => {
		if (isDropdownPopupActive(popupState.active)) {
			setPopupShown(true);
			const {left, width} = popupRef.current.getBoundingClientRect();
			if (left + width + 2 > window.innerWidth) {
				const {left: pl, width: pw} = popupRef.current.parentElement.getBoundingClientRect();
				setPopupState(state => ({...state, active: DropdownPopupStateActive.ACTIVE, left: pl + pw - width}));
			} else {
				setPopupState(state => ({...state, active: DropdownPopupStateActive.ACTIVE}));
			}
			afterPopupShown && afterPopupShown();
		}
	}, [popupState.active, afterPopupShown]);
	useEffect(() => {
		if (!popupShown) {
			setPopupState(state => ({...state, active: DropdownPopupStateActive.HIDDEN}));
		}
	}, [popupShown]);
	useCollapseFixedThing({
		containerRef,
		visible: [DropdownPopupStateActive.ACTIVE, DropdownPopupStateActive.WILL_ACTIVE].includes(popupState.active),
		hide: () => {
			setPopupShown(false);
			afterPopupHide && afterPopupHide();
		}
	});

	return {
		containerRef, popupRef,
		popupState, setPopupState, popupShown, setPopupShown
	};
};
