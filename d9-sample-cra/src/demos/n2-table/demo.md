# Page::Demo Tab

## Section::# 3.1. Table

### Table

- property: nestedTables
- expandable, clickToExpand, addable, removable, !hideClassicCellsOnExpandable
- omitDefaultRowOperators
- addLabel: Add New One
- maxBodyHeight: 400
- fixedLeadColumns: 1
- fixedTailColumns: 1
- operatorsColumnWidth: 200
- initExpanded: @ext.table1.initExpanded
- headers:
	- column:
		- label: Box
			- Caption::Column A::
			- Caption::*::
		- width: 300
	- Column B: 300
	- Column C: 500
	- Column D: 200
	- Column E: 200
	- Column F: 200
	- Column G: 100
- Input::::columnA
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
		- visible:
			- on: columnA
			- handle:
			  ```javascript
			  return (model.columnA ?? '').endsWith('#1');
			  ```
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

## Section::# 3.2. Pagination

- Pagination::::pagination
	- freeWalk
	- sizes: 10;20;30

## Section::# 3.3. Remote Table

### Table::

- property: table2
- headers:
	- Column A: 300
- Label::::columnA
- Pagination::::page2
	- freeWalk
	- maxButtons: 3
	- sizes: 6;9;12
	- valueChanged: @ext.table2.onPageChanged

## Section::# 3.4. Table 3

- property: sectionForTable3

### Table::

- property: table3
- addable
- repaint:
	- on: table3
- headers:
	- Column A: 300
- Label::::columnA

### Button::::

- text: Add Row Into Table3
- click: @ext.table3.addRow
