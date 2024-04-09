import {BaseModel, NodeDef, PropValue, WidgetProps} from '@rainbow-d9/n1';
import {GlobalEventHandlers, ModelCarriedHandler, OmitHTMLProps, OmitNodeDef} from '@rainbow-d9/n2';
import {EChartsOption, SetOptionOpts} from 'echarts';

/** LocaleOption from echarts/types/src/core/locale */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ChartLocaleOption = any;

/**
 * EChartsInitOpts, don't know why cannot import from echarts,
 * therefore, define an interface here.
 */
export interface ChartInitOptions {
	locale?: string | ChartLocaleOption;
	/** RendererType from echarts/types/src/util/types */
	renderer?: 'canvas' | 'svg';
	devicePixelRatio?: number;
	useDirtyRect?: boolean;
	useCoarsePointer?: boolean;
	pointerSize?: number;
	ssr?: boolean;
	width?: number | string;
	height?: number | string;
}

/** Chart configuration definition */
export type ChartDef = NodeDef & OmitHTMLProps<HTMLDivElement> & {
	initOptions: ChartInitOptions | (() => ChartInitOptions)
	/** the initial options, might carry the data, or might not */
	options: EChartsOption | (() => EChartsOption);
	settings?: SetOptionOpts | (() => SetOptionOpts);
	/** use to merge data into chart, it is not mandatory if the data is already in the options */
	marker?: string;
	/** merge data into chart, note the data format depends on which chart is used */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mergeData: (options: EChartsOption, data: any) => Promise<EChartsOption>;
	/** according to echarts docs, return default loading options, or return type and loading options for appointed type */
	loading?: () => object | [string, object];
	/** default 300px */
	height?: string | number;
};
/** Chart widget definition, with html attributes */
export type ChartProps = OmitNodeDef<ChartDef> & WidgetProps;

/**
 * return this to refresh chart
 */
export const REACTION_REFRESH_CHART = 'refresh-chart';

export enum ChartGlobalEventPrefix {
	DATA_CHANGED = 'chart-data-changed',
}

export interface FetchDataOptions extends ModelCarriedHandler<BaseModel, PropValue>, GlobalEventHandlers {
	marker: string;
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

/** Chart configuration definition */
export interface ReliantChartDef extends ChartDef {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fetchData: (options: FetchDataOptions) => Promise<any>;
	/** default 1 second */
	fetchDefer?: number;
}

/** Chart widget definition, with html attributes */
export type ReliantChartProps = OmitNodeDef<ReliantChartDef> & WidgetProps;
