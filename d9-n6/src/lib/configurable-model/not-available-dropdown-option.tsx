import {CssVars} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {Labels} from '../labels';

export interface NotAvailableDropdownOptionOptions {
	label: ReactNode;
}

export const NotAvailableDropdownOptionLabel = styled.span`
    color: ${CssVars.DANGER_COLOR};

    > span {
        margin-left: 0.5em;
    }
`;
export const NotAvailableDropdownOption = (props: NotAvailableDropdownOptionOptions) => {
	const {label} = props;

	return <NotAvailableDropdownOptionLabel>
		{label}
		<span>{Labels.IllegalDropdownOptionSuffix}</span>
	</NotAvailableDropdownOptionLabel>;
};
