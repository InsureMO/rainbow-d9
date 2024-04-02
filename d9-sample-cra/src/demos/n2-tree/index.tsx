import {Nullable, PPUtils, PropertyPath, StandaloneRoot, VUtils} from '@rainbow-d9/n1';
import {GlobalEventHandlers, GlobalRoot, TreeNodeCheckedChangeFrom, TreeNodeDef} from '@rainbow-d9/n2';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

const treeDetective = (parentNode?: TreeNodeDef): Array<TreeNodeDef> => {
	// no child
	if (parentNode == null || parentNode.value == null) {
		return [];
	}
	let nodes: Array<any>;
	let parent$ip2r: PropertyPath;
	if (Array.isArray(parentNode.value)) {
		// parent node is an array (which only happens on root node)
		nodes = parentNode.value;
		// my path to root is same as parent node
		parent$ip2r = parentNode.$ip2r;
	} else {
		// get nodes as children
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		nodes = (parentNode.value as any).nodes ?? [];
		// compute my path to root
		parent$ip2r = `${parentNode.$ip2r}.nodes`;
	}
	return nodes.map((item, index) => {
		if (item == null) {
			return null;
		} else {
			// compute my path to parent
			const $ip2p = `[${index}]`;
			// compute my path to tree model
			const $ip2r = PPUtils.concat(parent$ip2r, $ip2p);
			let label;
			let checkable: boolean = false;
			let checked: Nullable<TreeNodeDef['checked']> = (void 0);
			let check: Nullable<TreeNodeDef['check']> = (void 0);
			if (VUtils.isPrimitive(item)) {
				// use item itself as label
				label = `${item ?? ''}`;
			} else {
				if (item.label == null) {
					// no label declared, assigned as unnamed
					label = 'Unnamed';
				} else if (VUtils.isPrimitive(item.label)) {
					// label is primitive type, use it to renderer
					label = `${item.label ?? ''}`;
				} else {
					// read text as renderer label
					label = {
						$wt: 'Label',
						$pp: 'label.text',
						leads: ['$icons.check'],
						tails: ['$icons.remove']
					};
				}
				checkable = true;
				checked = () => item.checked ?? false;
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
					while (parent != null && parent.checkable) {
						const allChildChecked = (parent.$children ?? [])
							.filter(child => child.checkable)
							.every(child => child.checked!(child));
						await parent.check!(parent, allChildChecked, TreeNodeCheckedChangeFrom.FROM_CHILD, options);
						parent = parent.$parent;
					}
				};
				check = async (def, checked, from, options) => {
					if (def.checked!(def) === checked) {
						return;
					}
					item.checked = checked;

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
			}
			return {
				value: item, $ip2r, $ip2p, label,
				checkable, checked, check, addable: false, removable: false
			} as TreeNodeDef;
		}
	}).filter(item => item != null) as Array<TreeNodeDef>;
};
export const N2Tree = () => {
	const def = useDemoMarkdown(DemoContent);

	const externalDefs = {
		tree2: {detective: treeDetective}
	};

	return <GlobalRoot>
		<CustomEventHandler/>
		<N2DemoDialogHandler/>
		<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
	</GlobalRoot>;
};

export const N2TreeData = DemoData;
export const N2TreeMarkdown = DemoContent;
