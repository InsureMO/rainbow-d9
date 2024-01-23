import {DeviceTags, VUtils} from '@rainbow-d9/n1';
import React, {
	ChangeEvent,
	ForwardedRef,
	forwardRef,
	KeyboardEvent,
	MouseEvent,
	ReactNode,
	useEffect,
	useRef,
	useState
} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {useCollapseFixedThing} from './hooks';
import {CaretDown, Times} from './icons';
import {IntlLabel} from './intl-label';
import {
	NO_MATCHED_OPTION_ITEM,
	OptionItems,
	OptionItemSort,
	OptionItemsProps,
	useOptionItems
} from './option-items-assist';
import {toCssSize} from './utils';

export enum DropdownPopupStateActive {
	WILL_ACTIVE = 'will-active', ACTIVE = 'active', HIDDEN = 'hidden'
}

export const isDropdownPopupActive = (active: DropdownPopupStateActive) => {
	return [DropdownPopupStateActive.ACTIVE, DropdownPopupStateActive.WILL_ACTIVE].includes(active);
};

// noinspection CssUnresolvedCustomProperty
export const DropdownContainer = styled.div.attrs<{ active: DropdownPopupStateActive, atBottom: boolean }>(
	({id, active, atBottom}) => {
		return {
			[DOM_ID_WIDGET]: id,
			'data-active': isDropdownPopupActive(active),
			'data-at-bottom': !!atBottom
		};
	})<{ active: DropdownPopupStateActive, atBottom: boolean }>`
    display: flex;
    position: relative;
    align-items: center;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    padding: 0 ${CssVars.INPUT_INDENT};
    outline: none;
    appearance: none;
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    height: ${CssVars.INPUT_HEIGHT};
    background-color: transparent;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    cursor: pointer;
    width: 100%;

    &[data-visible=false] {
        display: none;
    }

    &[disabled], &[data-disabled=true] {
        border-color: ${CssVars.BORDER_COLOR};
        background-color: ${CssVars.DISABLE_COLOR};
        cursor: default;

        &:hover, &:focus-within {
            border-color: ${CssVars.BORDER_COLOR};
            box-shadow: none;

            > span[data-w=d9-dropdown-stick] {
                opacity: 0;
            }
        }
    }

    &:hover {
        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
    }

    &:focus-within {
        box-shadow: ${CssVars.PRIMARY_SHADOW};
    }

    &:hover,
    &:focus-within {
        border-color: ${CssVars.PRIMARY_COLOR};

        > span[data-w=d9-dropdown-stick] {
            opacity: 0.8;

            &[data-clear=true] {
                > svg {
                    fill: ${CssVars.DANGER_COLOR};
                }
            }
        }
    }
`;

export const DropdownLabel = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-dropdown-label'})`
    flex-grow: 1;
    display: flex;
    align-items: center;
    color: ${CssVars.FONT_COLOR};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    height: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;

    &[data-please=true] {
        opacity: 0.7;
    }

    &[data-please=false] ~ &[data-please=true] {
        display: none;
    }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DropdownStickCaret = styled(CaretDown as any).attrs({[DOM_KEY_WIDGET]: 'd9-dropdown-caret'})`
    height: calc(${CssVars.INPUT_HEIGHT} * 2 / 5);
    fill: ${CssVars.FONT_COLOR};
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DropdownStickClear = styled(Times as any).attrs({[DOM_KEY_WIDGET]: 'd9-dropdown-clear'})`
    height: calc(${CssVars.INPUT_HEIGHT} * 2 / 5);
    fill: ${CssVars.FONT_COLOR};
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;

