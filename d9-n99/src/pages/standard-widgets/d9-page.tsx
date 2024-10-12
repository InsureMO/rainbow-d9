import {
	ExternalDefs,
	NodeDef,
	ObjectPropValue,
	RootEventTypes,
	StandaloneRoot,
	useCreateEventBus,
	useRootEventBus
} from '@rainbow-d9/n1';
import {AlertLabel, GlobalHandlers, GlobalRoot, IntlLabel, useGlobalHandlers} from '@rainbow-d9/n2';
import {parseDoc} from '@rainbow-d9/n3';
import {createContext, Fragment, JSX, ReactNode, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {I18NAndD9N2Bridge} from '../../bootstrap';
import {D9PageState} from '../../global-settings';
import {StandardPageWrapper} from './standard-page-wrapper';

enum PageToRootEventBusTypes {
	TO_ROOT = 'to-root'
}

interface PageToRootEventBus {
	on(type: PageToRootEventBusTypes.TO_ROOT, listener: (rootEventTypes: RootEventTypes, ...args: any[]) => void): this;
	off(type: PageToRootEventBusTypes.TO_ROOT, listener: (rootEventTypes: RootEventTypes, ...args: any[]) => void): this;
	fire(type: PageToRootEventBusTypes.TO_ROOT, rootEventTypes: RootEventTypes, ...args: any[]): this;
}

const PageToRootContext = createContext<PageToRootEventBus>({} as PageToRootEventBus);
PageToRootContext.displayName = 'PageToRootEventBus';

export const PageToRootEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<PageToRootEventBus>('app-page-to-root');

	return <PageToRootContext.Provider value={bus}>
		{children}
	</PageToRootContext.Provider>;
};

export const usePageToRootEventBus = () => useContext(PageToRootContext);

export interface D9PageExternalDefsCreatorOptionsNavigator {
	to: (to: string) => void;
	replace: (to: string) => void;
}

export interface D9PageExternalDefsCreatorOptions extends GlobalHandlers {
	navigate: D9PageExternalDefsCreatorOptionsNavigator;
}

export type D9PageExternalDefsCreator = (global: D9PageExternalDefsCreatorOptions) => Promise<ExternalDefs>;

/**
 * when the global widget is replaced by given, make sure the given widget handles the corresponding global events.
 */
export interface D9PageProps {
	/** d9 ui configuration markdown */
	ui: string;
	/** init root model */
	initRootModel?: ObjectPropValue;
	/** deep clone root model when false. default false */
	initRootModelAsIs?: boolean;
	/** external defs for d9 ui */
	externalDefs?: D9PageExternalDefsCreator;
	/** default global widgets replacement */
	/** refer to n2 Alert */
	alert?: () => JSX.Element;
	/** refer to n2 Dialog */
	dialog?: () => JSX.Element;
	/** refer to n2 YesNoDialog */
	yesNoDialog?: () => JSX.Element;
	/** refer to n2 Tip */
	tip?: () => JSX.Element;
	/** refer to n2 RemoteRequest */
	remoteRequest?: () => JSX.Element;
}

interface D9ExternalDefsInitializerState {
	initialized: boolean;
	defs?: ExternalDefs;
}

const useD9ExternalDefsInitializer = (create?: D9PageExternalDefsCreator) => {
	// this hook is outside of root event bus, which means the property root undefined
	// now have to build a bridge to pass root event bus to the external defs creator
	const globalHandlers = useGlobalHandlers();
	const navigate = useNavigate();
	const {fire} = usePageToRootEventBus();
	const [state, setState] = useState<D9ExternalDefsInitializerState>({initialized: false});

	useEffect(() => {
		if (create != null) {
			(async () => {
				try {
					setState({
						initialized: true,
						defs: await create({
							...globalHandlers,
							// delegate to root event bus
							// @ts-ignore
							root: {fire: (type: RootEventTypes, ...args: any[]) => fire(PageToRootEventBusTypes.TO_ROOT, type, ...args)},
							// attach navigate functions
							navigate: {
								to: (to: string) => navigate(to, {replace: false}),
								replace: (to: string) => navigate(to, {replace: true})
							}
						})
					});
				} catch (e) {
					console.error(e);
					await globalHandlers.alert.show(<AlertLabel>
						<IntlLabel keys={[]} value="Failed to load external defs for d9 page."/>
					</AlertLabel>);
				}
			})();
		} else {
			setState({initialized: true});
		}
	}, [create]);

	return state;
};

