import {MUtils, Nullable, PropValue, registerWidget, ValueChangeableNodeDef, WidgetProps} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, Fragment, ReactNode} from 'react';
import styled from 'styled-components';
import {Checkbox, CheckboxProps} from './checkbox';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {IntlLabel, toIntlLabel} from './intl-label';
import {NO_AVAILABLE_OPTION_ITEM, OptionItem, OptionItemsDef, useOptionItems} from './option-items-assist';
import {OmitHTMLProps, OmitNodeDef} from './types';

export type CheckboxesOptionValue = string | number;
/** checkbox configuration definition, checkboxes (checkbox group) is kind of dropdown */
export type CheckboxesDef =
	ValueChangeableNodeDef
	& OmitHTMLProps<HTMLDivElement>
	& OptionItemsDef<CheckboxesOptionValue>
	& {
	noAvailable?: ReactNode;
	columns?: number;
	compact?: boolean;
};
/**
 * 1. new value should be an array or null
 * 2. option is currently selected, or null if it is clearing. when option is given, use select to identify that this option is add or remove value into model
 */
export type OnCheckboxesValueChange = <NV extends PropValue>(newValue: NV, option: Nullable<OptionItem<CheckboxesOptionValue>>, select: boolean) => void | Promise<void>;

/** widget definition, with html attributes */
export type CheckboxesProps = OmitNodeDef<CheckboxesDef> & Omit<WidgetProps, '$wrapped'> & {
	$wrapped: Omit<WidgetProps['$wrapped'], '$onValueChange'> & {
		$onValueChange: OnCheckboxesValueChange;
	}
};

const ACheckboxes = styled.div.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-checkboxes',
		[DOM_ID_WIDGET]: id
	};
})`
    display: flex;
    position: relative;
    flex-wrap: wrap;
    color: ${CssVars.FONT_COLOR};
`;
const Option = styled.span.attrs<{ columns: number, compact: boolean }>(
	// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
	// @ts-ignore
	({columns, compact, 'data-w': dataW}) => {
		return {
			[DOM_KEY_WIDGET]: dataW ?? 'd9-checkboxes-option',
			style: {
				flexBasis: (columns > 0 && !compact) ? `${1 / columns * 100}%` : (void 0)
			}
		};
	})<{ columns: number, compact: boolean }>`
    display: flex;
    align-items: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    height: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.INPUT_INDENT};
    margin-left: calc(${CssVars.INPUT_INDENT} * -1);
    margin-right: ${CssVars.INPUT_INDENT};
    border-radius: ${CssVars.BORDER_RADIUS};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;

    &[data-can-click=false] {
        cursor: default;
    }

    &[data-can-click=true]:hover {
        background-color: ${CssVars.HOVER_COLOR};

        > div[data-w=d9-checkbox] {
            fill: ${CssVars.PRIMARY_COLOR};

            &:before {
                border-color: ${CssVars.PRIMARY_COLOR};
                box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
            }
        }
    }

    > div[data-w=d9-checkbox] {
        min-width: ${CssVars.INPUT_HEIGHT};
    }

    > span {
        display: flex;
        position: relative;
        align-items: center;
        height: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;
const Separator = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-checkboxes-option-separator'})`
    display: block;
    position: relative;
    height: 0;
    flex-basis: 100%;
`;

export const Checkboxes = forwardRef((props: CheckboxesProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		options, optionSort,
		noAvailable = <IntlLabel keys={['options', 'noAvailable']} value="No available options."/>,
		columns = -1, compact = true,
		$pp, $wrapped: {$onValueChange, $model, $avs: {$disabled, $visible}},
		...rest
	} = props;

	const {createAskDisplayOptions} = useOptionItems({...props, noAvailable});

	const getValues = () => {
		const modelValues: CheckboxesOptionValue | Array<CheckboxesOptionValue> = MUtils.getValue($model, $pp) as CheckboxesOptionValue;
		return (modelValues == null ? [] : (Array.isArray(modelValues) ? modelValues : [modelValues]));
	};
	const onOptionClicked = (option: OptionItem<CheckboxesOptionValue>) => async () => {
		if ($disabled) {
			return;
		}

		const values = getValues();
		if (values.some(v => v == option.value)) {
			// remove
			await $onValueChange(values.filter(v => v != option.value), option, false);
		} else {
			// add
			await $onValueChange([...values, option.value], option, true);
		}
	};

	const askDisplayOptions = createAskDisplayOptions();
	const displayOptions = askDisplayOptions();
	const canClick = !$disabled;
	const values = getValues();

	if (displayOptions.length === 0 || displayOptions.length === 1 && displayOptions[0].value == NO_AVAILABLE_OPTION_ITEM) {
		return <ACheckboxes data-disabled={$disabled} data-visible={$visible} {...rest}>
			<Option data-can-click={false} columns={0} compact={true} data-w="d9-checkboxes-no-available">
				{noAvailable}
			</Option>
		</ACheckboxes>;
	}

	return <ACheckboxes data-disabled={$disabled} data-visible={$visible} {...rest} ref={ref}>
		{displayOptions.map((option, index) => {
			const {value, label} = option;
			const valueKey = `${value}_${index + 1}`;
			const model = {[valueKey]: values.some(v => v == value)};
			const onValueChange = async (newValue: boolean) => {
				if (newValue === true) {
					if (values.some(v => v == value)) {
						// do nothing
					} else {
						await $onValueChange([...values, value], option, true);
					}
				} else {
					await $onValueChange(values.filter(v => v != value), option, false);
				}
			};
			const $wrapped = {
				$root: model, $model: model, $p2r: '.', $onValueChange: onValueChange,
				$avs: {$disabled, $visible: true}
			} as CheckboxProps['$wrapped'];

			const node = <Option data-can-click={canClick}
			                     columns={columns} compact={compact}
			                     onClick={canClick ? onOptionClicked(option) : (void 0)}>
				<Checkbox $pp={valueKey} $wrapped={$wrapped}/>
				<span>{toIntlLabel(label)}</span>
			</Option>;

			if (columns >= 1 && compact && (index + 1) % columns === 0) {
				return <Fragment key={valueKey}>{node}<Separator/></Fragment>;
			} else {
				return <Fragment key={valueKey}>{node}</Fragment>;
			}
		})}
	</ACheckboxes>;
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
registerWidget({key: 'Checkboxes', JSX: Checkboxes, container: false, array: false});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
registerWidget({key: 'Checks', JSX: Checkboxes, container: false, array: false});
