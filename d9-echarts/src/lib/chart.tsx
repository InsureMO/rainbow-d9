import {NodeDef, registerWidget, WidgetProps} from '@rainbow-d9/n1';
import {OmitHTMLProps, OmitNodeDef} from '@rainbow-d9/n2';
import React from 'react';

/** Chart configuration definition */
export type ChartDef = NodeDef & OmitHTMLProps<HTMLDivElement>;
/** Chart widget definition, with html attributes */
export type ChartProps = OmitNodeDef<ChartDef> & WidgetProps;

export const Chart = () => {
	return <></>;
};

registerWidget({key: 'Chart', JSX: Chart, container: false, array: false});
