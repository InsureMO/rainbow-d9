import {
	ButtonInk,
	CalendarUtils,
	DropdownOptions,
	GlobalHandlers,
	IntlLabel,
	UnwrappedButton,
	UnwrappedButtonBar
} from '@rainbow-d9/n2';
import dayjs from 'dayjs';
import {useRef} from 'react';
import {asT, getAuthentication} from '../../../../utils';
import {
	D9Dialog,
	LargestDialogStyles,
	LayoutControllerWithLastTextarea,
	validateDialog
} from '../../../standard-widgets';
import {Claim} from '../index';
import {markdown} from './ui-config.d9';

export const AddEscalationDialog = (props: { data: Claim.Escalation, escalatedTo: DropdownOptions }) => {
	const {data, escalatedTo} = props;
	// build a ref to keep the root model
	const rootModelRef = useRef<Claim.Escalation>(data);
	const externalDefs = async () => ({
		codes: {escalatedTo}
	});

	return <D9Dialog ui={markdown}
	                 initRootModel={asT(rootModelRef.current)} initRootModelAsIs={true}
	                 externalDefs={externalDefs}/>;
};

export const createEscalation = async (
	globalHandlers: GlobalHandlers,
	escalatedTo: DropdownOptions,
	onCreated: (issue: Claim.Escalation) => Promise<void>): Promise<void> => {
	const data: Claim.Escalation = {
		// should use the store format here,
		// but for simplicity, just use the given format to make sure date format is same as mock data
		// escalatedAt: dayjs().format(CalendarUtils.getDefaultCalendarDatetimeFormat()),
		escalatedAt: dayjs().format('DD/MM/YYYY'),
		escalatedBy: getAuthentication()?.username,
		dueDate: dayjs().add(7, 'd').format(CalendarUtils.getDefaultCalendarDatetimeFormat()),
		status: 'wait'
	};
	const onConfirmClick = async () => {
		try {
			await validateDialog({globalHandlers});
			// TODO seems to submit to server side first, and use the returned data to callback
			//  anyway, simply use the data here
			await onCreated(data);
			globalHandlers.dialog.hide();
		} catch {
			// ignore
		}
	};
	const onCancelClick = () => {
		globalHandlers.dialog.hide();
	};
	// do add escalation
	globalHandlers.dialog.show(<>
		<LayoutControllerWithLastTextarea rows={3}/>
		<AddEscalationDialog data={data} escalatedTo={escalatedTo}/>
		<UnwrappedButtonBar>
			<UnwrappedButton onClick={onConfirmClick}>
				<IntlLabel keys={['page.common.button.confirm']} value="Confirm"/>
			</UnwrappedButton>
			<UnwrappedButton ink={ButtonInk.WAIVE} onClick={onCancelClick}>
				<IntlLabel keys={['page.common.button.cancel']} value="Cancel"/>
			</UnwrappedButton>
		</UnwrappedButtonBar>
	</>, LargestDialogStyles);
};