import {Content, Table, TableCell, TableRow} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedTable, PreparsedTableCell, PreparsedTableRow} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class TablePreparser extends AbstractAstNodePreparser<'table'> {
	public static readonly TYPE: Table['type'] = 'table';

	public getSupportedType(): 'table' {
		return TablePreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	protected parseCell(node: TableCell): PreparsedTableCell {
		return {type: ParsedNodeType.TABLE_CELL, content: node};
	}

	protected parseRow(node: TableRow): PreparsedTableRow {
		return {
			type: ParsedNodeType.TABLE_ROW, content: node,
			children: (node.children ?? []).map(cell => this.parseCell(cell))
		};
	}

	public parse(node: Table): PreparsedTable {
		return {
			type: ParsedNodeType.TABLE, content: node,
			children: (node.children ?? []).map(row => this.parseRow(row))
		};
	}
}
