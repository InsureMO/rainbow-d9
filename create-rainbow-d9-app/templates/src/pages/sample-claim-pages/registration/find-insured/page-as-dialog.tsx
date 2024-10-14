import {ObjectPropValue} from '@rainbow-d9/n1';
import {
	ButtonInk,
	DOM_KEY_WIDGET,
	GlobalHandlers,
	IntlLabel,
	UnwrappedButton,
	UnwrappedButtonBar
} from '@rainbow-d9/n2';
import {useRef} from 'react';
import styled from 'styled-components';
import {D9Dialog, LargestDialogStyles} from '../../../standard-widgets';
import {createExternalDefsCreator, RegisterAction} from './external-defs';
import InitRootModel from './init-root.json';
import {RootModel} from './types';
import {markdown} from './ui-config.d9';

export const ClaimRegistrationFindInsuredDialog = (props: { register: RegisterAction }) => {
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
	                 initRootModel={rootModelRef.current as unknown as ObjectPropValue} initRootModelAsIs={true}
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
export type FoundInsured = Parameters<Parameters<typeof ClaimRegistrationFindInsuredDialog>[0]['register']>[0];
export const findInsured = async (globalHandlers: GlobalHandlers, onSelect: (found: FoundInsured) => Promise<void>): Promise<void> => {
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