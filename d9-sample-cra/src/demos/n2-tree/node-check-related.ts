import {GlobalEventHandlers, TreeNodeCheckedChangeFrom, TreeNodeDef} from '@rainbow-d9/n2';

const syncToChildren = async (def: TreeNodeDef, checked: boolean, options: GlobalEventHandlers) => {
	await (def.$children ?? []).reduce(async (previous, child) => {
		await previous;
		if (child.checkable) {
			await child.check!(child, checked, TreeNodeCheckedChangeFrom.FROM_PARENT, options);
		}
		return previous;
	}, Promise.resolve());
};

const syncToParent = async (def: TreeNodeDef, options: GlobalEventHandlers) => {
	let parent = def.$parent;
	while (parent != null) {
		if (parent.checkable) {
			const allChildChecked = (parent.$children ?? [])
				.filter(child => child.checkable)
				.every(child => child.checked!(child));
			await parent.check!(parent, allChildChecked, TreeNodeCheckedChangeFrom.FROM_CHILD, options);
		}
		parent = parent.$parent;
	}
};

export const checkNode = async (def: TreeNodeDef, checked: boolean, from: TreeNodeCheckedChangeFrom, options: GlobalEventHandlers) => {
	if (def.checked!(def) === checked) {
		return;
	}
	// @ts-ignore
	def.value.checked = checked;

	// it's very important to update the tree model based on given change from
	// otherwise leads unpredictable behavior
	switch (from) {
		case TreeNodeCheckedChangeFrom.FROM_SELF:
			await syncToChildren(def, checked, options);
			await syncToParent(def, options);
			break;
		case TreeNodeCheckedChangeFrom.FROM_CHILD:
			await syncToParent(def, options);
			break;
		case TreeNodeCheckedChangeFrom.FROM_PARENT:
			await syncToChildren(def, checked, options);
			break;
	}
};