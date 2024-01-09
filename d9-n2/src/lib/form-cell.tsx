import {NodeDef, PPUtils, registerWidget, ValidationResult, VUtils, WidgetProps} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, ReactNode} from 'react';
import styled from 'styled-components';
import {CaptionDef} from './caption';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {toIntlLabel} from './intl-label';
import {LabelLike} from './label-like';
import {OmitHTMLProps, OmitNodeDef} from './types';

export interface FormCellAdditive {
	label?: ReactNode | CaptionDef;
	/**
	 * default true. note since internal widgets are invisible, so only the grid can be hold.
	 * cell height actually depends on grid css. default is true
	 */
	holdPositionWhenInvisible?: boolean,
}

/** Form cell configuration definition */
export type FormCellDef = NodeDef & FormCellAdditive & OmitHTMLProps<HTMLDivElement> & {
	children: ReactNode;
}
/** Form cell widget definition, with html attributes */
export type FormCellProps = OmitNodeDef<FormCellDef> & WidgetProps;

export type AsFormCell<T extends NodeDef> = T & FormCellAdditive;
export type AsFC<T extends NodeDef> = AsFormCell<T>;

// noinspection CssUnresolvedCustomProperty
const AFormCell = styled.div.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-form-cell',
		[DOM_ID_WIDGET]: id
	};
})`
    display: flex;
    position: relative;
    flex-direction: column;
    align-content: start;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);

    &[data-visible=false][data-hold-position-on-invisible=false] {
        display: none;
    }
`;
const FormCellInvalidMessage = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-form-cell-invalid-msg'})`
    display: flex;
    position: relative;
    align-items: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FORM_CELL_INVALID_MESSAGE_FONT_SIZE};
    font-weight: ${CssVars.FORM_CELL_INVALID_MESSAGE_FONT_WEIGHT};
    color: ${CssVars.FORM_CELL_INVALID_MESSAGE_COLOR};
    min-height: ${CssVars.FORM_CELL_INVALID_MESSAGE_HEIGHT};
    padding: ${CssVars.FORM_CELL_INVALID_MESSAGE_PADDING};
`;

/**
 * form cell is a delegate widget to hold other registered widget.
 * A caption above given internal widget, and an error message label below it.
 *********************************************
 * ┍---------------------------┑
 * ⏐   caption                 ⏐
 * ┝---------------------------┥
 * ⏐   given internal widget   ⏐
 * ┝---------------------------┥
 * ⏐   error message label     ⏐
 * ┕---------------------------┙
 *********************************************
 */
export const FormCell = forwardRef((props: FormCellProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		label, holdPositionWhenInvisible = true, $wrapped, children,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		placeholder,
		...rest
	} = props;

	const {$avs: {$disabled, $visible, $valid}} = $wrapped;
	const validation = $valid as ValidationResult;

	const id = PPUtils.asId(PPUtils.absolute($wrapped.$p2r, props.$pp), props.id);
	const fcId = VUtils.isBlank(id) ? (void 0) : `fc-${id}`;
	const fcAttrs = Object.keys(rest ?? {}).reduce((attrs, key) => {
		if (key == 'style') {
			attrs.style = rest.style;
		}
		if (VUtils.isPrimitive(rest[key]) && typeof rest[key] !== 'symbol') {
			attrs[key] = rest[key];
		}
		return attrs;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}, {} as Record<string, any>);
	return <AFormCell {...fcAttrs} data-disabled={$disabled}
	                  data-visible={$visible} data-hold-position-on-invisible={holdPositionWhenInvisible}
	                  id={fcId} ref={ref}>
		<LabelLike label={label} $wrapped={$wrapped} $validationScopes={props} wrapByCaption={true}
		           data-r="d9-fc-caption"/>
		{children}
		<FormCellInvalidMessage>
			{validation?.valid === false ? toIntlLabel(validation.failReason) : null}
		</FormCellInvalidMessage>
	</AFormCell>;
});

registerWidget({key: 'FC', JSX: FormCell, container: false, array: false});
registerWidget({key: 'FormCell', JSX: FormCell, container: false, array: false});
