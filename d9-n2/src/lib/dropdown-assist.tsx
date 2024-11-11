import {
	DeviceTags,
	MBUtils,
	Undefinable,
	useCreateEventBus,
	useForceUpdate,
	useThrottler,
	useWrapperEventBus,
	VUtils,
	WrapperEventTypes
} from '@rainbow-d9/n1';
import React, {
	ChangeEvent,
	createContext,
	CSSProperties,
	ForwardedRef,
	forwardRef,
	Fragment,
	KeyboardEvent,
	MouseEvent,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState
} from 'react';
import {createPortal} from 'react-dom';
import styled, {keyframes} from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {GlobalHandlers, useGlobalHandlers} from './global';
import {useCollapseFixedThing} from './hooks';
import {CaretDown, Times} from './icons';
import {internationalize, IntlLabel, toIntlLabel} from './intl-label';
import {
	NO_MATCHED_OPTION_ITEM,
	OptionItem,
	OptionItems,
	OptionItemSort,
	OptionItemsProps,
	REACTION_REFRESH_OPTIONS,
	TreeOptionItem,
	TreeOptionItems,
	useOptionItems
} from './option-items-assist';
import {SDP, WSDP} from './styled-components-styles';
import {TreeEventTypes, useTreeEventBus} from './tree';
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
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any;
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

export const DropdownLabel = styled.span.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-dropdown-label'})`
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
        color: ${CssVars.PLACEHOLDER_COLOR};
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

export const DropdownStickContainer = styled.span.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-dropdown-stick'})`
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
	icon?: ReactNode;
}) => {
	const {valueAssigned, clearable, clear, disabled, icon, ...rest} = props;

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
			{icon == null ? <DropdownStickCaret/> : icon}
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
			} as CSSProperties
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
	onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
	children?: ReactNode;
}

