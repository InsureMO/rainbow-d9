import {
	MBUtils,
	MUtils,
	PPUtils,
	registerWidget,
	useForceUpdate,
	ValueChangeableNodeDef,
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
	useFilterableDropdownOptions
} from './dropdown-assist';
import {buildTip, TipAttachableWidget, useGlobalHandlers, useTip} from './global';
import {Search} from './icons';
import {toIntlLabel} from './intl-label';
import {
	NO_AVAILABLE_OPTION_ITEM,
	NO_MATCHED_OPTION_ITEM,
	OptionItem,
	OptionItems,
	OptionItemsDef,
	OptionItemSort
} from './option-items-assist';
import {OmitHTMLProps, OmitNodeDef} from './types';
import {useDualRefs} from './utils';

export type DropdownOptionValue = string | number | boolean;
export type DropdownOption = OptionItem<DropdownOptionValue>;
export type DropdownOptions = OptionItems<DropdownOptionValue>;
export {OptionItemSort as DropdownOptionSort};

/** Input configuration definition */
export type DropdownDef =
	ValueChangeableNodeDef
	& TipAttachableWidget
	& OmitHTMLProps<HTMLDivElement>
	& OptionItemsDef<DropdownOptionValue>
	& {
	please?: ReactNode;
	clearable?: boolean;
	/** max popup width */
	maxWidth?: number;
};
/** widget definition, with html attributes */
export type DropdownProps = OmitNodeDef<DropdownDef> & WidgetProps;

const Option = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-dropdown-option'})`
    display: flex;
    position: relative;
    align-items: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    line-height: calc(${CssVars.FONT_SIZE} * 1.4);
    padding: calc(${CssVars.INPUT_HEIGHT} / 8) ${CssVars.INPUT_INDENT};
    min-height: ${CssVars.INPUT_HEIGHT};
    //overflow: hidden;
    //white-space: nowrap;
    //text-overflow: ellipsis;

    &[data-can-click=false] {
        cursor: default;
    }

    &:hover {
        background-color: ${CssVars.HOVER_COLOR};
    }
`;

export const Dropdown = forwardRef((props: DropdownProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		options, optionSort, noAvailable, noMatched,
		$pp, $wrapped: {$onValueChange, $root, $model, $p2r, $avs: {$disabled, $visible}},
		please = '', clearable = true,
		tip,
		...rest
	} = props;

	const globalHandlers = useGlobalHandlers();
	const {
		askOptions, displayOptions,
		filterInputRef, filter, onFilterChanged,
		containerRef,
		popupState, popupHeight,
		popupRef, popupShown, setPopupShown, afterPopupStateChanged,
		onClicked, onFocused, onKeyUp
	} = useFilterableDropdownOptions(props);
	useDualRefs(containerRef, ref);
	useTip({ref: containerRef, ...buildTip({tip, root: $root, model: $model})});
	const forceUpdate = useForceUpdate();

	const onOptionClicked = (option: DropdownOption) => async (event: MouseEvent<HTMLSpanElement>) => {
		if ($disabled) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();
		await $onValueChange(option.value, true, {global: globalHandlers});
		setPopupShown(false);
		if (filter !== '') {
			afterPopupStateChanged.afterPopupHide();
		}
		setTimeout(() => containerRef.current?.focus(), 30);
	};
	const onClearClicked = async (event: MouseEvent<HTMLSpanElement>) => {
		if ($disabled) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();
		const value = MUtils.getValue($model, $pp) as DropdownOptionValue;
		if (value != null) {
			await $onValueChange(null, true, {global: globalHandlers});
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
	const label = (value == null
			? please
			: ((askOptions() as DropdownOptions).find(option => option.value == value)?.label ?? please))
		|| '';
	const deviceTags = MBUtils.pickDeviceTags(props);

	return <DropdownContainer active={popupState.active} atBottom={popupState.atBottom}
	                          role="input" tabIndex={0}
	                          {...rest}
	                          data-w="d9-dropdown"
	                          data-disabled={$disabled} data-visible={$visible}
	                          data-clearable={clearable}
	                          onFocus={onFocused} onClick={onClicked}
	                          id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
	                          ref={containerRef}>
		<DropdownLabel data-please={!selected}>{toIntlLabel(label)}</DropdownLabel>
		<DropdownStick valueAssigned={selected} clearable={clearable} clear={onClearClicked} disabled={$disabled}/>
		{isDropdownPopupActive(popupState.active)
			? <DropdownPopup {...{...popupState, minHeight: popupHeight}}
			                 shown={popupShown && popupState.active === DropdownPopupStateActive.ACTIVE}
			                 {...deviceTags}
			                 vScroll={true} ref={popupRef}>
				<OptionFilter {...{...popupState, active: !!filter}} data-w="d9-dropdown-option-filter">
					<span>?:</span><span><Search/></span>
					<input value={filter} onChange={onFilterChanged} onKeyUp={onKeyUp}
					       ref={filterInputRef}/>
				</OptionFilter>
				{displayOptions.map((option, index) => {
					const {value, label} = option;
					const canClick = ![NO_MATCHED_OPTION_ITEM, NO_AVAILABLE_OPTION_ITEM].includes(`${value}`);
					return <Option key={`${value}-${index}`} data-can-click={canClick}
					               onClick={canClick ? onOptionClicked(option) : (void 0)}>
						{toIntlLabel(label)}
					</Option>;
				})}
			</DropdownPopup>
			: null}
	</DropdownContainer>;
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
registerWidget({key: 'Dropdown', JSX: Dropdown, container: false, array: false});