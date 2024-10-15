import {ObjectPropValue} from '@rainbow-d9/n1';
import {
	ButtonInk,
	DOM_KEY_WIDGET,
	GlobalHandlers,
	IntlLabel,
	UnwrappedButton,
	UnwrappedButtonBar
} from '@rainbow-d9/n2';
import dayjs from 'dayjs';
import {useRef} from 'react';
import styled from 'styled-components';
import {getAuthentication} from '../../../../utils';
import {D9Dialog, LargestDialogStyles, validateDialog} from '../../../standard-widgets';
import {Claim} from '../../shared';
import {markdown} from './ui-config.d9';

export const AddClaimIssueDialog = (props: { data: Claim.ClaimIssue }) => {
	const {data} = props;
	// build a ref to keep the root model
	const rootModelRef = useRef<Claim.ClaimIssue>(data);
	const externalDefs = async () => ({});

	return <D9Dialog ui={markdown}
	                 initRootModel={rootModelRef.current as unknown as ObjectPropValue} initRootModelAsIs={true}
	                 externalDefs={externalDefs}/>;
};

// 86px is height of title part
// noinspection CssUnresolvedCustomProperty
const LayoutController = styled.div.attrs({[DOM_KEY_WIDGET]: 'dialog-layout-controller'})`
    display: none;

    + div[data-w=page-standard-wrapper] > div[data-w=d9-page] textarea[data-w=d9-textarea] {
        height: calc(var(--app-dialog-largest-height)
        - var(--d9-dialog-padding-top)
        - var(--d9-section-header-height) - var(--d9-section-body-padding)
        - 86px
        - var(--d9-table-footer-height)
        - var(--d9-input-height) - var(--d9-button-bar-padding-tb) * 2
        - var(--d9-dialog-padding-bottom));
    }
`;
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
	// do change insured
	globalHandlers.dialog.show(<>
		<LayoutController/>
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