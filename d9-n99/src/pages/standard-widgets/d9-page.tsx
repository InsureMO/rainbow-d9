import {ExternalDefs, ObjectPropValue, StandaloneRoot} from '@rainbow-d9/n1';
import {AlertLabel, GlobalEventBus, GlobalEventTypes, GlobalRoot, IntlLabel, useGlobalEventBus} from '@rainbow-d9/n2';
import {parseDoc} from '@rainbow-d9/n3';
import {JSX, useEffect, useState} from 'react';
import {I18NAndD9N2Bridge} from '../../bootstrap';
import {D9PageState} from '../../global-settings/pages/types.ts';
import {StandardPageWrapper} from './standard-page-wrapper';

export type D9PageExternalDefsCreatorGlobalEventBus = Omit<GlobalEventBus, 'on' | 'off'>
export type D9PageExternalDefsCreator = (global: D9PageExternalDefsCreatorGlobalEventBus) => Promise<ExternalDefs>;

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
	const global = useGlobalEventBus();
	const [state, setState] = useState<D9ExternalDefsInitializerState>({initialized: false});

	useEffect(() => {
		if (create != null) {
			(async () => {
				try {
					setState({initialized: true, defs: await create(global)});
				} catch (e) {
					console.error(e);
					global.fire(GlobalEventTypes.SHOW_ALERT, <AlertLabel>
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

export const D9Page = (props: D9PageProps) => {
	const {
		ui, initRootModel = {}, initRootModelAsIs = false, externalDefs: externalDefsCreate,
		alert: Alert, dialog: Dialog, yesNoDialog: YesNoDialog, tip: Tip, remoteRequest: RemoteRequest
	} = props;

	const externalDefs = useD9ExternalDefsInitializer(externalDefsCreate);
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
	if (!externalDefs.initialized) {
		return null;
	}

	return <GlobalRoot avoidDefaultAlert={(Alert != null) || (void 0)}
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
		<StandardPageWrapper>
			<StandaloneRoot {...state.$config.node} $root={state.$root} externalDefs={externalDefs.defs}/>
		</StandardPageWrapper>
	</GlobalRoot>;
};
