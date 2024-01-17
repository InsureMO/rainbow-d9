import {NodeDef, WidgetProps} from '@rainbow-d9/n1';
import {OmitHTMLProps, OmitNodeDef} from '@rainbow-d9/n2';
import {EChartsOption, SetOptionOpts} from 'echarts';

/** Chart configuration definition */
export type ChartDef = NodeDef & OmitHTMLProps<HTMLDivElement> & {
	/** the initial options, might carry the data, or might not */
	options: EChartsOption;
	settings?: SetOptionOpts;
	/** use to merge data into chart, it is not mandatory if the data is already in the options */
	marker?: string;
	/** merge data into chart, note the data format depends on which chart is used */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mergeData: (option: EChartsOption, data: any) => Promise<EChartsOption>;
	/** according to echarts docs, return default loading options, or return type and loading options for appointed type */
	loading?: () => object | [string, object];
	height?: string | number;
};
/** Chart widget definition, with html attributes */
export type ChartProps = OmitNodeDef<ChartDef> & WidgetProps;

export enum ChartGlobalEventPrefix {
	DATA_CHANGED = 'chart-data-changed',
}