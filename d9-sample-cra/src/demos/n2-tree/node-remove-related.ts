import {GlobalEventHandlers, TreeNodeDef} from '@rainbow-d9/n2';

export const removeNode = async (node: TreeNodeDef, handlers: GlobalEventHandlers) => {
	return new Promise<void>(async (resolve, reject) => {
		try {
			await handlers.global.yesNoDialog.show('Are you sure to remove the node?');
			const index = node.$parent!.$children!.indexOf(node);
			if (index !== -1) {
				node.$parent!.$children!.splice(index, 1);
				// @ts-ignore
				node.$parent!.value.nodes.splice(index, 1);
			}
			handlers.global.yesNoDialog.hide();
			resolve();
		} catch {
			handlers.global.yesNoDialog.hide();
			reject();
		}
	});
};