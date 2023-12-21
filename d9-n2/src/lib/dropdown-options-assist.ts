import {BaseModel, PropValue, useWrapperEventBus, VUtils, WidgetProps, WrapperEventTypes} from '@rainbow-d9/n1';
import {ChangeEvent, KeyboardEvent, ReactNode, useEffect, useRef, useState} from 'react';
import {CssVars, I18NVars} from './constants';
import {
	DropdownPopupStateActive,
	getDropdownPosition,
	isDropdownPopupActive,
	isPopupAtBottom,
	useDropdownControl
} from './dropdown-assist';

/**
 * property "key" is optional, it is required when "value" is object or something else which cannot use as identity.
 */
export interface DropdownOption<V> {
	value: V;
	label: ReactNode;
	stringify?: (option: DropdownOption<V>) => string;
}

export type DropdownOptions<V> = Array<DropdownOption<V>>;

export enum DropdownOptionSort {
	ASC, DESC
}

export interface DropdownOptionsDef<V> {
	/**
	 * Function will be invoked when it is changed, be careful!
	 * Might lead endless rendering loop.
	 */
	options: DropdownOptions<V>
		| (<R extends BaseModel, M extends PropValue>(options: { root: R, model: M }) => Promise<DropdownOptions<V>>);
	optionSort?: DropdownOptionSort;
	noAvailable?: ReactNode;
	noMatched?: ReactNode;
	$wrapped: Omit<WidgetProps['$wrapped'], '$onValueChange'>;
}

export const DROPDOWN_NO_OPTIONS = [];
export const DROPDOWN_NO_MATCHED = '__no_matched__';
export const DROPDOWN_NO_AVAILABLE = '__no_available__';

export type OnDropdownValueChange<V> = <NV extends PropValue>(newValue: NV, option?: DropdownOption<V>) => void | Promise<void>;

/**
 * return this to refresh dropdown options, only works on options is a promise function.
 */
export const REACTION_REFRESH_DROPDOWN_OPTIONS = 'reaction-refresh-dropdown-options';

export interface DropdownOptionsCandidates<V> {
	initialized: boolean;
	options: DropdownOptions<V>;
}

export const useDropdownOptions = <V>(props: DropdownOptionsDef<V>) => {
	const {
		options = DROPDOWN_NO_OPTIONS, noAvailable = I18NVars.OPTIONS.NO_AVAILABLE,
		$wrapped: {$root, $model}
	} = props;

	const {on, off} = useWrapperEventBus();
	const [candidates, setCandidates] = useState<DropdownOptionsCandidates<V>>((): DropdownOptionsCandidates<V> => {
		return {initialized: false, options: DROPDOWN_NO_OPTIONS};
	});
	useEffect(() => {
		if (!candidates.initialized) {
			if (VUtils.isFunction(options)) {
				(async () => {
					setCandidates({initialized: true, options: await options({root: $root, model: $model})});
				})();
			} else {
				setCandidates({initialized: true, options: options ?? DROPDOWN_NO_OPTIONS});
			}
		} else if (!VUtils.isFunction(options) && options !== candidates.options) {
			setCandidates({initialized: true, options});
		}
	}, [candidates.initialized, candidates.options, options, $root, $model]);
	useEffect(() => {
		if (on != null && off != null) {
			// only works when it is wrapped by n1
			// eslint-disable-next-line  @typescript-eslint/no-explicit-any
			const onUnhandledReactionOccurred = (command: any) => {
				if (command !== REACTION_REFRESH_DROPDOWN_OPTIONS) {
					return;
				}
				setCandidates(candidates => ({initialized: false, options: candidates.options}));
			};
			on(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, onUnhandledReactionOccurred);
			return () => {
				off(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, onUnhandledReactionOccurred);
			};
		}
	}, [on, off]);

	const askOptions = (): DropdownOptions<V> => {
		return candidates.initialized ? candidates.options : (VUtils.isFunction(options) ? DROPDOWN_NO_OPTIONS : (options ?? DROPDOWN_NO_OPTIONS));
	};
	const createAskDisplayOptions = (shouldTakeOver?: () => boolean, takeOver?: (options: DropdownOptions<V>) => DropdownOptions<V>): (() => DropdownOptions<V>) => {
		return () => {
			const options = askOptions();
			if (options.length === 0) {
				return [{value: DROPDOWN_NO_AVAILABLE, label: noAvailable}] as DropdownOptions<V>;
			}
			if (shouldTakeOver != null && shouldTakeOver()) {
				return takeOver != null ? takeOver(options) : options;
			} else {
				return options;
			}
		};
	};

	return {askOptions, createAskDisplayOptions};
};

export const useFilterableDropdownOptions = <V>(props: DropdownOptionsDef<V>) => {
	const {
		optionSort, noMatched = I18NVars.OPTIONS.NO_MATCHED,
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
	const {containerRef, popupRef, popupState, setPopupState, popupShown, setPopupShown} = useDropdownControl({
		askPopupMaxHeight: () => 8 * CssVars.INPUT_HEIGHT_VALUE + 2,
		afterPopupShown: functions.afterPopupShown,
		afterPopupHide: functions.afterPopupHide
	});

	const {askOptions, createAskDisplayOptions} = useDropdownOptions(props);
	const askDisplayOptions = createAskDisplayOptions(() => {
		return VUtils.isNotBlank(filter) || optionSort != null;
	}, (options: DropdownOptions<V>): DropdownOptions<V> => {
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
		if (optionSort == DropdownOptionSort.ASC) {
			remained.sort((a, b) => a.str.localeCompare(b.str));
		} else if (optionSort == DropdownOptionSort.DESC) {
			remained.sort((a, b) => b.str.localeCompare(a.str));
		}
		return remained.length === 0
			? [{value: DROPDOWN_NO_MATCHED, label: noMatched}] as DropdownOptions<V>
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
		popupRef, popupShown, setPopupShown,
		repaintPopup,
		onClicked, onFocused, onKeyUp, onFilterChanged
	};
};