interface D9PageContentProps {
	pageDefs: NodeDef;
	rootModel: ObjectPropValue;
	externalDefs?: D9PageExternalDefsCreator;
}

/** bridge from page to root */
const PageToRootEventBridge = () => {
	const {on, off} = usePageToRootEventBus();
	const {fire} = useRootEventBus();
	useEffect(() => {
		// delegate to root event bus
		const onToRoot = (type: RootEventTypes, ...args: any[]) => {
			// @ts-ignore
			fire(type, ...args);
		};
		on(PageToRootEventBusTypes.TO_ROOT, onToRoot);
		return () => {
			off(PageToRootEventBusTypes.TO_ROOT, onToRoot);
		};
	}, []);
	return <Fragment/>;
};

const D9PageContent = (props: D9PageContentProps) => {
	const {pageDefs, rootModel, externalDefs: externalDefsCreate} = props;

	const externalDefs = useD9ExternalDefsInitializer(externalDefsCreate);
	if (!externalDefs.initialized) {
		return null;
	}

	return <StandardPageWrapper>
		<StandaloneRoot {...pageDefs} $root={rootModel} externalDefs={externalDefs.defs}>
			<PageToRootEventBridge/>
		</StandaloneRoot>
	</StandardPageWrapper>;
};

export const D9Page = (props: D9PageProps) => {
	const {
		ui, initRootModel = {}, initRootModelAsIs = false, externalDefs,
		alert: Alert, dialog: Dialog, yesNoDialog: YesNoDialog, tip: Tip, remoteRequest: RemoteRequest
	} = props;

	const [state] = useState<D9PageState>(() => {
		return {
			$config: parseDoc(ui),
			// deep clone it
			$root: initRootModelAsIs ? initRootModel : JSON.parse(JSON.stringify(initRootModel))
		};
	});
	const {success, error} = state.$config;

	if (!success) {
		if (error instanceof Error) {
			return <div>{error.message}</div>;
		} else {
			return <div>{error}</div>;
		}
	}

	return <PageToRootEventBusProvider>
		<GlobalRoot avoidDefaultAlert={(Alert != null) || (void 0)}
		            avoidDefaultDialog={(Dialog != null) || (void 0)}
		            avoidDefaultYesNoDialog={(YesNoDialog != null) || (void 0)}
		            avoidDefaultTips={(Tip != null) || (void 0)}
		            avoidDefaultRemoteRequest={(RemoteRequest != null) || (void 0)}>
			{Alert && <Alert/>}
			{Dialog && <Dialog/>}
			{YesNoDialog && <YesNoDialog/>}
			{Tip && <Tip/>}
			{RemoteRequest && <RemoteRequest/>}
			<I18NAndD9N2Bridge/>
			<D9PageContent pageDefs={state.$config.node} rootModel={state.$root} externalDefs={externalDefs}/>
		</GlobalRoot>
	</PageToRootEventBusProvider>;
};

export const D9Dialog = (props: Pick<D9PageProps, 'ui' | 'initRootModel' | 'initRootModelAsIs' | 'externalDefs'>) => {
	const {ui, initRootModel = {}, initRootModelAsIs = false, externalDefs} = props;

	const [state] = useState<D9PageState>(() => {
		return {
			$config: parseDoc(ui),
			// deep clone it
			$root: initRootModelAsIs ? initRootModel : JSON.parse(JSON.stringify(initRootModel))
		};
	});
	const {success, error} = state.$config;

	if (!success) {
		if (error instanceof Error) {
			return <div>{error.message}</div>;
		} else {
			return <div>{error}</div>;
		}
	}

	return <D9PageContent pageDefs={state.$config.node} rootModel={state.$root} externalDefs={externalDefs}/>;
};
