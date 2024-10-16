import {BaseModel, PropValue, RootEventTypes} from '@rainbow-d9/n1';
import {
	ButtonClickOptions,
	ButtonInk,
	DOM_KEY_WIDGET,
	GlobalHandlers,
	IntlLabel,
	UnwrappedButton,
	UnwrappedButtonBar
} from '@rainbow-d9/n2';
import {useRef} from 'react';
import styled from 'styled-components';
import {asT} from '../../../../utils';
import {D9Dialog, LargestDialogStyles} from '../../../standard-widgets';
import {Claim} from '../../shared';
import {createExternalDefsCreator, RegisterAction} from './external-defs';
import InitRootModel from './init-root.json';
import {RootModel} from './types';
import {markdown} from './ui-config.d9';

const ClaimRegistrationFindInsuredDialog = (props: { register: RegisterAction }) => {
	const {register} = props;

	// replace the title of search section
	const revisedMarkdown = markdown.replace('page.common.title.advanced', 'page.common.title.search');
	// build a ref to keep the root model
	const rootModelRef = useRef<RootModel>(JSON.parse(JSON.stringify(InitRootModel)));
	// remove the fuzzy search, use advanced search as default
	rootModelRef.current.control.fuzzySearchEnabled = false;
	rootModelRef.current.control.advancedSearchEnabled = true;
	const externalDefs = createExternalDefsCreator(rootModelRef, register);

	return <D9Dialog ui={revisedMarkdown}
	                 initRootModel={asT(rootModelRef.current)} initRootModelAsIs={true}
	                 externalDefs={externalDefs}/>;
};

// 178px is height of search section
// noinspection CssUnresolvedCustomProperty
const LayoutController = styled.div.attrs({[DOM_KEY_WIDGET]: 'dialog-layout-controller'})`
    display: none;

    + div[data-w=page-standard-wrapper] > div[data-w=d9-page] > div[data-w=d9-table] > div[data-w=d9-table-content] {
        max-height: calc(var(--app-dialog-largest-height)
        - var(--d9-dialog-padding-top)
        - 178px
        - var(--app-page-next-to-search-margin)
        - var(--d9-table-footer-height)
        - var(--d9-input-height) - var(--d9-button-bar-padding-tb) * 2
        - var(--d9-dialog-padding-bottom));
    }
`;
type FoundInsured = Parameters<Parameters<typeof ClaimRegistrationFindInsuredDialog>[0]['register']>[0];
const findInsured = async (globalHandlers: GlobalHandlers, onSelect: (found: FoundInsured) => Promise<void>): Promise<void> => {
	const onCancelClick = () => {
		globalHandlers.dialog.hide();
	};
	const onRegister = async (data: FoundInsured) => {
		await onSelect(data);
		globalHandlers.dialog.hide();
	};
	// do change insured
	globalHandlers.dialog.show(<>
		<LayoutController/>
		<ClaimRegistrationFindInsuredDialog register={onRegister}/>
		<UnwrappedButtonBar>
			<UnwrappedButton ink={ButtonInk.WAIVE} onClick={onCancelClick}>
				<IntlLabel keys={['page.common.button.cancel']} value="Cancel"/>
			</UnwrappedButton>
		</UnwrappedButtonBar>
	</>, LargestDialogStyles);
};

interface AcceptRootModel {
	data: {
		insured: Claim.Insured;
		reporter: Claim.Reporter;
	};
}

export const createChangeInsuredAction = (options: {
	globalHandlers: GlobalHandlers;
}) => {
	const {globalHandlers} = options;
	return {
		click: async (options: ButtonClickOptions<BaseModel, PropValue>) => {
			await findInsured(globalHandlers, async (found: FoundInsured) => {
				const root: AcceptRootModel = asT(options.root);
				const insured = root.data.insured!;
				insured.customerId = found.customerId;
				insured.name = found.insuredName;
				insured.idType = found.idType;
				insured.idNo = found.idNo;
				insured.dob = found.dob;
				insured.gender = found.gender;
				globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/data.insured', asT(insured), asT(insured));
				const reporter = root.data.reporter;
				if (reporter.relationship === 'self') {
					// also sync to reporter when it is declared as self, which means reporter is insured himself/herself
					reporter.idType = insured.idType;
					reporter.idNo = insured.idNo;
					reporter.name = insured.name;
					// notify
					globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/data.reporter', asT(reporter), asT(reporter));
				}
			});
		}
	};
};