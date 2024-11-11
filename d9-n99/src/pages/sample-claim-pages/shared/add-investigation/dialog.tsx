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
import {
	D9Dialog,
	LargestDialogStyles,
	LayoutControllerWithLastTextarea,
	validateDialog
} from '../../../../page-widgets';
import {asT, getAuthentication} from '../../../../utils';
import {Claim} from '../index';
import {markdown} from './ui-config.d9';

export const AddInvestigationDialog = (props: { data: Claim.Investigation, investigators: DropdownOptions }) => {
	const {data, investigators} = props;
	// build a ref to keep the root model
	const rootModelRef = useRef<Claim.Investigation>(data);
	const externalDefs = async () => ({
		codes: {investigators}
	});

	return <D9Dialog ui={markdown}
	                 initRootModel={asT(rootModelRef.current)} initRootModelAsIs={true}
	                 externalDefs={externalDefs}/>;
};

export const createInvestigation = async (
	globalHandlers: GlobalHandlers,
	investigators: DropdownOptions,
	onCreated: (issue: Claim.Investigation) => Promise<void>): Promise<void> => {
	const data: Claim.Investigation = {
		// should use the store format here,
		// but for simplicity, just use the given format to make sure date format is same as mock data
		// escalatedAt: dayjs().format(CalendarUtils.getDefaultCalendarDatetimeFormat()),
		submittedAt: dayjs().format('DD/MM/YYYY'),
		submittedBy: getAuthentication()?.username,
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
	// do add investigation
	globalHandlers.dialog.show(<>
		<LayoutControllerWithLastTextarea rows={3}/>
		<AddInvestigationDialog data={data} investigators={investigators}/>
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