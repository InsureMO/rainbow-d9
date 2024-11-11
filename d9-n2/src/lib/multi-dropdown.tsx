import {
	MBUtils,
	MUtils,
	PPUtils,
	PropValue,
	registerWidget,
	useForceUpdate,
	ValueChangeableNodeDef,
	VUtils,
	WidgetProps
} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, MouseEvent, ReactNode} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_KEY_WIDGET} from './constants';
import {
	DropdownContainer,
	DropdownLabel,
	DropdownPopup,
	DropdownPopupStateActive,
	DropdownStick,
	isDropdownPopupActive,
	OptionFilter,
	useExternalFilteringDropdown,
	useFilterableDropdownOptions
} from './dropdown-assist';
import {buildTip, GlobalHandlers, TipAttachableWidget, useGlobalHandlers, useTip} from './global';
import {Check, Search, Spinner, Times} from './icons';
import {toIntlLabel} from './intl-label';
import {
	NO_AVAILABLE_OPTION_ITEM,
	NO_MATCHED_OPTION_ITEM,
	OptionItem,
	OptionItems,
	OptionItemsDef
} from './option-items-assist';
import {SDP} from './styled-components-styles';
import {OmitHTMLProps, OmitNodeDef} from './types';
import {useDualRefs} from './utils';

export type MultiDropdownOptionValue = string | number;
export type MultiDropdownValue = MultiDropdownOptionValue | Array<MultiDropdownOptionValue>;
export type MultiDropdownOption = OptionItem<MultiDropdownOptionValue>;
export type MultiDropdownOptions = OptionItems<MultiDropdownOptionValue>;

/** Input configuration definition */
export type MultiDropdownDef =
	ValueChangeableNodeDef
	& TipAttachableWidget
	& OmitHTMLProps<HTMLDivElement>
	& OptionItemsDef<MultiDropdownOptionValue>
	& {
	please?: ReactNode;
	clearable?: boolean;
	filterable?: boolean;
	/** external handler for filter change */
	filterChanged?: (filter: string, options: { global: GlobalHandlers }) => Promise<void>;
	/** max popup width */
	maxWidth?: number;
};
/** widget definition, with html attributes */
export type MultiDropdownProps = OmitNodeDef<MultiDropdownDef> & WidgetProps;

const MultiDropdownContainer = styled(DropdownContainer)`
    align-self: start;
    flex-wrap: wrap;
    height: unset;
    min-height: ${CssVars.INPUT_HEIGHT};
    padding-right: calc(${CssVars.INPUT_HEIGHT} - ${CssVars.INPUT_INDENT} + 4px);
`;

const MultiDropdownLabel = styled(DropdownLabel)`
    flex-grow: unset;
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    color: ${CssVars.FONT_COLOR};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    height: unset;
    min-height: calc(${CssVars.INPUT_HEIGHT} - 6px);
    padding: 0 calc(${CssVars.INPUT_INDENT} / 2);
    margin: 2px 8px 2px -4px;
    white-space: normal;

    > span:first-child {
        display: flex;
        position: relative;
        flex-grow: 1;
        align-items: center;
    }

    > span:last-child {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        height: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
        width: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
        opacity: 0.2;
        transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

        > svg {
            height: calc(${CssVars.INPUT_HEIGHT} * 2 / 5);
            width: calc(${CssVars.INPUT_HEIGHT} * 2 / 5);
            fill: ${CssVars.DANGER_COLOR};
        }
    }

    &:hover {
        > span:last-child {
            opacity: 0.6;

            &:hover {
                opacity: 1;
            }
        }
    }
`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MultiDropdownStick = styled(DropdownStick as any)`
    position: absolute;
    right: ${CssVars.INPUT_INDENT};
`;

const MultiOption = styled.span.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-multi-dropdown-option'})`
    display: flex;
    position: relative;
    align-items: center;
    padding: calc(${CssVars.INPUT_HEIGHT} / 8) ${CssVars.INPUT_INDENT};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    line-height: calc(${CssVars.FONT_SIZE} * 1.4);
    min-height: ${CssVars.INPUT_HEIGHT};
    cursor: pointer;
    //overflow: hidden;
    //white-space: nowrap;
    //text-overflow: ellipsis;

    > span:first-child {
        display: flex;
        position: relative;
        flex-grow: 1;
        align-items: center;
    }

    > svg:last-child {
        fill: ${CssVars.PRIMARY_COLOR};
        height: calc(${CssVars.INPUT_HEIGHT} / 3);
        width: calc(${CssVars.INPUT_HEIGHT} / 3);
        min-width: calc(${CssVars.INPUT_HEIGHT} / 3);
        margin-left: 8px;
        margin-right: calc(${CssVars.INPUT_INDENT} * -1 + 12px);
        opacity: 0.7;
    }

    &[data-can-click=false] {
        cursor: default;
    }

    &:hover {
        background-color: ${CssVars.HOVER_COLOR};
    }
