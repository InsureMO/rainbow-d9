import React, {Fragment, ReactNode, useEffect} from 'react';
import {ButtonInk} from '../../button';
import {I18NVars} from '../../constants';
import {UnwrappedButton} from '../../unwrapped/button';
import {GlobalEventTypes, useGlobalEventBus} from '../global-event-bus';
import {DialogBody, DialogFooter, DialogLabel} from './widgets';

const YesNoContent = (props: {
	question: ReactNode;
	onYes: () => void;
	onNo: () => void;
}) => {
	const {question, onYes, onNo} = props;

	return <>
		<DialogBody>
			<DialogLabel>{question}</DialogLabel>
		</DialogBody>
		<DialogFooter>
			<UnwrappedButton ink={ButtonInk.PRIMARY} onClick={onYes}>{I18NVars.DIALOG.CONFIRM}</UnwrappedButton>
			<UnwrappedButton ink={ButtonInk.WAIVE} onClick={onNo}>{I18NVars.DIALOG.DISCARD}</UnwrappedButton>
		</DialogFooter>
	</>;
};

export const YesNoDialog = () => {
	const {fire, on, off} = useGlobalEventBus();

	useEffect(() => {
		const show = (question: ReactNode, onYes: () => void, onNo: () => void) => {
			fire && fire(GlobalEventTypes.SHOW_DIALOG, <YesNoContent question={question} onYes={onYes} onNo={onNo}/>);
		};
		on(GlobalEventTypes.SHOW_YES_NO_DIALOG, show);
		return () => {
			off(GlobalEventTypes.SHOW_YES_NO_DIALOG, show);
		};
	}, [on, off, fire]);

	return <Fragment/>;
};