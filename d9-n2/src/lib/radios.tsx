import {MUtils, registerWidget, ValueChangeableNodeDef, WidgetProps} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, Fragment, ReactNode} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {IntlLabel, toIntlLabel} from './intl-label';
import {
	NO_AVAILABLE_OPTION_ITEM,
	OnOptionValueChange,
	OptionItem,
	OptionItemsDef,
	useOptionItems
} from './option-items-assist';
import {Radio, RadioProps} from './radio';
import {OmitHTMLProps, OmitNodeDef} from './types';

export type RadiosOptionValue = string | number;
/** radio configuration definition, radios (radio group) is kind of dropdown */
export type RadiosDef =
	ValueChangeableNodeDef
	& OmitHTMLProps<HTMLDivElement>
	& OptionItemsDef<RadiosOptionValue>
	& {
	noAvailable?: ReactNode;
	columns?: number;
	compact?: boolean;
};
/** widget definition, with html attributes */
export type RadiosProps = OmitNodeDef<RadiosDef> & Omit<WidgetProps, '$wrapped'> & {
	$wrapped: Omit<WidgetProps['$wrapped'], '$onValueChange'> & {
		$onValueChange: OnOptionValueChange<RadiosOptionValue>;
	}
};

const ARadios = styled.div.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-radios',
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
			[DOM_KEY_WIDGET]: dataW ?? 'd9-radios-option',
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
        border-top-left-radius: ${CssVars.BORDER_RADIUS};
        border-bottom-left-radius: ${CssVars.BORDER_RADIUS};
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
const Separator = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-radios-option-separator'})`
    display: block;
    position: relative;
    height: 0;
    flex-basis: 100%;
`;

export const Radios = forwardRef((props: RadiosProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		options, optionSort,
		noAvailable = <IntlLabel keys={['options', 'noAvailable']} value="No available options."/>,
		columns = -1, compact = true,
		$pp, $wrapped: {$onValueChange, $model, $avs: {$disabled, $visible}},
		...rest
	} = props;

	const {createAskDisplayOptions} = useOptionItems({...props, noAvailable});

	const onOptionClicked = (option: OptionItem<RadiosOptionValue>) => async () => {
		if ($disabled) {
			return;
		}
		await $onValueChange(option.value, option);
	};

	const askDisplayOptions = createAskDisplayOptions();
	const displayOptions = askDisplayOptions();
	const canClick = !$disabled;

	if (displayOptions.length === 0 || displayOptions.length === 1 && displayOptions[0].value == NO_AVAILABLE_OPTION_ITEM) {
		return <ARadios data-disabled={$disabled} data-visible={$visible} {...rest}>
			<Option data-can-click={false} columns={0} compact={true}
			        data-w="d9-radios-no-available">{noAvailable}</Option>
		</ARadios>;
	}

	const modelValue = MUtils.getValue($model, $pp) as RadiosOptionValue;

	return <ARadios data-disabled={$disabled} data-visible={$visible} {...rest} ref={ref}>
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

			const node = <Option data-can-click={canClick}
			                     columns={columns} compact={compact}
			                     onClick={canClick ? onOptionClicked(option) : (void 0)}>
				<Radio $pp={valueKey} $wrapped={$wrapped}/>
				<span>{toIntlLabel(label)}</span>
			</Option>;

			if (columns >= 1 && compact && (index + 1) % columns === 0) {
				return <Fragment key={valueKey}>{node}<Separator/></Fragment>;
			} else {
				return <Fragment key={valueKey}>{node}</Fragment>;
			}
		})}
	</ARadios>;
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
registerWidget({key: 'Radios', JSX: Radios, container: false, array: false});