`;

export const MultiDropdown = forwardRef((props: MultiDropdownProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		options, optionSort, noAvailable, noMatched,
		$pp, $wrapped: {$onValueChange, $root, $model, $p2r, $avs: {$disabled, $visible}},
		please = '', clearable = true, filterChanged,
		tip,
		...rest
	} = props;

	const globalHandlers = useGlobalHandlers();
	const {filterChanged: externalFilterChanged, externalFilteringNow} = useExternalFilteringDropdown(filterChanged);
	const {
		askOptions, displayOptions,
		filterInputRef, filter, onFilterChanged, active: filterActive,
		containerRef,
		popupState, popupHeight,
		popupRef, popupShown,
		repaintPopup,
		onClicked, onFocused, onKeyUp, onAnyInputEvent, onCompositionStart, onCompositionEnd
	} = useFilterableDropdownOptions({...props, filterChanged: externalFilterChanged});
	const forceUpdate = useForceUpdate();
	useDualRefs(containerRef, ref);
	useTip({ref: containerRef, ...buildTip({tip, root: $root, model: $model})});

	const currentValuesToArray = (): Array<MultiDropdownOptionValue> => {
		const values = MUtils.getValue($model, $pp) as MultiDropdownValue;
		if (values == null) {
			return [];
		} else if (VUtils.isPrimitive(values)) {
			return [values as MultiDropdownOptionValue];
		} else {
			return values as Array<MultiDropdownOptionValue>;
		}
	};
	// noinspection DuplicatedCode
	const hasValues = (values: Array<MultiDropdownOptionValue>): boolean => {
		if (values == null) {
			return false;
		} else if (typeof values === 'string') {
			return VUtils.isNotEmpty(values);
		} else if (Array.isArray(values)) {
			return values.length !== 0;
		}
		return true;
	};
	const hasValue = (value: MultiDropdownOptionValue, values: Array<MultiDropdownOptionValue>): boolean => {
		if (value == null) {
			return true;
		} else if (values == null) {
			return false;
		} else {
			return values.some(v => v == value);
		}
	};
	const onOptionClicked = (option: MultiDropdownOption) => async (event: MouseEvent<HTMLSpanElement>) => {
		if ($disabled) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();

		const values = currentValuesToArray();
		// noinspection DuplicatedCode
		if (!hasValues(values)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await $onValueChange([option.value as any], true, {global: globalHandlers});
		} else if (!hasValue(option.value, values)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await $onValueChange([...values, option.value as any], true, {global: globalHandlers});
		} else {
			return;
		}
		repaintPopup();
		setTimeout(() => containerRef.current?.focus(), 30);
	};
	// noinspection DuplicatedCode
	const onRemoveClicked = (value: MultiDropdownOptionValue) => async (event: MouseEvent<HTMLSpanElement>) => {
		if ($disabled) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();

		const values = currentValuesToArray();
		if (!hasValues(values)) {
			return;
		}
		await $onValueChange(values.filter(v => v != value) as unknown as PropValue, true, {global: globalHandlers});
		repaintPopup();
	};
	const onClearClicked = async (event: MouseEvent<HTMLSpanElement>) => {
		if ($disabled) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();
		const values = currentValuesToArray();
		if (values != null && values.length !== 0) {
			await $onValueChange(null, true, {global: globalHandlers});
		}
		// simply force update, since height might be changed
		forceUpdate();
		if (!isDropdownPopupActive(popupState.active)) {
			// call click to show popup
			setTimeout(() => onClicked(), 100);
		} else {
			setTimeout(() => repaintPopup(), 100);
		}
	};

	const values = currentValuesToArray();
	const selected = values != null;
	const optionsAsMap = (askOptions() as MultiDropdownOptions)
		.reduce((map, option) => {
			map[`${option.value}`] = option;
			return map;
		}, {} as Record<string, MultiDropdownOption>);
	const deviceTags = MBUtils.pickDeviceTags(props);

	return <MultiDropdownContainer active={popupState.active} atBottom={popupState.atBottom}
	                               role="input" tabIndex={0}
	                               {...rest}
	                               data-w="d9-multi-dropdown"
	                               data-disabled={$disabled} data-visible={$visible}
	                               data-clearable={clearable}
	                               onFocus={onFocused} onClick={onClicked} onKeyDown={onAnyInputEvent}
	                               id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
	                               ref={containerRef}>
		{values.map(value => {
			const v = `${value}`;
			return <MultiDropdownLabel data-please={false} key={v}>
				<span>{toIntlLabel(optionsAsMap[v]?.label)}</span>
				{$disabled ? null : <span onClick={onRemoveClicked(value)}><Times/></span>}
			</MultiDropdownLabel>;
		})}
		<DropdownLabel data-please={true}>{toIntlLabel(please)}</DropdownLabel>
		<MultiDropdownStick valueAssigned={selected} clearable={clearable} clear={onClearClicked} disabled={$disabled}/>
		{isDropdownPopupActive(popupState.active)
			? <DropdownPopup {...{...popupState, minHeight: popupHeight}}
			                 shown={popupShown && popupState.active === DropdownPopupStateActive.ACTIVE}
			                 {...deviceTags}
			                 vScroll={true} ref={popupRef}>
				<OptionFilter {...{...popupState, active: filterActive}} data-w="d9-multi-dropdown-option-filter">
					<span>?:</span><span>{externalFilteringNow ? <Spinner/> : <Search/>}</span>
					<input value={filter} onChange={onFilterChanged}
					       onKeyUp={onKeyUp} onCompositionStart={onCompositionStart} onCompositionEnd={onCompositionEnd}
					       ref={filterInputRef}/>
				</OptionFilter>
				{displayOptions.map((option, index) => {
					const {value, label} = option;
					const canClick = ![NO_MATCHED_OPTION_ITEM, NO_AVAILABLE_OPTION_ITEM].includes(`${value}`);
					const selected = values.includes(value);
					return <MultiOption key={`${value}-${index}`} data-can-click={canClick}
					                    onClick={canClick ? onOptionClicked(option) : (void 0)}>
						<span>{toIntlLabel(label)}</span>
						{selected ? <Check/> : null}
					</MultiOption>;
				})}
			</DropdownPopup>
			: null}
	</MultiDropdownContainer>;
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
registerWidget({key: 'MultiDropdown', JSX: MultiDropdown, container: false, array: false});
