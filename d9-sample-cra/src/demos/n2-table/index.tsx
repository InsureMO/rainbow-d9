import {
	BridgeEventBusProvider,
	BridgeToRootEventTypes,
	ObjectPropValue,
	StandaloneRoot,
	useBridgeEventBus,
	ValueChangedNotification
} from '@rainbow-d9/n1';
import {$d9n2, GlobalRoot, PaginationData, SortedTableColumn, TableColumnSortType} from '@rainbow-d9/n2';
import {nanoid} from 'nanoid';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

// prepare data
// @ts-ignore
DemoData.table2 = DemoData.nestedTables.filter((_, index) => index < 5);
// @ts-ignore
DemoData.page2 = JSON.parse(JSON.stringify(DemoData.page));

$d9n2.intl.labels['en-US'] = {
	...($d9n2.intl.labels['en-US'] ?? {}),
	table: {
		headers: {
			operators: 'Actions'
		}
	}
};
const InternalN2Table = () => {
	const def = useDemoMarkdown(DemoContent);
	const {fire} = useBridgeEventBus();

	const initExpandedComputed: Array<number> = [];
	let originalNestedTables = DemoData.nestedTables;
	const externalDefs = {
		table1: {
			initExpanded: (_: ObjectPropValue, index: number) => {
				// this function is unstable, depends on table data
				// in this case, table data is initialized, so use a computed array to store expanded index
				// if table data is initialized from pagination, on different pages,
				// the same index will appear multiple times, so only the first occurrence will be expanded.
				// If you want each occurrence of the same index on every page to be expanded,
				// you should remove the cache judgment.
				// Therefore, the implementation of this function depends on the actual display requirements.index
				if (initExpandedComputed.includes(index)) {
					return false;
				}
				initExpandedComputed.push(index);
				return index === 1;
			},
			sort: async (by: Array<SortedTableColumn>) => {
				const [{type}] = by;
				if (type === TableColumnSortType.ASC) {
					originalNestedTables = [...DemoData.nestedTables];
					DemoData.nestedTables = DemoData.nestedTables.sort((a, b) => a.columnA.localeCompare(b.columnA));
				} else if (type === TableColumnSortType.DESC) {
					DemoData.nestedTables = DemoData.nestedTables.sort((a, b) => b.columnA.localeCompare(a.columnA));
				} else {
					DemoData.nestedTables = originalNestedTables;
				}
			}
		},
		table2: {
			onPageChanged: async (options: { newValue: PaginationData }) => {
				const {newValue: {pageNumber, pageSize}} = options;
				const startIndex = (pageNumber - 1) * pageSize;
				const endIndex = startIndex + pageSize - 1;
				// @ts-ignore
				DemoData.table2 = DemoData.nestedTables.filter((_, index) => index >= startIndex && index <= endIndex);
				// console.log(DemoData.table2);
			}
		},
		table3: {
			addRow: () => {
				const carrier = DemoData.sectionForTable3 as { table3: Array<any> };
				if (carrier.table3 == null) {
					carrier.table3 = [{columnA: nanoid()}];
				} else {
					carrier.table3.push({columnA: nanoid()});
				}
				// send event to internal, notify that value changed
				fire<ValueChangedNotification>(BridgeToRootEventTypes.NOTIFY_VALUE_CHANGED, {
					absolutePath: '/sectionForTable3.table3', from: carrier.table3, to: carrier.table3
				});
			}
		}
	};

	return <GlobalRoot>
		<CustomEventHandler/>
		<N2DemoDialogHandler/>
		<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
	</GlobalRoot>;
};

export const N2Table = () => {
	// wrap all into bridge event bus
	return <BridgeEventBusProvider>
		<InternalN2Table/>
	</BridgeEventBusProvider>;
};

export const N2TableData = DemoData;
export const N2TableMarkdown = DemoContent;