export const DropdownPopup = forwardRef((props: DropdownPopupProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		shown, vScroll, hScroll, onKeyDown, children,
		...state
	} = props;

	if (DropdownDefaults.DEFAULTS.findPortalCarrier == null) {
		return <DropdownPopupContainer shown={shown} vScroll={vScroll} hScroll={hScroll}
		                               {...state} ref={ref}>
			{children}
		</DropdownPopupContainer>;
	} else {
		return createPortal(<DropdownPopupContainer shown={shown} vScroll={vScroll} hScroll={hScroll}
		                                            onKeyDown={onKeyDown}{...state}
		                                            ref={ref}>
			{children}
		</DropdownPopupContainer>, DropdownDefaults.DEFAULTS.findPortalCarrier());
	}
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

const MAX_WIDTH_MARGIN = 8;
export const useDropdownControl = (options: {
	askPopupMaxHeight: () => number;
	askPopupMaxWidth: () => Undefinable<number>;
	afterPopupShown?: () => void;
	afterPopupHide?: () => void;
	fixWidth?: boolean;
}) => {
	const {askPopupMaxHeight, askPopupMaxWidth, afterPopupShown, afterPopupHide, fixWidth = false} = options;

	const containerRef = useRef<HTMLDivElement>(null);
	const popupRef = useRef<HTMLDivElement>(null);
	const [popupState, setPopupState] = useState<DropdownPopupState>({
		active: DropdownPopupStateActive.HIDDEN, atBottom: true,
		top: 0, left: 0, width: 0, height: 0, minWidth: 0, maxHeight: askPopupMaxHeight()
	});
	const [popupShown, setPopupShown] = useState(false);
	const expectMaxWidth = askPopupMaxWidth();
	useEffect(() => {
		if (isDropdownPopupActive(popupState.active)) {
			setPopupShown(true);
			// in chrome, when the popup appears, its left is the same as the container’s left.
			// the width of the popup has two scenarios:
			// 1. if it is wide enough, it tries to avoid showing a vertical scrollbar but will not exceed the right side of the window.
			// 2. if it is unavoidable to show a vertical scrollbar, it will go up to the right side of the window at most.
			const {left, width} = popupRef.current.getBoundingClientRect();
			let toBeWidth = width;
			if (!fixWidth) {
				// use the max of popup width and container width
				const {width: containerWidth} = containerRef.current.getBoundingClientRect();
				// let popup at least use same width with container
				toBeWidth = Math.max(width, containerWidth);
				// first use tobe width to test
				popupRef.current.style.minWidth = `${toBeWidth}px`;
				const shouldAdjustWidth = (allowWordWrap: boolean) => {
					if (popupRef.current.scrollHeight === popupRef.current.clientHeight) {
						return false;
					}
					const children = popupRef.current.children;
					if (children.length <= 2) {
						return false;
					}
					const height = children.item(1).clientHeight;
					for (let index = 2, count = children.length; index < count; index++) {
						const child = children.item(index);
						if (child.clientHeight !== height) {
							// has word wrap, returns true represents need to be adjusted when not allow word wrap
							return !allowWordWrap;
						}
					}
					// no word wrap, returns true represents need to be adjusted when allow word wrap
					return allowWordWrap;
				};
				if (shouldAdjustWidth(false)) {
					// use the max of container width and expect max width
					// if expect max width is not given, use half of window width when in desktop, or use window width when in mobile
					const maxWidth = Math.max(containerWidth, expectMaxWidth ?? (MBUtils.isMobile() ? (window.innerWidth - MAX_WIDTH_MARGIN * 2) : (window.innerWidth / 2)));
					// vertical scrollbar exists, use max width as width
					popupRef.current.style.minWidth = `${maxWidth}px`;
					if (shouldAdjustWidth(true)) {
						// has word wrap, use max width
						toBeWidth = maxWidth;
					} else {
						// no word wrap, try to shrink width
						const widthDiff = maxWidth - toBeWidth;
						let ratio = 0.5;
						let offset = 0.5;
						let computedWidth = toBeWidth + widthDiff * ratio;
						while ((maxWidth - computedWidth > 10) && (computedWidth - toBeWidth > 10)) {
							popupRef.current.style.minWidth = `${computedWidth}px`;
							// after expand or shrink width, if there is word wrap, try to expand, otherwise try to shrink
							if (shouldAdjustWidth(false)) {
								// vertical scrollbar exist, expand ratio
								ratio = ratio + offset / 2;
							} else {
								// vertical scrollbar not exists, shrink ratio
								ratio = ratio - offset / 2;
							}
							offset = offset / 2;
							computedWidth = toBeWidth + widthDiff * ratio;
						}
						toBeWidth = computedWidth;
					}
				}
				// remove this temporary min width, it will be set after state changed
				popupRef.current.style.minWidth = '';
			}
			if (left + toBeWidth + MAX_WIDTH_MARGIN > window.innerWidth) {
				// popup is out of right side, try to move left
				const {left: parentLeft, width: parentWidth} = popupRef.current.parentElement.getBoundingClientRect();
				// use the container right side as right
				let left = parentLeft + parentWidth - toBeWidth;
				// out of left side
				if (left <= MAX_WIDTH_MARGIN) {
					// try to move based on window, and absorb on the right of window
					left = window.innerWidth - toBeWidth - MAX_WIDTH_MARGIN;
					if (left > MAX_WIDTH_MARGIN) {
						left = MAX_WIDTH_MARGIN;
					}
				}
				setPopupState(state => ({
					...state, active: DropdownPopupStateActive.ACTIVE,
					left, minWidth: toBeWidth, maxWidth: toBeWidth
				}));
			} else {
				setPopupState(state => ({...state, active: DropdownPopupStateActive.ACTIVE}));
			}
			afterPopupShown && afterPopupShown();
		}
	}, [popupState.active, afterPopupShown, expectMaxWidth, fixWidth]);
	useEffect(() => {
		if (!popupShown) {
			setPopupState(state => ({...state, active: DropdownPopupStateActive.HIDDEN}));
		}
	}, [popupShown]);
	useCollapseFixedThing({
		containerRef, popupRef,
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

export type ExternalFilterHandler = (filter: string, options: { global: GlobalHandlers }) => Promise<void>;

export const useExternalFilteringDropdown = (externalFilterHandle?: ExternalFilterHandler) => {
	const globalHandlers = useGlobalHandlers();
	const {fire: fireWrapper} = useWrapperEventBus();
	const {replace, clear} = useThrottler();
	const externalFiltering = useRef(false);
	const forceUpdate = useForceUpdate();

	const filterChanged = (externalFilterHandle == null)
		? (void 0)
		: async (filter: string, timing: 'hide' | 'search'): Promise<void> => {
			if (timing === 'hide' || VUtils.isBlank(filter)) {
				clear(false);
				if (externalFiltering.current !== false) {
					externalFiltering.current = false;
					forceUpdate();
				}
			} else {
				if (externalFiltering.current !== true) {
					externalFiltering.current = true;
					forceUpdate();
				}
				replace(async () => {
					try {
						if (externalFilterHandle != null) {
							await externalFilterHandle(filter, {global: globalHandlers});
							fireWrapper && fireWrapper(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, REACTION_REFRESH_OPTIONS);
						}
					} catch {
						// ignore error
					} finally {
						externalFiltering.current = false;
						forceUpdate();
					}
				}, 300);
			}
		};
	return {filterChanged, externalFilteringNow: externalFiltering.current};
};

export interface FilterableDropdownOptions<V> extends OptionItemsProps<V> {
	filterable?: boolean;
	takeoverFilter?: false;
	/** keep it in state, and do not change it */
	filterChanged?: (filter: string, timing: 'hide' | 'search') => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
export const useFilterableDropdownOptions = <V extends any>(props: FilterableDropdownOptions<V>) => {
	const {
		optionSort, maxWidth,
		noAvailable = <IntlLabel keys={['options', 'noAvailable']} value="No available option."/>,
		noMatched = <IntlLabel keys={['options', 'noMatched']} value="No matched option."/>,
		filterable = true, takeoverFilter, filterChanged,
		$wrapped: {$avs: {$disabled}}
	} = props;

	const filterInputRef = useRef<HTMLInputElement>(null);
	const compositionRef = useRef<{ ing: boolean; text?: string }>({ing: false});
	const [filter, setFilter] = useState('');
	const [functions] = useState(() => {
		return {
			afterPopupShown: () => filterInputRef.current?.focus(),
			afterPopupHide: () => setTimeout(async () => {
				setFilter('');
				filterChanged && (await filterChanged('', 'hide'));
			}, 100)
		};
	});
	const {
		containerRef, popupRef,
		popupState, setPopupState,
		popupShown, setPopupShown
	} = useDropdownControl({
		askPopupMaxHeight: () => 8 * CssVars.INPUT_HEIGHT_VALUE + 2,
		askPopupMaxWidth: () => maxWidth,
		afterPopupShown: functions.afterPopupShown,
		afterPopupHide: functions.afterPopupHide
	});
	const forceUpdate = useForceUpdate();

	const {askOptions, createAskDisplayOptions} = useOptionItems({...props, noAvailable});
	const askDisplayOptions = createAskDisplayOptions(() => {
		// if given takeover filter is false, then never do filter here
		// otherwise try to do filter now
		return (takeoverFilter ?? true) && VUtils.isNotBlank(filter) || optionSort != null;
	}, (options: OptionItems<V>): OptionItems<V> => {
		const transformed = options.map(option => {
			let str = '';
			if (option.stringify != null) {
				str = option.stringify(option);
			} else if (['string', 'number', 'boolean'].includes(typeof option.label)) {
				const label = `${option.label}`;
				str = internationalize(label, [label]);
			}
			return {str: (str || '').toLowerCase(), option};
		}) as Array<{ str: string, option: OptionItem<V> }>;
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
			? [{value: NO_MATCHED_OPTION_ITEM, label: toIntlLabel(noMatched)}] as OptionItems<V>
			: remained.map(({option}) => option);
	});
	const displayOptions = askDisplayOptions();
	const fixFilterExists = DropdownDefaults.DEFAULTS.FIX_FILTER
		&& (VUtils.isNotBlank(filter) || (compositionRef.current.ing && VUtils.isNotBlank(compositionRef.current.text)));
	const popupHeight = 2 + CssVars.INPUT_HEIGHT_VALUE * Math.min(displayOptions.length + (fixFilterExists ? 1 : 0), 8);

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
			minWidth: width, minHeight: popupHeight
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
	const onKeyUp = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (!isDropdownPopupActive(popupState.active)) {
			return;
		}
		const {key} = event;
		if (key === 'Escape') {
			setFilter('');
			filterChanged && (await filterChanged('', 'search'));
		}
	};
	const onFilterChanged = async (event: ChangeEvent<HTMLInputElement>) => {
		if ($disabled || filterable === false) {
			return;
		}
		if (compositionRef.current.ing) {
			// composition ing, sync to composition ref, and force update
			compositionRef.current = {ing: true, text: event.target.value};
			forceUpdate();
		} else {
			setFilter(event.target.value);
			filterChanged && (await filterChanged(event.target.value, 'search'));
		}
	};
	const onAnyInputEvent = (event: KeyboardEvent<HTMLElement>) => {
		if (filterable === false || event.target === filterInputRef.current) {
			return;
		}
		if (!isDropdownPopupActive(popupState.active)) {
			onClicked();
		}

		filterInputRef.current?.dispatchEvent(new Event('keydown', event));
		filterInputRef.current?.focus();
	};
	const displayValue = compositionRef.current.ing ? compositionRef.current.text : filter;
	const onCompositionStart = () => {
		compositionRef.current = {ing: true, text: displayValue};
	};
	const onCompositionEnd = async () => {
		compositionRef.current = {ing: false};
		setFilter(filterInputRef.current.value);
		filterChanged && (await filterChanged(filterInputRef.current.value, 'search'));
	};

	return {
		filterInputRef, filter: displayValue, setFilter,
		active: VUtils.isNotBlank(filter) || (compositionRef.current.ing && VUtils.isNotBlank(compositionRef.current.text)),
		askOptions, askDisplayOptions, displayOptions,
		containerRef, popupState, setPopupState, popupHeight,
		popupRef, popupShown, setPopupShown, afterPopupStateChanged: functions,
		repaintPopup,
		onClicked, onFocused, onKeyUp, onFilterChanged, onAnyInputEvent,
		onCompositionStart, onCompositionEnd
	};
};

const SpinnerKeyFrames = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

// noinspection CssUnresolvedCustomProperty
export const OptionFilter = styled.div.attrs<WSDP<Omit<DropdownPopupState, 'active'> & { active: boolean }>>(
	({
		 'data-w': widgetKey,
		 active, atBottom, top, left, height
	 }) => {
		const fixFilter = DropdownDefaults.DEFAULTS.FIX_FILTER ?? false;
		return {
			[DOM_KEY_WIDGET]: widgetKey,
			'data-filter-active': active,
			'data-fix-filter': fixFilter,
			style: {
				'--position': fixFilter ? 'sticky' : 'fixed',
				'--opacity': fixFilter ? 1 : (active ? 1 : 0),
				'--top': fixFilter ? 0 : (atBottom ? (top + height - 10) : (void 0)),
				'--bottom': fixFilter ? (void 0) : (atBottom ? (void 0) : `calc(100vh - ${top}px - 10px)`),
				'--left': fixFilter ? 0 : (left - 10),
				'--height': fixFilter ? (active ? CssVars.INPUT_HEIGHT : 0) : `calc(${CssVars.INPUT_HEIGHT} / 5 * 4)`,
				'--width': fixFilter ? '100%' : (void 0),
				'--font-size': fixFilter ? CssVars.FONT_SIZE : `calc(${CssVars.FONT_SIZE} - 2px)`,
				'--padding': fixFilter ? 0 : `0 ${CssVars.INPUT_INDENT}`,
				'--border-radius': fixFilter ? 0 : CssVars.BORDER_RADIUS
			} as CSSProperties
		};
	})<Omit<DropdownPopupState, 'active'> & { active: boolean }>`
    display: flex;
    position: var(--position);
    top: var(--top);
    bottom: var(--bottom);
    left: var(--left);
    align-items: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: var(--font-size);
    height: var(--height);
    width: var(--width);
    padding: var(--padding);
    border-radius: var(--border-radius);
    background-color: ${CssVars.BACKGROUND_COLOR};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    opacity: var(--opacity);
    z-index: calc(${CssVars.DROPDOWN_Z_INDEX} + 1);

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${CssVars.INFO_COLOR};
        border-radius: ${CssVars.BORDER_RADIUS};
        opacity: 0.9;
        z-index: -1;
    }

    &[data-fix-filter=true] {
        &[data-filter-active=true] {
            border-bottom: ${CssVars.BORDER};
        }

        &:before {
            display: none;
        }

        > span:first-child {
            display: none;
        }

        > span:nth-child(2) {
            display: flex;
        }

        > input {
            color: ${CssVars.FONT_COLOR};
            caret-color: unset;
            caret-shape: unset;
            padding: 0 ${CssVars.INPUT_INDENT};
            width: 100%;
            height: 100%;
        }
    }

    > span:first-child {
        color: ${CssVars.INVERT_COLOR};
        font-weight: ${CssVars.FONT_BOLD};
        margin-right: 4px;
    }

    > span:nth-child(2) {
        display: none;
        position: relative;
        align-items: center;
        justify-content: center;
        min-width: ${CssVars.INPUT_HEIGHT};
        height: 100%;
        border-right: ${CssVars.BORDER};
        color: ${CssVars.FONT_COLOR};
        fill: ${CssVars.FONT_COLOR};

        > svg {
            height: ${CssVars.FONT_SIZE};
            width: ${CssVars.FONT_SIZE};
        }

        > svg[data-icon=spinner] {
            animation: 2s linear infinite ${SpinnerKeyFrames};
        }
    }

    > input {
        font-size: var(--font-size);
        border-radius: 0;
        border: 0;
        outline: none;
        background-color: transparent;
        color: ${CssVars.INVERT_COLOR};
        caret-color: transparent;
        caret-shape: revert;
    }
`;

export enum DropdownTreeEventTypes {
	FILTER_CHANGED = 'filter-changed',
}

export interface DropdownTreeEventBus {
	fire(type: DropdownTreeEventTypes.FILTER_CHANGED, filter: string): this;

	on(type: DropdownTreeEventTypes.FILTER_CHANGED, listener: (filter: string) => void): this;

	off(type: DropdownTreeEventTypes.FILTER_CHANGED, listener: (filter: string) => void): this;
}

const Context = createContext<DropdownTreeEventBus>({} as DropdownTreeEventBus);
Context.displayName = 'DropdownTreeEventBus';

export const DropdownTreeEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<DropdownTreeEventBus>('dropdown-tree');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useDropdownTreeEventBus = () => useContext(Context);

export const DropdownTreeFilterBridge = () => {
	const {on, off} = useDropdownTreeEventBus();
	const {fire} = useTreeEventBus();
	useEffect(() => {
		const onFilterChanged = (filter: string) => {
			fire(TreeEventTypes.FILTER_CHANGED, filter);
		};
		on(DropdownTreeEventTypes.FILTER_CHANGED, onFilterChanged);
		return () => {
			off(DropdownTreeEventTypes.FILTER_CHANGED, onFilterChanged);
		};
	}, [on, off, fire]);

	return <Fragment/>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const computeDropdownTreePopupHeight = (allOptions: TreeOptionItems<any>, filter?: string): number => {
	const allOptionCount = (() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const countMeAndChildren = (option: TreeOptionItem<any>) => {
			// 1 is self
			return 1 + (option.children ?? []).reduce((count, option) => {
				return count + countMeAndChildren(option);
			}, 0);
		};
		return allOptions.reduce((count, option) => {
			return count + countMeAndChildren(option);
		}, 0);
	})();
	const fixFilterExists = DropdownDefaults.DEFAULTS.FIX_FILTER && VUtils.isNotBlank(filter);
	return 2 + CssVars.INPUT_HEIGHT_VALUE * Math.min(allOptionCount + (fixFilterExists ? 1 : 0), 8);
};

interface DropdownDefaultsTypes {
	DEFAULTS: {
		FIX_FILTER: boolean;
		findPortalCarrier?: () => HTMLElement;
	};
}

export const DropdownDefaults: DropdownDefaultsTypes = {
	DEFAULTS: {FIX_FILTER: false}
};
export const DropdownUtils = {
	setDropdownDefaults: (defaults: {
		fixFilter?: boolean;
		/**
		 * carrier must have styles of dropdown widgets
		 */
		findPortalCarrier?: () => HTMLElement;
	}) => {
		DropdownDefaults.DEFAULTS.FIX_FILTER = defaults.fixFilter ?? DropdownDefaults.DEFAULTS.FIX_FILTER;
		DropdownDefaults.DEFAULTS.findPortalCarrier = defaults.findPortalCarrier;
	}
};
