import {Nullable, PPUtils, PropertyPath, StandaloneRoot, VUtils} from '@rainbow-d9/n1';
import {GlobalRoot, TreeNodeDef} from '@rainbow-d9/n2';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';
import {checkNode} from './node-check-related';
import {addNode} from './node-create-related';

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
			let addable: boolean = false;
			let removable: boolean = false;
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
				check = checkNode;
				addable = true;
				removable = true;
			}
			return {
				value: item, $ip2r, $ip2p, label,
				checkable, checked, check,
				addable: addable, add: addable ? addNode : (void 0),
				removable: removable, remove: removable ? async (node: TreeNodeDef) => {
					console.log(node);
					return Promise.reject((void 0));
				} : (void 0)
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
