import {MUtils, registerWidget, ValueChangeableNodeDef, WidgetProps} from '@rainbow-d9/n1';
import React, {MouseEvent, ReactNode} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {DropdownOptionValue} from './dropdown';
import {DropdownOption, DropdownOptionsDef, OnDropdownValueChange, useDropdownOptions} from './dropdown-options-assist';
import {Radio, RadioProps} from './radio';
import {OmitHTMLProps, OmitNodeDef} from './types';

/** radio configuration definition, radios (radio group) is kind of dropdown */
export type RadiosDef =
	ValueChangeableNodeDef
	& OmitHTMLProps<HTMLDivElement>
	& DropdownOptionsDef<DropdownOptionValue>
	& {
	noAvailable?: ReactNode;
	columns?: number;
	compact?: boolean;
};
/** Input widget definition, with html attributes */
export type RadiosProps = OmitNodeDef<RadiosDef> & Omit<WidgetProps, '$wrapped'> & {
	$wrapped: Omit<WidgetProps['$wrapped'], '$onValueChange'> & {
		$onValueChange: OnDropdownValueChange<DropdownOptionValue>;
	}
};

const ARadios = styled.div.attrs<{ columns: number, grid: boolean, compact: boolean }>(
	({id, columns, grid, compact}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-radios',
			[DOM_ID_WIDGET]: id,
			style: {
				display: grid ? 'grid' : 'flex',
				// columns <= 0 means horizontal
				flexWrap: (!grid && columns <= 0) ? 'wrap' : (void 0),
				flexDirection: (grid || columns <= 0) ? (void 0) : 'column',
				gridTemplateColumns: grid
					? (compact ? `${new Array(columns - 1).fill('auto').join(' ')} 1fr` : `repeat(${columns}, 1fr)`)
					: (void 0)
			}
		};
	})<{ columns: number, grid: boolean, compact: boolean }>`
    position: relative;
`;
const Option = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-radios-option'})`
    display: flex;
    align-items: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    padding: 0 ${CssVars.INPUT_INDENT};
    height: ${CssVars.INPUT_HEIGHT};
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

        > div[data-w=d9-radio] {
            &:before {
                border-color: ${CssVars.PRIMARY_COLOR};
                box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
            }

            &:after {
                background-color: ${CssVars.PRIMARY_COLOR};
            }
        }
    }

    > div[data-w=d9-radio] {
        min-width: ${CssVars.INPUT_HEIGHT};
    }

    > span {
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const Radios = (props: RadiosProps) => {
	const {
		// eslint-disable-next-line  @typescript-eslint/no-unused-vars
		options, optionSort,
		columns = -1, compact = true,
		$pp, $wrapped: {$onValueChange, $model, $avs: {$disabled, $visible}},
		...rest
	} = props;

	const {createAskDisplayOptions} = useDropdownOptions(props);

	const onOptionClicked = (option: DropdownOption<DropdownOptionValue>) => async (event: MouseEvent<HTMLSpanElement>) => {
		if ($disabled) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();
		await $onValueChange(option.value, option);
	};

	const askDisplayOptions = createAskDisplayOptions();
	const displayOptions = askDisplayOptions();
	const grid = columns > 1 && !compact;
	const canClick = !$disabled;

	const modelValue = MUtils.getValue($model, $pp) as DropdownOptionValue;

	return <ARadios data-disabled={$disabled} data-visible={$visible}
	                grid={grid} columns={columns} compact={compact} {...rest}>
		{displayOptions.map((option, index) => {
			const {value, label} = option;
			const valueKey = `${value}_${index + 1}`;
			const model = {[valueKey]: modelValue == value};
			const onValueChange = async () => {
				await $onValueChange(value, option);
			};
			const $wrapped = {
				$root: model, $model: model, $p2r: '.', $onValueChange: onValueChange,
				$avs: {$disabled, $visible: true}
			} as RadioProps['$wrapped'];

			return <Option key={valueKey} data-can-click={canClick}>
				<Radio $pp={valueKey} $wrapped={$wrapped}/>
				<span onClick={canClick ? onOptionClicked(option) : (void 0)}>{label}</span>
			</Option>;
		})}
	</ARadios>;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
registerWidget({key: 'Radios', JSX: Radios, container: false, array: false});