export const DropdownStickContainer = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-dropdown-stick'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
    width: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
    border-radius: calc(${CssVars.BORDER_RADIUS});
    margin-left: 8px;
    margin-right: calc(${CssVars.INPUT_INDENT} * -1 + 4px);
    opacity: 0;
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    overflow: hidden;

    &[data-clear=true] {
        > svg {
            fill: ${CssVars.DANGER_COLOR};
        }
    }

    &[data-disabled=true] {
        display: none;
    }

    &:before {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: transparent;
        z-index: -1;
        transition: background-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;

export const DropdownStick = (props: {
	valueAssigned: boolean;
	clearable: boolean;
	clear: (event: MouseEvent<HTMLSpanElement>) => void;
	disabled: boolean;
}) => {
	const {valueAssigned, clearable, clear, disabled, ...rest} = props;

	const onClearClicked = (event: MouseEvent<HTMLSpanElement>) => {
		clear(event);
	};

	if (valueAssigned && clearable) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return <DropdownStickContainer data-clear={true} data-disabled={disabled} onClick={onClearClicked} {...rest}>
			<DropdownStickClear/>
		</DropdownStickContainer>;
	} else {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return <DropdownStickContainer data-disabled={disabled} {...rest}>
			<DropdownStickCaret/>
		</DropdownStickContainer>;
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

// noinspection CssUnresolvedCustomProperty
const DropdownPopupContainer = styled.div.attrs<Omit<DropdownPopupProps, 'children'>>(
	({
		 atBottom, shown, vScroll, hScroll,
		 top, left, height, minWidth, maxWidth, minHeight, maxHeight
	 }) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-dropdown-popup',
			'data-v-scroll': vScroll ? '' : (void 0),
			'data-h-scroll': hScroll ? '' : (void 0),
			'data-at-bottom': atBottom,
			style: {
				'--opacity': shown ? 1 : 0,
				'--pointer-events': shown ? 'auto' : 'none',
				'--top': atBottom ? toCssSize(shown ? (top + height + 3) : (top + height + 29)) : 'unset',
				'--bottom': atBottom ? 'unset' : toCssSize(shown ? `calc(100vh - ${top}px + 3px)` : `calc(100vh - ${top}px + 29px)`),
				'--left': toCssSize(left),
				'--min-width': toCssSize(minWidth),
				'--max-width': toCssSize(maxWidth),
				'--min-height': toCssSize(minHeight),
				'--max-height': toCssSize(maxHeight),
				'--overflow-y': vScroll ? 'auto' : 'hidden',
				'--overflow-x': hScroll ? 'auto' : 'hidden'
			}
		};
	})<Omit<DropdownPopupProps, 'children'>>`
    display: block;
    position: fixed;
    top: var(--top);
    left: var(--left);
    bottom: var(--bottom);
    min-width: var(--min-width);
    max-width: var(--max-width);
    min-height: var(--min-height);
    max-height: var(--max-height);
    color: ${CssVars.FONT_COLOR};
    background-color: ${CssVars.BACKGROUND_COLOR};
    border: ${CssVars.BORDER};
    border-color: ${CssVars.PRIMARY_COLOR};
    border-radius: ${CssVars.BORDER_RADIUS};
    box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, top ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, bottom ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    z-index: ${CssVars.DROPDOWN_Z_INDEX};
    overflow-x: var(--overflow-x);
    overflow-y: var(--overflow-y);
    opacity: var(--opacity);
    pointer-events: var(--pointer-events);
`;

export interface DropdownPopupProps extends DropdownPopupState, Partial<DeviceTags> {
	shown: boolean;
	vScroll?: boolean;
	hScroll?: boolean;
	children?: ReactNode;
}

