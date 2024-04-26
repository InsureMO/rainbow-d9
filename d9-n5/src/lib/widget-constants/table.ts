import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidgetGroupKey, PlaygroundWidgetProperty} from '../types';
import {ArrayProperties} from './attributes';

export const TableProperties: Array<PlaygroundWidgetProperty> = [
	{
		name: 'headers', label: 'Various.', description: 'Column headers.'
	},
	{name: 'headerHeight', label: 'Number.', description: 'In pixels.'},
	{name: 'expandable', label: 'Boolean.', description: 'Default false. Row expandable.'},
	{name: 'fixedLeadColumns', label: 'Number.', description: 'How many lead columns are fixed.'},
	{name: 'fixedTailColumns', label: 'Number.', description: 'How many tail columns are fixed.'},
	{name: 'hideClassicCellsOnExpandable', label: 'Boolean.', description: 'Default false.'},
	{name: 'clickToExpand', label: 'Boolean.', description: 'Default false.'},
	{name: 'maxBodyHeight', label: 'Number.', description: 'Maximum body height, in pixels.'},
	{name: 'operatorsColumnWidth', label: 'Number.', description: 'Operators column width.'},
	{name: 'rowIndexStartsFrom', label: 'Number.', description: 'Default 1.'},
	{
		name: 'omitDefaultRowOperators',
		label: 'Boolean, Text.',
		description: 'True to omit the remove, expand, collapse row operators. Or "remove" to omit remove only, "fold" to omit expand and collapse.'
	}
];

export const TABLE = [
	{
		$wt: N2.N2WidgetType.TABLE_ROW_OPERATORS,
		label: 'Table row operators', description: 'Valid only within the confines of the "Table".',
		$parent: N2.N2WidgetType.TABLE,
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE,
		notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.TABLE,
		properties: [...TableProperties, ...ArrayProperties],
		icon: PlaygroundIcons.TABLE, group: PlaygroundWidgetGroupKey.CONTAINERS,
		template: `Table::
- property: property
- expandable, clickToExpand, addable, removable, !hideClassicCellsOnExpandable
- omitDefaultRowOperators
- addLabel: Add New One
- maxBodyHeight: 400
- fixedLeadColumns: 1
- fixedTailColumns: 1
- operatorsColumnWidth: 200
- headers:
  - Column A: 300
  - Column B: 300
  - Column C: 500
  - Column D: 200
  - Column E: 200
  - Column F: 200
  - Column G: 100
- Label::::columnA
- Caption::::
  - label: Say Hello to World
  - click: alert: Hello World!
- Label::::columnC
- Label::::columnD
- Label::::columnE
- Label::::columnF
- Label::::columnG
- Table::
  - property: nested
  - headers:
    - Nest Column A: 300
    - Nest Column B: 300
  - Label::::columnNA
  - Label::::columnNB
- RowOperators::
  - Button::
    - text: X
    - fill: plain
    - click: alert: X
  - Button::
    - fill: plain
    - tails: $icons.view
    - click: alert: View
  - Button::
    - fill: plain
    - tails: $icons.edit
    - click: alert: Edit
  - Button::
    - fill: plain
    - tails: $icons.remove
    - prebuilt: remove
  - Button::
    - fill: plain
    - tails: $icons.expand
    - prebuilt: expand
  - Button::
    - fill: plain
    - tails: $icons.collapse
    - prebuilt: collapse
- Pagination::::page
  - maxButtons: 3
`
	}
];
