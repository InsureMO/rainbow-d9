import {
	BaseModel,
	MUtils,
	PPUtils,
	PropValue,
	registerWidget,
	useForceUpdate,
	useWrapperEventBus,
	ValueChangeableNodeDef,
	VUtils,
	WidgetProps,
	WrapperEventTypes
} from '@rainbow-d9/n1';
import React, {ChangeEvent, KeyboardEvent, MouseEvent, ReactNode, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {CssVars} from './constants';
import {
	DropdownContainer,
	DropdownLabel,
	DropdownPopup,
	DropdownPopupState,
	DropdownPopupStateActive,
	DropdownStick,
	getDropdownPosition,
	isDropdownPopupActive,
	isPopupAtBottom,
	useDropdownControl
} from './dropdown-assist';
import {OmitHTMLProps, OmitNodeDef} from './types';

export type DropdownOptionValue = string | number | boolean;

/**
 * property "key" is optional, it is required when "value" is object or something else which cannot use as identity.
 */
export interface DropdownOption {
	value: DropdownOptionValue;
	label: ReactNode;
	stringify?: (option: DropdownOption) => string;
}

export type DropdownOptions = Array<DropdownOption>;

export enum DropdownOptionSort {
	ASC, DESC
}

/** Input configuration definition */
export type DropdownDef = ValueChangeableNodeDef & OmitHTMLProps<HTMLDivElement> & {
	/**
	 * Function will be invoked when it is changed, be careful!
	 * Might lead endless rendering loop.
	 */
	options: DropdownOptions
		| (<R extends BaseModel, M extends PropValue>(options: { root: R, model: M }) => Promise<DropdownOptions>);
	optionSort?: DropdownOptionSort;
	please?: ReactNode;
	noAvailable?: ReactNode;
	noMatched?: ReactNode;
	clearable?: boolean;
};
export type OnDropdownValueChange = <NV extends PropValue>(newValue: NV, option?: DropdownOption) => void;
/** Input widget definition, with html attributes */
export type DropdownProps = OmitNodeDef<DropdownDef> & Omit<WidgetProps, '$wrapped'> & {
	$wrapped: Omit<WidgetProps['$wrapped'], '$onValueChange'> & {
		$onValueChange: OnDropdownValueChange;
	}
};
/**
 * return this to refresh dropdown options, only works on options is a promise function.
 */
export const REACTION_REFRESH_DROPDOWN_OPTIONS = 'reaction-refresh-dropdown-options';

interface Candidates {
	initialized: boolean;
	options: DropdownOptions;
}

const OptionFilter = styled.div.attrs<Omit<DropdownPopupState, 'active'> & { active: boolean }>(
	({active, atBottom, top, left, height}) => {
		return {
			'data-w': 'd9-dropdown-option-filter',
			style: {
				opacity: active ? 1 : 0,
				top: atBottom ? (top + height - 10) : (void 0),
				bottom: atBottom ? (void 0) : `calc(100vh - ${top}px - 10px)`,
				left: left - 10
			}
		};
	})<Omit<DropdownPopupState, 'active'> & { active: boolean }>`
	display        : flex;
	position       : fixed;
	align-items    : center;
	height         : calc(${CssVars.INPUT_HEIGHT} / 5 * 4);
	padding        : 0 ${CssVars.INPUT_INDENT};
	border-radius  : ${CssVars.BORDER_RADIUS};
	overflow       : hidden;
	white-space    : nowrap;
	text-overflow  : ellipsis;
	pointer-events : none;
	z-index        : calc(${CssVars.DROPDOWN_Z_INDEX} + 1);
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : ${CssVars.INFO_COLOR};
		border-radius    : ${CssVars.BORDER_RADIUS};
		opacity          : 0.9;
		z-index          : -1;
	}
	> span:first-child {
		color        : ${CssVars.INVERT_COLOR};
		font-weight  : ${CssVars.FONT_BOLD};
		margin-right : 4px;
	}
	> input {
		border           : 0;
		outline          : none;
		background-color : transparent;
		color            : ${CssVars.INVERT_COLOR};
		caret-color      : transparent;
		caret-shape      : revert;
	}
`;
const Option = styled.span.attrs({'data-w': 'd9-dropdown-option'})`
	display       : flex;
	align-items   : center;
	padding       : 0 ${CssVars.INPUT_INDENT};
	height        : ${CssVars.INPUT_HEIGHT};
	overflow      : hidden;
	white-space   : nowrap;
	text-overflow : ellipsis;
	&[data-can-click=false] {
		cursor : default;
	}
	&:hover {
		background-color : ${CssVars.HOVER_COLOR};
	}
`;

const NO_MATCHED = '__no_matched__';
const NO_AVAILABLE = '__no_available__';

export const Dropdown = (props: DropdownProps) => {
	const {
		options = [], optionSort,
		$pp, $wrapped: {$onValueChange, $root, $model, $p2r, $avs: {$disabled, $visible}},
		please = '', noAvailable = 'No available options.', noMatched = 'No matched options.', clearable = true,
		...rest
	} = props;

	const filterInputRef = useRef<HTMLInputElement>(null);
	const {on: onWrapper, off: offWrapper} = useWrapperEventBus();
	const [candidates, setCandidates] = useState<Candidates>((): Candidates => {
		return {initialized: false, options: []};
	});
	const [filter, setFilter] = useState('');
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (!candidates.initialized) {
			if (VUtils.isFunction(options)) {
				(async () => {
					setCandidates({initialized: true, options: await options({root: $root, model: $model})});
				})();
			} else {
				setCandidates({initialized: true, options: options ?? []});
			}
		} else if (!VUtils.isFunction(options) && options !== candidates.options) {
			setCandidates({initialized: true, options});
		}
	}, [candidates.initialized, candidates.options, options, $root, $model]);
	useEffect(() => {
		if (onWrapper != null && offWrapper != null) {
			// only works when it is wrapped by n1
			// eslint-disable-next-line  @typescript-eslint/no-explicit-any
			const onUnhandledReactionOccurred = (command: any) => {
				if (command !== REACTION_REFRESH_DROPDOWN_OPTIONS) {
					return;
				}
				setCandidates(candidates => ({initialized: false, options: candidates.options}));
			};
			onWrapper(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, onUnhandledReactionOccurred);
			return () => {
				offWrapper(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, onUnhandledReactionOccurred);
			};
		}
	}, [onWrapper, offWrapper]);

	const askOptions = (): DropdownOptions => {
		return candidates.initialized ? candidates.options : (VUtils.isFunction(options) ? [] : (options ?? []));
	};
	const askDisplayOptions = () => {
		const options = askOptions();
		if (options.length === 0) {
			return [{value: NO_AVAILABLE, label: noAvailable}];
		}
		if (VUtils.isNotBlank(filter) || optionSort != null) {
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
			return remained.length === 0 ? [{value: NO_MATCHED, label: noMatched}] : remained.map(({option}) => option);
		} else {
			return options;
		}
	};
	const displayOptions = askDisplayOptions();
	const [functions] = useState(() => {
		return {
			afterPopupShown: () => filterInputRef.current?.focus(),
			afterPopupHide: () => setTimeout(() => setFilter(''), 100)
		};
	});
	const popupHeight = Math.min(displayOptions.length, 8) * CssVars.INPUT_HEIGHT_VALUE + 2;
	const {containerRef, popupRef, popupState, setPopupState, popupShown, setPopupShown} = useDropdownControl({
		askPopupMaxHeight: () => 8 * CssVars.INPUT_HEIGHT_VALUE + 2,
		afterPopupShown: functions.afterPopupShown,
		afterPopupHide: functions.afterPopupHide
	});

	const onClicked = () => {
		if ($disabled || isDropdownPopupActive(popupState.active)) {
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
	const onOptionClicked = (option: DropdownOption) => async (event: MouseEvent<HTMLSpanElement>) => {
		if ($disabled) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();
		await $onValueChange(option.value, option);
		setPopupShown(false);
		if (filter !== '') {
			setTimeout(() => setFilter(''), 100);
		}
		setTimeout(() => containerRef.current?.focus(), 100);
	};
	const onClearClicked = async (event: MouseEvent<HTMLSpanElement>) => {
		if ($disabled) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();
		const value = MUtils.getValue($model, $pp) as DropdownOptionValue;
		if (value != null) {
			await $onValueChange(null, null);
		}
		if (!isDropdownPopupActive(popupState.active)) {
			// call click to show popup
			onClicked();
		} else {
			// simply force update
			forceUpdate();
		}
	};

	const value = MUtils.getValue($model, $pp) as DropdownOptionValue;
	const selected = value != null;
	const label = (value == null ? please : (askOptions().find(option => option.value == value)?.label ?? please)) || '';

	return <DropdownContainer active={popupState.active} atBottom={popupState.atBottom}
	                          ref={containerRef} role="input" tabIndex={0}
	                          {...rest}
	                          data-w="d9-dropdown"
	                          data-disabled={$disabled} data-visible={$visible}
	                          onFocus={onFocused} onClick={onClicked}
	                          id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}>
		<DropdownLabel data-please={!selected}>{label}</DropdownLabel>
		<DropdownStick valueAssigned={selected} clearable={clearable} clear={onClearClicked} disabled={$disabled} />
		{isDropdownPopupActive(popupState.active)
			? <DropdownPopup {...{...popupState, minHeight: popupHeight}}
			                 shown={popupShown && popupState.active === DropdownPopupStateActive.ACTIVE}
			                 vScroll={true} ref={popupRef}>
				<OptionFilter {...{...popupState, active: !!filter}}>
					<span>?:</span>
					<input value={filter} onChange={onFilterChanged} onKeyUp={onKeyUp}
					       ref={filterInputRef} />
				</OptionFilter>
				{displayOptions.map((option, index) => {
					const {value, label} = option;
					const canClick = ![NO_MATCHED, NO_AVAILABLE].includes(`${value}`);
					return <Option key={`${value}-${index}`} data-can-click={canClick}
					               onClick={canClick ? onOptionClicked(option) : (void 0)}>
						{label}
					</Option>;
				})}
			</DropdownPopup>
			: null}
	</DropdownContainer>;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
registerWidget({key: 'Dropdown', JSX: Dropdown, container: false, array: false});