export const DropdownPopup = forwardRef((props: DropdownPopupProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		shown, vScroll, hScroll, children,
		...state
	} = props;

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
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
				// try to move left
				let left = pl + pw - width;
				let maxWidth = width;
				// out of left side
				if (left <= 2) {
					// try to move based on window, and absorb on the right of window
					left = window.innerWidth - width - 2;
				}
				if (left <= 2) {
					// still out of left side, make popup use the max width
					left = 2;
					maxWidth = window.innerWidth - 4;
				}
				setPopupState(state => ({...state, active: DropdownPopupStateActive.ACTIVE, left, maxWidth}));
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

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
export const useFilterableDropdownOptions = <V extends any>(props: OptionItemsProps<V>) => {
	const {
		optionSort,
		noAvailable = <IntlLabel keys={['options', 'noAvailable']} value="No available options."/>,
		noMatched = <IntlLabel keys={['options', 'noMatched']} value="No matched options."/>,
		$wrapped: {$avs: {$disabled}}
	} = props;

	const filterInputRef = useRef<HTMLInputElement>(null);
	const [filter, setFilter] = useState('');
	const [functions] = useState(() => {
		return {
			afterPopupShown: () => filterInputRef.current?.focus(),
			afterPopupHide: () => setTimeout(() => setFilter(''), 100)
		};
	});
	const {
		containerRef, popupRef,
		popupState, setPopupState,
		popupShown, setPopupShown
	} = useDropdownControl({
		askPopupMaxHeight: () => 8 * CssVars.INPUT_HEIGHT_VALUE + 2,
		afterPopupShown: functions.afterPopupShown,
		afterPopupHide: functions.afterPopupHide
	});

	const {askOptions, createAskDisplayOptions} = useOptionItems({...props, noAvailable});
	const askDisplayOptions = createAskDisplayOptions(() => {
		return VUtils.isNotBlank(filter) || optionSort != null;
	}, (options: OptionItems<V>): OptionItems<V> => {
		const transformed = options.map(option => {
			let str = '';
			if (option.stringify != null) {
				str = option.stringify(option);
			} else if (['string', 'number', 'boolean'].includes(typeof option.label)) {
				str = `${option.label}`;
			}
			return {str: (str || '').toLowerCase(), option};
		});
		let remained = transformed;
		if (VUtils.isNotBlank(filter)) {
			const filterText = filter.trim().toLowerCase();
			remained = transformed.filter(({str}) => str.includes(filterText));
		}
		if (optionSort == OptionItemSort.ASC) {
			remained.sort((a, b) => a.str.localeCompare(b.str));
		} else if (optionSort == OptionItemSort.DESC) {
			remained.sort((a, b) => b.str.localeCompare(a.str));
		}
		return remained.length === 0
			? [{value: NO_MATCHED_OPTION_ITEM, label: noMatched}] as OptionItems<V>
			: remained.map(({option}) => option);
	});
	const displayOptions = askDisplayOptions();
	const popupHeight = Math.min(displayOptions.length, 8) * CssVars.INPUT_HEIGHT_VALUE + 2;

	const repaintPopup = () => {
		if ($disabled) {
			return;
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const {top, left, width, height} = getDropdownPosition(containerRef.current!);
		const bottom = isPopupAtBottom(top, height, () => popupHeight);
		setPopupState(state => ({
			...state,
			active: DropdownPopupStateActive.WILL_ACTIVE, atBottom: bottom,
			top, left, width, height,
			minWidth: width, minHeight: popupHeight, maxHeight: popupHeight
		}));
	};

	const onClicked = () => {
		if ($disabled || isDropdownPopupActive(popupState.active)) {
			return;
		}
		repaintPopup();
	};
	const onFocused = () => {
		if ($disabled || isDropdownPopupActive(popupState.active)) {
			return;
		}
		filterInputRef.current?.focus();
	};
	const onKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
		if (!isDropdownPopupActive(popupState.active)) {
			return;
		}
		const {key} = event;
		if (key === 'Escape') {
			setFilter('');
		}
	};
	const onFilterChanged = (event: ChangeEvent<HTMLInputElement>) => {
		if ($disabled) {
			return;
		}
		setFilter(event.target.value);
	};

	return {
		filterInputRef, filter, setFilter,
		askOptions, askDisplayOptions, displayOptions,
		containerRef, popupState, setPopupState, popupHeight,
		popupRef, popupShown, setPopupShown, afterPopupStateChanged: functions,
		repaintPopup,
		onClicked, onFocused, onKeyUp, onFilterChanged
	};
};
