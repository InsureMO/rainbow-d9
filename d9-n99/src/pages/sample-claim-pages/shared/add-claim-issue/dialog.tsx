import {ButtonInk, GlobalHandlers, IntlLabel, UnwrappedButton, UnwrappedButtonBar} from '@rainbow-d9/n2';
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

export const AddClaimIssueDialog = (props: { data: Claim.ClaimIssue }) => {
	const {data} = props;
	// build a ref to keep the root model
	const rootModelRef = useRef<Claim.ClaimIssue>(data);
	const externalDefs = async () => ({});

	return <D9Dialog ui={markdown}
	                 initRootModel={asT(rootModelRef.current)} initRootModelAsIs={true}
	                 externalDefs={externalDefs}/>;
};

export const createClaimIssue = async (globalHandlers: GlobalHandlers, onCreated: (issue: Claim.ClaimIssue) => Promise<void>): Promise<void> => {
	const data: Claim.ClaimIssue = {
		// should use the store format here,
		// but for simplicity, just use the given format to make sure date format is same as mock data
		// generatedAt: dayjs().format(CalendarUtils.getDefaultCalendarDatetimeFormat()),
		generatedAt: dayjs().format('DD/MM/YYYY'),
		generatedBy: getAuthentication()?.username,
		status: 'open'
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
	// do add claim issue
	globalHandlers.dialog.show(<>
		<LayoutControllerWithLastTextarea rows={2}/>
		<AddClaimIssueDialog data={data}/>
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