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
	VUtils,
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
import {Times} from './icons';
import {toIntlLabel} from './intl-label';
import {MultiDropdownOptionValue} from './multi-dropdown';
import {OptionItemSort, TreeOptionItem, TreeOptionItems} from './option-items-assist';
import {TreeNodeDef, TreeNodeDetect} from './tree';
import {GlobalEventHandlers, ModelCarrier, OmitHTMLProps, OmitNodeDef} from './types';
import {UnwrappedTree} from './unwrapped/tree';
import {toCssSize, useDualRefs} from './utils';

export type MultiDropdownTreeOptionValue = string | number;
export type MultiDropdownTreeValue = MultiDropdownTreeOptionValue | Array<MultiDropdownTreeOptionValue>;
export type MultiDropdownTreeOption = TreeOptionItem<MultiDropdownTreeOptionValue>;
export type MultiDropdownTreeOptions = TreeOptionItems<MultiDropdownTreeOptionValue>;

/** Input configuration definition */
export type MultiDropdownTreeDef =
	ValueChangeableNodeDef
	& TipAttachableWidget
	& OmitHTMLProps<HTMLDivElement>
	& {
	please?: ReactNode;
	clearable?: boolean;
	options: MultiDropdownTreeOptions
		| (<R extends BaseModel, M extends PropValue>(options: ModelCarrier<R, M> & GlobalEventHandlers) => Promise<MultiDropdownTreeOptions>);
	optionSort?: OptionItemSort;
	noAvailable?: ReactNode;
	noMatched?: ReactNode;
	/** some nodes might not be selectable, only for leads child nodes */
	couldSelect?: (option: MultiDropdownTreeOption) => boolean;
	/** max popup width */
	maxWidth?: number;
};
/** widget definition, with html attributes */
export type MultiDropdownTreeProps = OmitNodeDef<MultiDropdownTreeDef> & WidgetProps;

const MultiDropdownTreeContainer = styled(DropdownContainer)`
    align-self: start;
    flex-wrap: wrap;
    height: unset;
    min-height: ${CssVars.INPUT_HEIGHT};
    padding-right: calc(${CssVars.INPUT_HEIGHT} - ${CssVars.INPUT_INDENT} + 4px);
`;

const MultiDropdownTreeLabel = styled(DropdownLabel)`
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
const MultiDropdownTreeStick = styled(DropdownStick as any)`
    position: absolute;
    right: ${CssVars.INPUT_INDENT};
