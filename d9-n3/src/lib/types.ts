import {NodeDef} from '@rainbow-d9/n1';
import {PreparsedHeading, PreparsedListItem} from './ast';

export type MarkdownContent = string;
export type NodeDefExportKey = string;

export interface DocParseOptions {
	keepMd?: boolean;
	forPlayground?: string;
}

export interface NodeDefExt {
	preparsed?: PreparsedHeading | PreparsedListItem;
}

export interface ParsedNodeDef {
	node: NodeDef & NodeDefExt;
	exportKey?: NodeDefExportKey;
	success: boolean;
	error?: string | Error;
}
