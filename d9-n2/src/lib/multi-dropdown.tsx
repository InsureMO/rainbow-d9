import {
	MUtils,
	PPUtils,
	PropValue,
	registerWidget,
	useForceUpdate,
	ValueChangeableNodeDef,
	VUtils,
	WidgetProps
} from '@rainbow-d9/n1';
import React, {MouseEvent, ReactNode} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_KEY_WIDGET} from './constants';
import {
	DropdownContainer,
	DropdownLabel,
	DropdownPopup,
	DropdownPopupState,
	DropdownPopupStateActive,
	DropdownStick,
	isDropdownPopupActive
} from './dropdown-assist';
import {
	DROPDOWN_NO_AVAILABLE,
	DROPDOWN_NO_MATCHED,
	DropdownOption,
	DropdownOptionsDef,
	useFilterableDropdownOptions
} from './dropdown-options-assist';
import {Check, Times} from './icons';
import {OmitHTMLProps, OmitNodeDef} from './types';

export type MultiDropdownOptionValue = string | number;
export type MultiDropdownValue = MultiDropdownOptionValue | Array<MultiDropdownOptionValue>;

/** Input configuration definition */
export type MultiDropdownDef =
	ValueChangeableNodeDef
	& OmitHTMLProps<HTMLDivElement>
	& DropdownOptionsDef<MultiDropdownOptionValue>
	& {
	please?: ReactNode;
	clearable?: boolean;
};
/**
 * 1. new value should be an array or null
 * 2. option is currently selected, or null if it is clearing. when option is given, use select to identify that this option is add or remove value into model
 */
export type OnMultiDropdownValueChange = <NV extends PropValue>(newValue: NV, option: DropdownOption<MultiDropdownOptionValue> | null, select: boolean) => void | Promise<void>;
/** Input widget definition, with html attributes */
export type MultiDropdownProps = OmitNodeDef<MultiDropdownDef> & Omit<WidgetProps, '$wrapped'> & {
	$wrapped: Omit<WidgetProps['$wrapped'], '$onValueChange'> & {
		$onValueChange: OnMultiDropdownValueChange;
	}
};

const MultiDropdownContainer = styled(DropdownContainer)`
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
    margin: 2px 4px 2px 0;
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

const OptionFilter = styled.div.attrs<Omit<DropdownPopupState, 'active'> & { active: boolean }>(
	({active, atBottom, top, left, height}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-multi-dropdown-option-filter',
			style: {
				opacity: active ? 1 : 0,
				top: atBottom ? (top + height - 10) : (void 0),
				bottom: atBottom ? (void 0) : `calc(100vh - ${top}px - 10px)`,
				left: left - 10
			}
		};
	})<Omit<DropdownPopupState, 'active'> & { active: boolean }>`
    display: flex;
    position: fixed;
    align-items: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: calc(${CssVars.FONT_SIZE} - 2px);
    height: calc(${CssVars.INPUT_HEIGHT} / 5 * 4);
    padding: 0 ${CssVars.INPUT_INDENT};
    border-radius: ${CssVars.BORDER_RADIUS};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
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

    > span:first-child {
        color: ${CssVars.INVERT_COLOR};
        font-weight: ${CssVars.FONT_BOLD};
        margin-right: 4px;
    }

    > input {
        border: 0;
        outline: none;
        background-color: transparent;
        color: ${CssVars.INVERT_COLOR};
        caret-color: transparent;
        caret-shape: revert;
    }
`;
const MultiOption = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-multi-dropdown-option'})`
    display: flex;
    align-items: center;
    padding: 0 ${CssVars.INPUT_INDENT};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    height: ${CssVars.INPUT_HEIGHT};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

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

export const MultiDropdown = (props: MultiDropdownProps) => {
	const {
		// eslint-disable-next-line  @typescript-eslint/no-unused-vars
		options, optionSort, noAvailable, noMatched,
		$pp, $wrapped: {$onValueChange, $model, $p2r, $avs: {$disabled, $visible}},
		please = '', clearable = true,
		...rest
	} = props;

	const {
		askOptions, displayOptions,
		filterInputRef, filter, setFilter,
		containerRef,
		popupState, popupHeight,
		popupRef, popupShown, setPopupShown,
		repaintPopup,
		onClicked, onFocused, onKeyUp, onFilterChanged
	} = useFilterableDropdownOptions(props);
	const forceUpdate = useForceUpdate();

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
	const onOptionClicked = (option: DropdownOption<MultiDropdownOptionValue>) => async (event: MouseEvent<HTMLSpanElement>) => {
		if ($disabled) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();

		const values = currentValuesToArray();
		if (!hasValues(values)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await $onValueChange([option.value as any], option, true);
		} else if (!hasValue(option.value, values)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await $onValueChange([...values, option.value as any], option, true);
		} else {
			return;
		}
		if (values.length === askOptions().length) {
			setPopupShown(false);
		} else {
			repaintPopup();
		}
		if (filter !== '') {
			setTimeout(() => setFilter(''), 100);
		}
		setTimeout(() => containerRef.current?.focus(), 100);
	};
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
		const option = askOptions().find(option => option.value == value);
		await $onValueChange(values.filter(v => v != value) as unknown as PropValue, option ?? null, false);
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
			await $onValueChange(null, null, true);
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
	// const label = (values == null ? please : (askOptions().find(option => option.value == values)?.label ?? please)) || '';
	const optionsAsMap = askOptions().reduce((map, option) => {
		map[`${option.value}`] = option;
		return map;
	}, {} as Record<string, DropdownOption<MultiDropdownOptionValue>>);

	return <MultiDropdownContainer active={popupState.active} atBottom={popupState.atBottom}
	                               ref={containerRef} role="input" tabIndex={0}
	                               {...rest}
	                               data-w="d9-multi-dropdown"
	                               data-disabled={$disabled} data-visible={$visible}
	                               onFocus={onFocused} onClick={onClicked}
	                               id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}>
		{values.map(value => {
			const v = `${value}`;
			return <MultiDropdownLabel data-please={false} key={v}>
				<span>{optionsAsMap[v]?.label}</span>
				{$disabled ? null : <span onClick={onRemoveClicked(value)}><Times/></span>}
			</MultiDropdownLabel>;
		})}
		<DropdownLabel data-please={true}>{please}</DropdownLabel>
		<MultiDropdownStick valueAssigned={selected} clearable={clearable} clear={onClearClicked} disabled={$disabled}/>
		{isDropdownPopupActive(popupState.active)
			? <DropdownPopup {...{...popupState, minHeight: popupHeight}}
			                 shown={popupShown && popupState.active === DropdownPopupStateActive.ACTIVE}
			                 vScroll={true} ref={popupRef}>
				<OptionFilter {...{...popupState, active: !!filter}}>
					<span>?:</span>
					<input value={filter} onChange={onFilterChanged} onKeyUp={onKeyUp}
					       ref={filterInputRef}/>
				</OptionFilter>
				{displayOptions.map((option, index) => {
					const {value, label} = option;
					const canClick = ![DROPDOWN_NO_MATCHED, DROPDOWN_NO_AVAILABLE].includes(`${value}`);
					const selected = values.includes(value);
					return <MultiOption key={`${value}-${index}`} data-can-click={canClick}
					                    onClick={canClick ? onOptionClicked(option) : (void 0)}>
						<span>{label}</span>
						{selected ? <Check/> : null}
					</MultiOption>;
				})}
			</DropdownPopup>
			: null}
	</MultiDropdownContainer>;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
registerWidget({key: 'MultiDropdown', JSX: MultiDropdown, container: false, array: false});
