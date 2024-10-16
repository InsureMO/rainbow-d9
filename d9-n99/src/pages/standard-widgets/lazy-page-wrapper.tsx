import {ObjectPropValue} from '@rainbow-d9/n1';
import {DOM_KEY_WIDGET, GlobalHandlers, IntlLabel} from '@rainbow-d9/n2';
import {JSX, LazyExoticComponent, Suspense, useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router';
import {Params, useSearchParams} from 'react-router-dom';
import styled from 'styled-components';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'page-lazy-loading'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: 7fr auto 10fr;
    width: 100%;
    height: 100vh;

    > div {
        grid-column: 2;
        grid-row: 2;
    }
`;

export const LazyPageWrapper = (LazyComponent: LazyExoticComponent<() => JSX.Element>): (() => JSX.Element) => {
	return () => {
		return <Suspense fallback={<Container>
			<div>
				<IntlLabel keys={['page.lazy']} value="Page is loading ..."/>
			</div>
		</Container>}>
			<LazyComponent/>
		</Suspense>;
	};
};

export interface PreloaderFuncOptions {
	location?: ReturnType<typeof useLocation>;
	pathParams?: Readonly<Params<string>>;
	searchParams?: URLSearchParams;
}

export interface PreloadedPageProps<AssistantData = any> extends PreloaderFuncOptions {
	/** d9 markdown */
	ui?: string;
	/** init root model */
	initRootModel?: ObjectPropValue;
	/** assistant data for ui usage, could be anything */
	assistantData?: (globalHandlers: GlobalHandlers) => Promise<AssistantData>;
}

export type PreloaderFunc<T> = (options: PreloaderFuncOptions) => Promise<T>;

export interface PagePropsApartPreloaderFuncs<AssistantData = any> {
	/** get ui configuration markdown, d9 format */
	ui?: PreloaderFunc<string>;
	/** get initial root model */
	initRootModel?: PreloaderFunc<ObjectPropValue>;
	/** get assistant data for ui usage, could be anything */
	assistantData?: PreloaderFunc<PreloadedPageProps<AssistantData>['assistantData']>;
}

/**
 * page props preloader, each part could be preloaded separately, or ignore.
 *
 */
export interface PagePropsApartPreloader<AssistantData = any> extends PagePropsApartPreloaderFuncs<AssistantData> {
	/** default false */
	useLocation?: boolean;
	/** default false */
	usePathParams?: boolean;
	/** default false */
	useSearchParams?: boolean;
	/**
	 * order of preloading, default is undefined, means run all pre-loaders parallel.
	 * if defined, it should be an array of arrays, each array contains keys of PagePropsApartPreloaderFuncs,
	 * the order of arrays is the order of preloading,
	 * and previous loaded data will be passed to next step, by key of previous step.
	 * for example:
	 * [['initRootModel'], ['ui', 'assistantData']]
	 * means run initRootModel first, then run ui and assistantData parallel.
	 * return data of initRootModel would be passed to ui and assistantData.
	 */
	orderBy?: Array<Array<keyof PagePropsApartPreloaderFuncs>>;
}

export type PagePropsWholePreloader<AssistantData = any> = () => Promise<PreloadedPageProps<AssistantData>>;
export type PagePropsPreloader<AssistantData = any> =
	PagePropsApartPreloader<AssistantData> | PagePropsWholePreloader<AssistantData>;

export interface PreloadedLazyPageWrapperState extends PreloadedPageProps {
	initialized: boolean;
	hasError: boolean;
	/** should be Error or string, but still can be anything, depends on throw inside */
	error?: any;
}

const wrap = <T = any>(preloader?: PreloaderFunc<T>): { run: PreloaderFunc<T> | PreloaderFunc<undefined> } => {
	if (preloader == null) {
		return {run: async () => Promise.resolve(void 0)};
	} else {
		return {run: preloader};
	}
};

export const PreloadedLazyPageWrapper = <AssistantData = any>(
	LazyComponent: LazyExoticComponent<(props: PreloadedPageProps<AssistantData>) => JSX.Element>,
	preloader: PagePropsPreloader<AssistantData>
): (() => JSX.Element) => {
	return () => {
		const location = useLocation();
		const pathParams = useParams();
		const [searchParams] = useSearchParams();
		const [state, setState] = useState<PreloadedLazyPageWrapperState>({initialized: false, hasError: false});
		useEffect(() => {
			if (state.initialized) {
				return;
			}

			try {
				(async () => {
					let props: PreloadedPageProps;
					if (typeof preloader === 'function') {
						props = await preloader();
					} else {
						props = {};
						// get location , path params and search params if declared
						if (preloader.useLocation) {
							props.location = location;
						}
						if (preloader.usePathParams) {
							props.pathParams = pathParams;
						}
						if (preloader.useSearchParams) {
							props.searchParams = searchParams;
						}
						// pass to preload functions
						const options: PreloaderFuncOptions = {...props};
						const orderBy: Exclude<PagePropsApartPreloader['orderBy'], undefined> = preloader.orderBy ?? [['ui', 'initRootModel', 'assistantData']];
						await orderBy.reduce<Promise<PreloaderFuncOptions>>(async (options, keys) => {
							const thisOptions = await options;
							await Promise.all(keys.map(async key => {
								// shallow clone to make sure each preloader function has its own copy
								// @ts-ignore
								props[key] = await wrap(preloader[key]).run({...thisOptions});
							}));
							return props;
						}, Promise.resolve(options));
					}
					setState({initialized: true, hasError: false, ...props});
				})();
			} catch (e) {
				setState({initialized: true, hasError: true, error: e as any});
			}

		}, [state.initialized]);

		if (!state.initialized) {
			return <Container>
				<div>
					<IntlLabel keys={['page.lazy']} value="Page is loading ..."/>
				</div>
			</Container>;
		}

		const {initialized, hasError, error, ...rest} = state;
		if (hasError) {
			return <Container>
				<div>{error?.toString()}</div>
			</Container>;
		}

		return <Suspense fallback={<Container>
			<div>
				<IntlLabel keys={['page.lazy']} value="Page is loading ..."/>
			</div>
		</Container>}>
			<LazyComponent {...rest}/>
		</Suspense>;
	};
};
