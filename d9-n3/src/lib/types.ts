import {NodeDef} from '@rainbow-d9/n1';

export type MarkdownContent = string;
export type NodeDefExportKey = string;

export interface ParsedNodeDef {
	node: NodeDef;
	exportKey?: NodeDefExportKey;
	success: boolean;
}
