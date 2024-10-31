import {
	BaseModel,
	MonitorNodeAttributes,
	NodeAttributeValueHandleOptions,
	NodeDef,
	NUtils,
	PropValue,
	ValidationResult,
	VUtils
} from '@rainbow-d9/n1';
import {
	CalendarDef,
	DropdownDef,
	DropdownOptions,
	DropdownTreeOptions,
	GlobalEventHandlers,
	GlobalHandlers,
	InputDef,
	ModelCarrier,
	PageDef,
	SectionDef
} from '@rainbow-d9/n2';
import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../global-settings';
import {asT} from '../../../utils';
import {createDropdownOptionsProvider, PreloadedLazyPageWrapper, PreloaderFuncOptions} from '../../standard-widgets';
import {createReportTreeOptions, MockData} from '../shared';
import InitRootModel from './init-root.json';
import {AssistantData, Criteria, ReportCriteria, RootModel} from './types';
import {markdown} from './ui-config.d9';

const ReportGenerateIndex = PreloadedLazyPageWrapper<AssistantData>(lazy(() => import('./page')), (() => {
	let generatingSectionSubNodes: Array<NodeDef> = [];
	let originalGeneratingSectionSubNodes: Array<NodeDef> = [];

	const generateCriteriaNodeDef = (criteria: ReportCriteria): NodeDef => {
		const {fieldName, displayName, required} = criteria;
		return asT({
			$pp: `condition.${fieldName}`,
			$key: NUtils.generateReactKey(),
			// @ts-ignore
			'data-required': required ? true : (void 0),
			label: VUtils.isBlank(displayName) ? fieldName : displayName,
			[MonitorNodeAttributes.VALID]: required ? {
				$watch: (void 0),
				$handle: async <R extends BaseModel, M extends PropValue, V extends PropValue, FV extends PropValue, TV extends PropValue>
				(options: NodeAttributeValueHandleOptions<R, M, V, FV, TV>): Promise<ValidationResult> => {
					const {to} = options;
					if (VUtils.isBlank(to)) {
						return {valid: false, failReason: 'Field is required.'};
					} else {
						// @ts-ignore
						return (void 0);
					}
				}
			} : (void 0)
		});
	};
	const generateCriteriaNodes = (criteria: Array<ReportCriteria>): Array<NodeDef> => {
		return criteria.map(c => {
			const {dataType, codesName} = c;
			let def: NodeDef;
			switch (dataType) {
				case 'codes': {
					def = {
						...generateCriteriaNodeDef(c),
						$wt: 'Dropdown.FC', please: 'Please select...',
						options: async (options: ModelCarrier & GlobalEventHandlers): Promise<DropdownOptions> => {
							if (VUtils.isBlank(codesName)) {
								return [];
							} else {
								const func = createDropdownOptionsProvider(options.global)[codesName!];
								return await func();
							}
						}
					} as DropdownDef;
					break;
				}
				case 'date': {
					def = {...generateCriteriaNodeDef(c), $wt: 'Date.FC'} as CalendarDef;
					break;
				}
				case 'number': {
					def = {...generateCriteriaNodeDef(c), $wt: 'Input.FC'} as InputDef;
					break;
				}
				case 'boolean': {
					def = {
						...generateCriteriaNodeDef(c),
						$wt: 'Dropdown.FC', please: 'Please select...',
						options: async (options: ModelCarrier & GlobalEventHandlers): Promise<DropdownOptions> => {
							const func = createDropdownOptionsProvider(options.global).yesNo;
							return await func();
						}
					} as DropdownDef;
					break;
				}
				case 'string':
				default: {
					def = {...generateCriteriaNodeDef(c), $wt: 'Input.FC'} as InputDef;
				}
			}

			return def;
		});
	};
	// use IIFE to create a context, which used to store the root model
	const createCriteriaProxy = (criteria: Criteria) => {
		return new Proxy(criteria, {
			set(target: Criteria, p: string | symbol, newValue: any, receiver: any): boolean {
				if (p === 'defs') {
					if (newValue == null) {
						generatingSectionSubNodes.length = 0;
						generatingSectionSubNodes.push(...originalGeneratingSectionSubNodes);
					} else {
						generatingSectionSubNodes.length = 0;
						generatingSectionSubNodes.push(
							...generateCriteriaNodes(asT<Array<ReportCriteria>>(newValue)),
							...originalGeneratingSectionSubNodes
						);
					}
					return true;
				} else {
					return Reflect.set(target, p, newValue, receiver);
				}
			}
		});
	};
	return {
		ui: async (_options: PreloaderFuncOptions): Promise<string> => {
			return markdown;
		},
		manufactureParsedUI: async (_options: PreloaderFuncOptions) => {
			return (parsed: NodeDef) => {
				const page = asT<PageDef>(parsed);
				const section = asT<SectionDef>(page.$nodes.find(child => child.$wt === 'Section' && asT<any>(child)['data-dynamic'] === true));
				// backup
				originalGeneratingSectionSubNodes = section.$nodes;
				generatingSectionSubNodes = [...originalGeneratingSectionSubNodes];
				// use new array
				section.$nodes = generatingSectionSubNodes;
				return parsed;
			};
		},
		/** initialize root model */
		initRootModel: async (_options: PreloaderFuncOptions) => {
			// clone
			const rootModel: RootModel = JSON.parse(JSON.stringify(InitRootModel));
			rootModel.criteria = createCriteriaProxy(rootModel.criteria);
			return asT(rootModel);
		},
		/** run after root model initialized, to load submission channel */
		assistantData: async (_options: PreloaderFuncOptions) => {
			return async (_globalHandlers: GlobalHandlers) => {
				const reportOptions: DropdownTreeOptions = createReportTreeOptions(MockData.reports(true));
				const generateFileTypeOptions: DropdownTreeOptions = [
					{value: 'csv', label: 'CSV'},
					{value: 'edi', label: 'EDI'},
					{value: 'plain-excel', label: 'Plain Excel'},
					{value: 'template', label: 'Follow Template File'}
				];
				return {reportOptions, generateFileTypeOptions};
			};
		}
	};
})());

const ReportGeneratePage: AppPage = {
	code: 'report-generate',
	route: '/report/generate',
	menuItemCode: 'report-generate',
	breadcrumb: {
		title: 'Generate Report',
		locations: ['home.title', 'Report']
	},
	renderer: ReportGenerateIndex
};

// register
PageRegistrar.register(ReportGeneratePage);
