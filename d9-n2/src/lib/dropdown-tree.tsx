import {
	BaseModel,
	MBUtils,
	MUtils,
	PPUtils,
	PropValue,
	registerWidget,
	Undefinable,
	useForceUpdate,
	ValueChangeableNodeDef,
	WidgetProps
} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, MouseEvent, ReactNode, useState} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_KEY_WIDGET} from './constants';
import {
	computeDropdownTreePopupHeight,
	DropdownContainer,
	DropdownLabel,
	DropdownPopup,
	DropdownPopupState,
	DropdownPopupStateActive,
	DropdownStick,
	DropdownTreeEventBusProvider,
	DropdownTreeEventTypes,
	DropdownTreeFilterBridge,
	isDropdownPopupActive,
	useDropdownTreeEventBus,
	useFilterableDropdownOptions
} from './dropdown-assist';
import {buildTip, TipAttachableWidget, useGlobalHandlers, useTip} from './global';
import {toIntlLabel} from './intl-label';
import {
	NO_AVAILABLE_OPTION_ITEM,
	NO_MATCHED_OPTION_ITEM,
	OptionItemSort,
	TreeOptionItem,
	TreeOptionItems
} from './option-items-assist';
import {TreeNodeDef, TreeNodeDetect} from './tree';
import {GlobalEventHandlers, ModelCarrier, OmitHTMLProps, OmitNodeDef} from './types';
import {UnwrappedTree} from './unwrapped/tree';
import {toCssSize, useDualRefs} from './utils';

export type DropdownTreeOptionValue = string | number | boolean;
export type DropdownTreeOption = TreeOptionItem<DropdownTreeOptionValue>;
export type DropdownTreeOptions = TreeOptionItems<DropdownTreeOptionValue>;
export {OptionItemSort as DropdownOptionSort};

/** Input configuration definition */
export type DropdownTreeDef =
	ValueChangeableNodeDef
	& TipAttachableWidget
	& OmitHTMLProps<HTMLDivElement>
	& {
	please?: ReactNode;
	clearable?: boolean;
	options: DropdownTreeOptions
		| (<R extends BaseModel, M extends PropValue>(options: ModelCarrier<R, M> & GlobalEventHandlers) => Promise<DropdownTreeOptions>);
	optionSort?: OptionItemSort;
	noAvailable?: ReactNode;
	noMatched?: ReactNode;
	/** some nodes might not be selectable, only for leads child nodes */
	couldSelect?: (option: DropdownTreeOption) => boolean;
	/** max popup width */
	maxWidth?: number;
};
/** widget definition, with html attributes */
export type DropdownTreeProps = OmitNodeDef<DropdownTreeDef> & WidgetProps;