`;

const OptionFilter = styled.div.attrs<Omit<DropdownPopupState, 'active'> & { active: boolean }>(
	({active, atBottom, top, left, height}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-multi-dropdown-tree-option-filter',
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

export const InternalMultiDropdownTree = forwardRef((props: MultiDropdownTreeProps, ref: ForwardedRef<HTMLDivElement>) => {
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
		popupRef, popupShown,
		repaintPopup,
		onClicked, onFocused, onKeyUp
	} = useFilterableDropdownOptions({...props, takeoverFilter: false, filterChanged});
	const forceUpdate = useForceUpdate();
	useDualRefs(containerRef, ref);
	useTip({ref: containerRef, ...buildTip({tip, root: $root, model: $model})});

	const currentValuesToArray = (): Array<MultiDropdownOptionValue> => {
		const values = MUtils.getValue($model, $pp) as MultiDropdownTreeValue;
		if (values == null) {
			return [];
		} else if (VUtils.isPrimitive(values)) {
			return [values as MultiDropdownTreeOptionValue];
		} else {
			return values as Array<MultiDropdownTreeOptionValue>;
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
		await $onValueChange(values.filter(v => v != value), true, {global: globalHandlers});
		repaintPopup();
	};
	// noinspection DuplicatedCode
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
	const selected = values != null && values.length !== 0;
	const allOptions: MultiDropdownTreeOptions = askOptions();
	const popupHeight = computeDropdownTreePopupHeight(allOptions);
	const optionsAsMap = (() => {
		const map: Record<string, MultiDropdownTreeOption> = {};
		const toMap = (option: MultiDropdownTreeOption) => {
			map[`${option.value}`] = option;
			(option.children ?? []).forEach(toMap);
		};
		allOptions.forEach(toMap);
		return map;
	})();
	const deviceTags = MBUtils.pickDeviceTags(props);
	const treeModel = {};
	const detective: TreeNodeDetect = (parentNode: Undefinable<TreeNodeDef>): Array<TreeNodeDef> => {
		let nodes: Array<TreeNodeDef>;
		if (parentNode.value === treeModel) {
			// parent is root
			nodes = allOptions.map((option, index) => {
				return {
					value: option as unknown as PropValue, $ip2r: `pp${index}`, $ip2p: `pp${index}`,
					label: option.label,
					...(option.stringify != null ? {stringify: () => option.stringify(option)} : {}),
					checkable: true, addable: false, removable: false
				} as TreeNodeDef;
			});
		} else {
			nodes = ((parentNode.value as unknown as MultiDropdownTreeOption).children ?? [])
				.map((option, index) => {
					return {
						value: option as unknown as PropValue,
						$ip2r: PPUtils.concat(parentNode.$ip2r, `pp${index}`), $ip2p: `pp${index}`,
						label: option.label,
						...(option.stringify != null ? {stringify: () => option.stringify(option)} : {}),
						checkable: true, addable: false, removable: false
					} as TreeNodeDef;
				});
		}
		return nodes.map(node => {
			const option = node.value as unknown as MultiDropdownTreeOption;
			if (couldSelect != null && !couldSelect(option)) {
				node.checkable = false;
			} else {
				node.checked = () => {
					const values = currentValuesToArray();
					return hasValue(option.value, values);
				};
				node.check = async (_: TreeNodeDef, checked: boolean) => {
					const value = (node.value as unknown as MultiDropdownTreeOption).value;
					const values = currentValuesToArray();
					if (checked) {
						if (!hasValues(values)) {
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							await $onValueChange([value], true, {global: globalHandlers});
						} else {
							await $onValueChange([...values, value], true, {global: globalHandlers});
						}
					} else {
						await $onValueChange(values.filter(v => v != value), true, {global: globalHandlers});
					}
					repaintPopup();
					setTimeout(() => containerRef.current?.focus(), 100);
				};
			}
			return node;
		});
	};

	// noinspection DuplicatedCode
	return <MultiDropdownTreeContainer active={popupState.active} atBottom={popupState.atBottom}
	                                   role="input" tabIndex={0}
	                                   {...rest}
	                                   data-w="d9-multi-dropdown-tree"
	                                   data-disabled={$disabled} data-visible={$visible}
	                                   data-clearable={clearable}
	                                   onFocus={onFocused} onClick={onClicked}
	                                   id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
	                                   ref={containerRef}>
		{values.map(value => {
			const v = `${value}`;
			return <MultiDropdownTreeLabel data-please={false} key={v}>
				<span>{toIntlLabel(optionsAsMap[v]?.label)}</span>
				{$disabled ? null : <span onClick={onRemoveClicked(value)}><Times/></span>}
			</MultiDropdownTreeLabel>;
		})}
		<DropdownLabel data-please={true}>{toIntlLabel(please)}</DropdownLabel>
		<MultiDropdownTreeStick valueAssigned={selected} clearable={clearable} clear={onClearClicked}
		                        disabled={$disabled}/>
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
	</MultiDropdownTreeContainer>;
});

export const MultiDropdownTree = forwardRef((props: MultiDropdownTreeProps, ref: ForwardedRef<HTMLDivElement>) => {
	return <DropdownTreeEventBusProvider>
		<InternalMultiDropdownTree {...props} ref={ref}/>
	</DropdownTreeEventBusProvider>;
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
registerWidget({key: 'MultiDropdownTree', JSX: MultiDropdownTree, container: false, array: false});
registerWidget({key: 'MDDT', JSX: MultiDropdownTree, container: false, array: false});
