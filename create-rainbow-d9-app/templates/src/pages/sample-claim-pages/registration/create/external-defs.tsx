import {BaseModel, PropValue, RootEventTypes, ValueChangedOptions} from '@rainbow-d9/n1';
import {
	ButtonClickOptions,
	ButtonInk,
	DOM_KEY_WIDGET,
	GlobalHandlers,
	IntlLabel,
	UnwrappedButton,
	UnwrappedButtonBar
} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import styled from 'styled-components';
import {
	createDropdownOptionsProvider,
	D9PageExternalDefsCreatorOptions,
	doValidatePage,
	LargestDialogStyles,
	validatePage
} from '../../../standard-widgets';
import {ClaimRegistrationFindInsuredDialog} from '../find-insured/page-as-dialog';
import {AssistantData, RootModel} from './types';

// 80vh - 32px - 178px - 16px - 36px - 2px - 44px - 48px - 16px
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
export const createExternalDefsCreator = (_rootModelRef: MutableRefObject<any>, askAssistantData: (globalHandlers: GlobalHandlers) => Promise<AssistantData>) => {
	return async (globalHandlers: D9PageExternalDefsCreatorOptions) => {
		const assistantData = await askAssistantData(globalHandlers);

		return {
			codes: createDropdownOptionsProvider(globalHandlers, {
				channelsForClaimRegistration: assistantData.submissionChannelOptions
			}),
			'change-insured': {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					const onCancelClick = () => {
						globalHandlers.dialog.hide();
					};
					// do change insured
					globalHandlers.dialog.show(<>
						<LayoutController/>
						<ClaimRegistrationFindInsuredDialog/>
						<UnwrappedButtonBar>
							<UnwrappedButton ink={ButtonInk.WAIVE} onClick={onCancelClick}>
								<IntlLabel keys={['page.common.button.cancel']} value="Cancel"/>
							</UnwrappedButton>
						</UnwrappedButtonBar>
					</>, LargestDialogStyles);
				}
			},
			'search-reporter': {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					// do change insured
					alert('Search reporter button clicked.');
				}
			},
			relationshipChanged: async (options: ValueChangedOptions<string>): Promise<void> => {
				const {root, newValue, oldValue} = options;
				if (newValue === oldValue) {
					return;
				}
				if (newValue === 'self') {
					const {insured, reporter} = (root as unknown as RootModel).data;
					reporter.idType = insured?.idType;
					reporter.idNo = insured?.idNo;
					reporter.name = insured?.name;
					// notify
					globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/data.reporter', reporter as unknown as PropValue, reporter as unknown as PropValue);
				}
			},
			comment: {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					alert('Comment button clicked.');
				}
			},
			save: {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					// try catch
					try {
						await doValidatePage(globalHandlers);
						alert('Pass the validation.');
					} catch {
						// ignore
					}
				}
			},
			submit: {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					// callback, never reject, therefore no need to catch
					await validatePage(globalHandlers, async () => {
						alert('Pass the validation.');
					});
				}
			}
		};
	};
};
