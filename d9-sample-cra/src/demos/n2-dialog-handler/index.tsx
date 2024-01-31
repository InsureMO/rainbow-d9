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
import React, {CSSProperties, Fragment, useEffect} from 'react';
import {useDemoMarkdown} from '../use-demo-markdown';
import {markdown as DemoDialogContent} from './demo-dialog.md';

const DEFAULT_STYLES: CSSProperties = {width: '80vw', height: '80vh', margin: '10vh auto'};
export const N2DemoDialogHandler = () => {
	const def = useDemoMarkdown(DemoDialogContent);
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
							<StandaloneRoot {...def} $root={models?.root}/>
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
	}, [on, off, showAlert, showDialog, hideDialog, def]);

	return <Fragment/>;
};
