import React, {Fragment, ReactNode, useEffect} from 'react';
import {ButtonInk} from '../../button';
import {IntlLabel, toIntlLabel} from '../../intl-label';
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
			<DialogLabel>{toIntlLabel(question)}</DialogLabel>
		</DialogBody>
		<DialogFooter>
			<UnwrappedButton ink={ButtonInk.PRIMARY} onClick={onYes}>
				<IntlLabel keys={['dialog', 'confirm']} value="Yes"/>
			</UnwrappedButton>
			<UnwrappedButton ink={ButtonInk.WAIVE} onClick={onNo}>
				<IntlLabel keys={['dialog', 'discard']} value="No"/>
			</UnwrappedButton>
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