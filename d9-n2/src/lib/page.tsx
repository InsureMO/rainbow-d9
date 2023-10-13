import {ContainerDef, ContainerWidgetProps, registerWidget} from '@d9/n1';
import React from 'react';
import styled from 'styled-components';
import {CssVars, DOM_KEY_WIDGET} from './constants';
import {OmitHTMLProps, OmitNodeDef} from './types';

/** Page configuration definition */
export type PageDef = ContainerDef & OmitHTMLProps<HTMLDivElement>;
/** Page widget definition, with html attributes */
export type PageProps = OmitNodeDef<PageDef> & ContainerWidgetProps;

const APage = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-page'})`
	display               : grid;
	position              : relative;
	grid-template-columns : repeat(${CssVars.GRID_COLUMNS}, calc((100% - ${CssVars.GRID_COLUMN_GAP} * (${CssVars.GRID_COLUMNS} - 1)) / ${CssVars.GRID_COLUMNS}));
	grid-column-gap       : ${CssVars.GRID_COLUMN_GAP};
	grid-row-gap          : ${CssVars.GRID_ROW_GAP};
`;

export const Page = (props: PageProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {$wrapped: {$avs: {$disabled}}, children, ...rest} = props;

	return <APage {...rest} data-disabled={$disabled}>
		{children}
	</APage>;
};

registerWidget({key: 'Page', JSX: Page, container: true, array: false});