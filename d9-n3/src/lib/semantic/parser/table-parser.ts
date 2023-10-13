import {Table} from 'mdast';
import {PreparsedTable, PreparsedTableCell, PreparsedTableRow} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedTable, ParsedTableCell, ParsedTableRow} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class TableParser extends AbstractSemanticNodeParser<'table'> {
	public static readonly TYPE: Table['type'] = 'table';

	public getSupportedType(): 'table' {
		return TableParser.TYPE;
	}

	protected parseCell(cell: PreparsedTableCell): ParsedTableCell {
		return {
			type: ParsedNodeType.TABLE_CELL, preparsed: cell,
			children: this.parseManyNative(cell.content.children ?? [])
		};
	}

	protected parseRow(row: PreparsedTableRow): ParsedTableRow {
		return {
			type: ParsedNodeType.TABLE_ROW, preparsed: row,
			cells: (row.children ?? []).map(cell => this.parseCell(cell))
		};
	}

	public parsePreparsed(preparsed: PreparsedTable): ParsedTable {
		return {
			type: ParsedNodeType.TABLE, preparsed,
			rows: (preparsed.children ?? []).map(row => this.parseRow(row))
		};
	}
}
