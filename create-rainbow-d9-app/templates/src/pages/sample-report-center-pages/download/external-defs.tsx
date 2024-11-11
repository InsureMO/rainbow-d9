import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {ButtonClickOptions, GlobalHandlers, PaginationData, UnwrappedCaption} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {
	createDropdownOptionsProvider,
	D9PageExternalDefsCreator,
	D9PageExternalDefsCreatorOptions
} from '../../../page-widgets';
import {AssistantData, ResultItem, RootModel} from './types';

export const createExternalDefsCreator = (
	_rootModelRef: MutableRefObject<RootModel>, askAssistantData: (globalHandlers: GlobalHandlers) => Promise<AssistantData>): D9PageExternalDefsCreator => {
	return async (globalHandlers: D9PageExternalDefsCreatorOptions) => {
		const assistantData = await askAssistantData(globalHandlers);

		return {
			codes: createDropdownOptionsProvider(globalHandlers, {
				status: assistantData.statusOptions,
				report: assistantData.reportOptions
			}),
			criteriaToLabel: (value: any) => {
				if (value == null) {
					return '';
				}
				const keys = Object.keys(value);
				if (keys.length === 0) {
					return (void 0);
				}
				return keys.sort().map(key => {
					return <UnwrappedCaption key={key}>{key}: {value[key]}</UnwrappedCaption>;
				});
			},
			'requested-by-me': async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
			},
			search: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
			},
			download: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
			},
			retry: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
			},
			// key of element for rendering, use static key based on index to avoid flickering
			getElementKey: (_element: ResultItem, index: number) => `item-${index}`,
			// handle pagination
			onPageChanged: async (_options: { newValue: PaginationData }) => {
			}
		};
	};
};
