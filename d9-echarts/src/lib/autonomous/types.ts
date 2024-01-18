import {WidgetProps} from '@rainbow-d9/n1';
import {GlobalHandlers, OmitNodeDef} from '@rainbow-d9/n2';
import {ChartDef} from '../basic';

export interface FetchDataOptions {
	marker: string;
	global: GlobalHandlers;
}

/** Chart configuration definition */
export interface AutonomousChartDef extends ChartDef {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fetchData: (options: FetchDataOptions) => Promise<any>;
	/** default 10 seconds */
	fetchInterval?: number;
}

/** Chart widget definition, with html attributes */
export type AutonomousChartProps = OmitNodeDef<AutonomousChartDef> & WidgetProps;
