import {MUtils, PPUtils, registerWidget, useForceUpdate, ValueChangeableNodeDef, WidgetProps} from '@rainbow-d9/n1';
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
	isDropdownPopupActive,
	useFilterableDropdownOptions
} from './dropdown-assist';
import {
	NO_AVAILABLE_OPTION_ITEM,
	NO_MATCHED_OPTION_ITEM,
	OnOptionValueChange,
	OptionItem,
	OptionItems,
	OptionItemsDef,
	OptionItemSort
} from './option-items-assist';
import {OmitHTMLProps, OmitNodeDef} from './types';

export type DropdownOptionValue = string | number | boolean;
export type DropdownOption = OptionItem<DropdownOptionValue>;
export type DropdownOptions = OptionItems<DropdownOptionValue>;
export {OptionItemSort as DropdownOptionSort};

/** Input configuration definition */
export type DropdownDef =
	ValueChangeableNodeDef
	& OmitHTMLProps<HTMLDivElement>
	& OptionItemsDef<DropdownOptionValue>
	& {
	please?: ReactNode;
	clearable?: boolean;
};
/** widget definition, with html attributes */
export type DropdownProps = OmitNodeDef<DropdownDef> & Omit<WidgetProps, '$wrapped'> & {
	$wrapped: Omit<WidgetProps['$wrapped'], '$onValueChange'> & {
		$onValueChange: OnOptionValueChange<DropdownOptionValue>;
	}
};

const OptionFilter = styled.div.attrs<Omit<DropdownPopupState, 'active'> & { active: boolean }>(
	({active, atBottom, top, left, height}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-dropdown-option-filter',
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
const Option = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-dropdown-option'})`
    display: flex;
    align-items: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    padding: 0 ${CssVars.INPUT_INDENT};
    height: ${CssVars.INPUT_HEIGHT};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &[data-can-click=false] {
        cursor: default;
    }

    &:hover {
        background-color: ${CssVars.HOVER_COLOR};
    }
`;

export const Dropdown = (props: DropdownProps) => {
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
		onClicked, onFocused, onKeyUp, onFilterChanged
	} = useFilterableDropdownOptions(props);
	const forceUpdate = useForceUpdate();

	const onOptionClicked = (option: OptionItem<DropdownOptionValue>) => async (event: MouseEvent<HTMLSpanElement>) => {
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
		<DropdownStick valueAssigned={selected} clearable={clearable} clear={onClearClicked} disabled={$disabled}/>
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
					const canClick = ![NO_MATCHED_OPTION_ITEM, NO_AVAILABLE_OPTION_ITEM].includes(`${value}`);
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