const OptionFilter = styled.div.attrs<Omit<DropdownPopupState, 'active'> & { active: boolean }>(
	({active, atBottom, top, left, height}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-dropdown-tree-option-filter',
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PopupTree = styled(UnwrappedTree)`
    border: 0;
`;

export const InternalDropdownTree = forwardRef((props: DropdownTreeProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		options, optionSort, noAvailable, noMatched,
		$pp, $wrapped: {$onValueChange, $root, $model, $p2r, $avs: {$disabled, $visible}},
		please = '', clearable = true, couldSelect,
		tip,
		...rest
	} = props;

	const globalHandlers = useGlobalHandlers();
	const {fire} = useDropdownTreeEventBus();
	const [filterChanged] = useState(() => async (filter: string, timing: 'hide' | 'search') => {
		// tree will re-renderer next popup show, so there is no need to fire event here
		if (timing === 'search') {
			fire(DropdownTreeEventTypes.FILTER_CHANGED, filter);
		}
	});
	const {
		askOptions,
		filterInputRef, filter, onFilterChanged,
		containerRef,
		popupState,
		popupRef, popupShown, setPopupShown, afterPopupStateChanged,
		onClicked, onFocused, onKeyUp
	} = useFilterableDropdownOptions({...props, takeoverFilter: false, filterChanged});
	useDualRefs(containerRef, ref);
	useTip({ref: containerRef, ...buildTip({tip, root: $root, model: $model})});
	const forceUpdate = useForceUpdate();

	const onClearClicked = async (event: MouseEvent<HTMLSpanElement>) => {
		if ($disabled) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();
		const value = MUtils.getValue($model, $pp) as DropdownTreeOptionValue;
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

	const value = MUtils.getValue($model, $pp) as DropdownTreeOptionValue;
	const selected = value != null;
	const allOptions: DropdownTreeOptions = askOptions();
	const popupHeight = computeDropdownTreePopupHeight(allOptions);
	const label = (() => {
		if (value == null) {
			return please || '';
		}
		const findOption = (option: DropdownTreeOption): Undefinable<DropdownTreeOption> => {
			if (option.value == value) {
				return option;
			} else if (option.children == null || option.children.length === 0) {
				return (void 0);
			} else {
				for (const child of option.children) {
					const found = findOption(child);
					if (found != null) {
						return found;
					}
				}
				return (void 0);
			}
		};
		for (const option of allOptions) {
			const found = findOption(option);
			if (found != null) {
				return found.label ?? (please || '');
			}
		}
		return please || '';
	})();
	const deviceTags = MBUtils.pickDeviceTags(props);
	const treeModel = {};
	const onNodeClicked = async (node: TreeNodeDef) => {
		if ($disabled) {
			return;
		}
		const option = node.value as unknown as DropdownTreeOption;
		if ([NO_MATCHED_OPTION_ITEM, NO_AVAILABLE_OPTION_ITEM].includes(`${option.value}`)) {
			return;
		}
		if (couldSelect != null && !couldSelect(option)) {
			return;
		}
		await $onValueChange(option.value, true, {global: globalHandlers});
		setPopupShown(false);
		if (filter !== '') {
			afterPopupStateChanged.afterPopupHide();
		}
		setTimeout(() => containerRef.current?.focus(), 100);
	};
	const detective: TreeNodeDetect = (parentNode: Undefinable<TreeNodeDef>): Array<TreeNodeDef> => {
		if (parentNode.value === treeModel) {
			// parent is root
			return allOptions.map((option, index) => {
				return {
					value: option as unknown as PropValue, $ip2r: `pp${index}`, $ip2p: `pp${index}`,
					label: option.label,
					...(option.stringify != null ? {stringify: () => option.stringify(option)} : {}),
					checkable: false, addable: false, removable: false,
					click: onNodeClicked
				} as TreeNodeDef;
			});
		} else {
			return ((parentNode.value as unknown as DropdownTreeOption).children ?? [])
				.map((option, index) => {
					return {
						value: option as unknown as PropValue,
						$ip2r: PPUtils.concat(parentNode.$ip2r, `pp${index}`), $ip2p: `pp${index}`,
						label: option.label,
						...(option.stringify != null ? {stringify: () => option.stringify(option)} : {}),
						checkable: false, addable: false, removable: false,
						click: onNodeClicked
					} as TreeNodeDef;
				});
		}
	};

	// noinspection DuplicatedCode
	return <DropdownContainer active={popupState.active} atBottom={popupState.atBottom}
	                          role="input" tabIndex={0}
	                          {...rest}
	                          data-w="d9-dropdown-tree"
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
				<OptionFilter {...{...popupState, active: !!filter}}>
					<span>?:</span>
					<input value={filter} onChange={onFilterChanged} onKeyUp={onKeyUp} ref={filterInputRef}/>
				</OptionFilter>
				<PopupTree data={treeModel} initExpandLevel={0} disableSearchBox={true}
				           detective={detective}
				           height={`calc(${toCssSize(popupHeight)} - 2px)`}>
					<DropdownTreeFilterBridge/>
				</PopupTree>
			</DropdownPopup>
			: null}
	</DropdownContainer>;
});

export const DropdownTree = forwardRef((props: DropdownTreeProps, ref: ForwardedRef<HTMLDivElement>) => {
	return <DropdownTreeEventBusProvider>
		<InternalDropdownTree {...props} ref={ref}/>
	</DropdownTreeEventBusProvider>;
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
registerWidget({key: 'DropdownTree', JSX: DropdownTree, container: false, array: false});
registerWidget({key: 'DDT', JSX: DropdownTree, container: false, array: false});
