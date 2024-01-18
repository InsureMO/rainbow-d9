import {BaseModel, PropValue, StandaloneRoot, VUtils} from '@rainbow-d9/n1';
import {
	DialogBody,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	GlobalEventPrefix,
	GlobalEventTypes,
	UnwrappedButton,
	useAlert,
	useDialog,
	useGlobalEventBus
} from '@rainbow-d9/n2';
import {parseDoc} from '@rainbow-d9/n3';
import React, {CSSProperties, Fragment, useEffect} from 'react';
// @ts-ignore
import DemoDialogContent from './demo-dialog.md';

const dialogDef = parseDoc(DemoDialogContent).node;

const DEFAULT_STYLES: CSSProperties = {width: '80vw', height: '80vh', margin: '10vh auto'};
export const N2DemoDialogHandler = () => {
	const {on, off} = useGlobalEventBus();
	const {show: showAlert} = useAlert();
	const {show: showDialog, hide: hideDialog} = useDialog();
	useEffect(() => {
		const onCustomEvent = async <R extends BaseModel, M extends PropValue>(
			key: string, prefix: string, clipped: string, models?: { root: R; model: M; }) => {
			if (prefix === GlobalEventPrefix.DIALOG) {
				const dialogKey = clipped.trim();
				if (VUtils.isNotEmpty(dialogKey)) {
					showDialog(<>
						<DialogHeader><DialogTitle>This is a demo dialog.</DialogTitle></DialogHeader>
						<DialogBody>
							<StandaloneRoot {...dialogDef} $root={models?.root}/>
						</DialogBody>
						<DialogFooter>
							{/** @ts-ignore */}
							<UnwrappedButton onClick={() => hideDialog()}>Close</UnwrappedButton>
						</DialogFooter>
					</>, DEFAULT_STYLES);
				} else {
					console.log(`Custom event[key=${key}] is ignored since no dialog key detected.`);
				}
			} else if (prefix === GlobalEventPrefix.ALERT) {
				await showAlert(clipped.trim());
			}
		};
		on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [on, off, showAlert, showDialog, hideDialog]);

	return <Fragment/>;
};