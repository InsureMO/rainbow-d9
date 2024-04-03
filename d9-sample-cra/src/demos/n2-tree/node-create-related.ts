import {GlobalEventHandlers, TreeNodeDef} from '@rainbow-d9/n2';
import {checkNode} from './node-check-related';

let newNodeIndex = 1;

const createNewNode = (parent: TreeNodeDef, index: number): TreeNodeDef => {
	const label = `New node ${newNodeIndex++}`;
	const item = {label};
	return {
		value: item, label,
		$ip2r: `${parent.$ip2r}.nodes[${index}]`, $ip2p: `nodes[${index}]`,
		checkable: true, checked: () => false, check: checkNode,
		addable: true, add: addNode
	};
};

const createPlaceholder = (parent: TreeNodeDef, index: number): TreeNodeDef => {
	const label = `Placeholder node ${newNodeIndex}`;
	const item = {label};
	return {
		value: item, label,
		$ip2r: `${parent.$ip2r}.nodes[${index}]`, $ip2p: `nodes[${index}]`,
		checkable: false, addable: false, removable: false
	};
};

const createNewNodeCreatorWithoutReturn = (childCount: number) => {
	return (parent: TreeNodeDef, _handlers: GlobalEventHandlers) => {
		const child = createNewNode(parent, childCount);
		// push to data
		// @ts-ignore
		parent.value.nodes.push(child.value);
		// push to tree model
		parent.$children!.push(child);
	};
};

const createNewNodeCreatorWithNodeDefReturn = (childCount: number) => {
	return (parent: TreeNodeDef, _handlers: GlobalEventHandlers) => {
		const child = createNewNode(parent, childCount);
		// push to data
		// @ts-ignore
		parent.value.nodes.push(child.value);
		// push to tree model
		parent.$children!.push(child);
		return child;
	};
};

const createNewNodeCreatorWithPlaceholderAndNoReturn = (childCount: number) => {
	return (parent: TreeNodeDef, handlers: GlobalEventHandlers) => {
		const placeholder = createPlaceholder(parent, childCount);
		// push to data
		// @ts-ignore
		parent.value.nodes.push(placeholder.value);
		// push to tree model
		parent.$children!.push(placeholder);
		return [placeholder, new Promise<void>(async (resolve, reject) => {
			try {
				await handlers.global.yesNoDialog.show('Are you sure to added the node?');
				const child = createNewNode(parent, childCount);
				// push to data
				// @ts-ignore
				parent.value!.nodes[parent.value!.nodes.length - 1] = child.value;
				// push to tree model
				parent.$children![parent.$children!.length - 1] = child;
				handlers.global.yesNoDialog.hide();
				resolve();
			} catch {
				// remove placeholder data
				// @ts-ignore
				parent.value!.nodes.length = parent.value!.nodes.length - 1;
				// remove placeholder from tree model
				parent.$children!.length = parent.$children!.length - 1;
				handlers.global.yesNoDialog.hide();
				reject();
			}
		})];
	};
};

const createNewNodeCreatorWithPlaceholderAndNodeDefReturn = (childCount: number) => {
	return (parent: TreeNodeDef, handlers: GlobalEventHandlers) => {
		const placeholder = createPlaceholder(parent, childCount);
		// push to data
		// @ts-ignore
		parent.value.nodes.push(placeholder.value);
		// push to tree model
		parent.$children!.push(placeholder);
		return [placeholder, new Promise<TreeNodeDef>(async (resolve, reject) => {
			try {
				await handlers.global.yesNoDialog.show('Are you sure to added the node?');
				const child = createNewNode(parent, childCount);
				// push to data
				// @ts-ignore
				parent.value!.nodes[parent.value!.nodes.length - 1] = child.value;
				// push to tree model
				parent.$children![parent.$children!.length - 1] = child;
				handlers.global.yesNoDialog.hide();
				resolve(child);
			} catch {
				// remove placeholder data
				// @ts-ignore
				parent.value!.nodes.length = parent.value!.nodes.length - 1;
				// remove placeholder from tree model
				parent.$children!.length = parent.$children!.length - 1;
				handlers.global.yesNoDialog.hide();
				reject();
			}
		})];
	};
};

export const addNode = async (parent: TreeNodeDef, handlers: GlobalEventHandlers) => {
	if (parent.$children == null) {
		parent.$children = [];
	}
	// @ts-ignore
	if (parent.value!.nodes == null) {
		// @ts-ignore
		parent.value!.nodes = [];
	}
	const childCount = parent.$children.length;

	return [
		// no return
		createNewNodeCreatorWithoutReturn(childCount),
		// return new child node
		createNewNodeCreatorWithNodeDefReturn(childCount),
		// return placeholder, and no return
		createNewNodeCreatorWithPlaceholderAndNoReturn(childCount),
		// return placeholder, and new child node
		createNewNodeCreatorWithPlaceholderAndNodeDefReturn(childCount)
	][Math.floor(Math.random() * 4)](parent, handlers);
};