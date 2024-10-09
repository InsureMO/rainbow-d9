import {ExternalDefs, ObjectPropValue, StandaloneRoot} from '@rainbow-d9/n1';
import {GlobalRoot} from '@rainbow-d9/n2';
import {parseDoc} from '@rainbow-d9/n3';
import {JSX, useState} from 'react';
import {I18NAndD9N2Bridge} from '../../bootstrap';
import {D9PageState} from '../types';
import {StandardPageWrapper} from './standard-page-wrapper';

/**
 * when the global widget is replaced by given, make sure the given widget handles the corresponding global events.
 */
interface D9PageProps {
	/** d9 ui configuration markdown */
	ui: string;
	/** init root model */
	initRootModel?: ObjectPropValue;
	/** deep clone root model when false. default false */
	initRootModelAsIs?: boolean;
	/** external defs for d9 ui */
	externalDefs?: ExternalDefs;
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

export const D9Page = (props: D9PageProps) => {
	const {
		ui, initRootModel = {}, initRootModelAsIs = false, externalDefs = {},
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
			<StandaloneRoot {...state.$config.node} $root={state.$root} externalDefs={externalDefs}/>
		</StandardPageWrapper>
	</GlobalRoot>;
};
