import {PPUtils, PropertyPath, VUtils} from '@rainbow-d9/n1';
import {GlobalEventHandlers} from '../types';
import {TreeNodeDef, TreeNodeDetect, TreeNodeOperation} from './types';

export const beautifyNodes = (nodes: Array<TreeNodeDef>, options: Required<TreeNodeOperation>): Array<TreeNodeDef> => {
	return (nodes ?? []).map(node => {
		node.checkable = node.checkable ?? options.checkable;
		node.addable = node.addable ?? options.addable;
		node.removable = node.removable ?? options.removable;
		if (node.children != null) {
			beautifyNodes(node.children, options);
		}
		return node;
	});
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const defaultDetective: TreeNodeDetect = (parentNode, _options) => {
	if (parentNode == null || parentNode.value == null) {
		return [];
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let nodes: Array<any>;
	let parent$ip2r: PropertyPath;
	if (Array.isArray(parentNode.value)) {
		nodes = parentNode.value;
		parent$ip2r = parentNode.$ip2r;
	} else {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		nodes = (parentNode.value as any).children ?? [];
		parent$ip2r = `${parentNode.$ip2r}.children`;
	}
	return nodes.map((item, index) => {
		if (item == null) {
			return null;
		} else {
			const $ip2p = `[${index}]`;
			const $ip2r = PPUtils.concat(parent$ip2r, $ip2p);
			return {
				// concat parent path to root node as my path to root node
				value: item, $ip2r, $ip2p,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				label: VUtils.isPrimitive(item) ? `${item ?? ''}` : ((item as any).label ?? ''),
				checkable: false, addable: false, removable: false
			} as TreeNodeDef;
		}
	}).filter(item => item != null);
};

export const buildDetective = (detective: TreeNodeDetect, options: Required<TreeNodeOperation>): TreeNodeDetect => {
	const detect = detective ?? defaultDetective;
	const detectChildren = (node: TreeNodeDef, _options: GlobalEventHandlers) => {
		node.children = detect(node, _options);
		if (node.children != null && node.children.length === 0) {
			delete node.children;
		}
		if (node.children != null) {
			node.children.forEach(child => detectChildren(child, _options));
		}
	};

	return (parentNode, _options) => {
		const nodes = detect(parentNode, _options);
		(nodes || []).forEach(node => detectChildren(node, _options));
		return beautifyNodes(nodes, options);
	};
};
