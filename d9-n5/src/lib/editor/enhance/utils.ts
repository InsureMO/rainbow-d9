import {EditorState} from '@codemirror/state';
import {SyntaxNode, Tree} from '@lezer/common';

const findPropertyNode = (node: SyntaxNode): SyntaxNode | undefined => {
	while (node.name !== 'WidgetDeclarationAttrName') {
		node = node.prevSibling;
		if (node.name === 'BulletList' || node.name === 'ListItem') {
			break;
		}
	}
	if (node.name !== 'WidgetDeclarationAttrName') {
		return (void 0);
	}
	return node;
};

/**
 * current is a ListItem, to find the widget type which leads this item.
 */
export const findWidgetType = (node: SyntaxNode, state: EditorState): { $wt?: string, direct?: boolean } => {
	const bulletList = node.parent;
	if (bulletList == null || bulletList.name !== 'BulletList') {
		return (void 0);
	}
	//TODO CONSIDERING THIS NODE IS NOT THE FIRST CHILD OF PARENT,
	// IF PREVIOUS SIBLINGS CONTAINS WIDGET DECLARATION, WHICH MEANS THIS NODE CANNOT BE A PROPERTY DECLARATION
	// HOWEVER, FOR NOW, LET'S IGNORE THIS SITUATION, AS IT MAY BE MANUALLY ADJUSTED TO ENSURE GRAMMATICAL CORRECTNESS.

	// check the parent, it might be Document or ListItem or something else
	const parent = bulletList.parent;
	if (parent == null) {
		return {};
	}
	const tryToFind = (declaration: SyntaxNode, heading: boolean): { $wt?: string, direct?: boolean } => {
		if (declaration == null || declaration.name !== 'WidgetDeclaration') {
			return {};
		}
		const declarationType = declaration.firstChild;
		if (declarationType == null || declarationType.name !== 'WidgetDeclarationType') {
			if (!heading) {
				//TODO SOMETIMES, PROPERTY ALSO CAN USE SUB LIST TO DESCRIBE MORE DETAILS
				// BUT CURRENTLY, ONLY FIND THE WIDGET DECLARATION TYPE
			}
			return {};
		}
		return {$wt: (state.sliceDoc(declarationType.from, declarationType.to) ?? '').trim(), direct: true};
	};
	if (parent.name === 'Document') {
		// find the closest heading, there still can be a ListItem which declares widget anyway,
		// but since it may be manually adjusted to ensure the grammatical correctness,
		// so for now, ignore the ListItem
		let previous = parent.childBefore(node.from);
		while (previous != null && !previous.name.startsWith('ATXHeading')) {
			previous = parent.childBefore(previous.from);
		}
		if (previous == null) {
			return {};
		}
		// if the Heading is a widget declaration, check follows:
		// firstChild is HeadMark, nextSibling is WidgetDeclaration
		return tryToFind(previous.firstChild?.nextSibling, true);
	} else if (parent.name !== 'ListItem') {
		return {};
	} else {
		// if the ListItem is a widget declaration, check follows:
		// firstChild is ListMark, nextSibling is Paragraph or MightBeWidgetDeclaration, firstChild could be WidgetDeclaration
		return tryToFind(parent.firstChild?.nextSibling?.firstChild, false);
	}
};

/**
 * given node should be ListItem or ATXHeading1-6, otherwise return undefined.
 */
export const findParentWidgetType = (node: SyntaxNode, state: EditorState): string | undefined => {
	if (node.name === 'ListItem') {
		return findWidgetType(node, state).$wt;
	} else if (node.name.startsWith('ATXHeading')) {
		const level = Number(node.name.substring(10));
		let previous = node.prevSibling;
		while (previous != null) {
			if (previous.name.startsWith('ATXHeading')) {
				const previousLevel = Number(previous.name.substring(10));
				if (previousLevel < level) {
					const typeNode = previous.firstChild?.nextSibling?.firstChild;
					// should be HeadMark, WidgetDeclaration, WidgetDeclarationType
					if (typeNode?.name === 'WidgetDeclarationType') {
						return (state.sliceDoc(typeNode.from, typeNode.to) ?? '').trim();
					} else {
						return (void 0);
					}
				}
			}
			previous = previous.prevSibling;
		}
		return (void 0);
	} else {
		return (void 0);
	}
};

interface WidgetTypeAndProperty {
	$wt?: string;
	property?: string;
	direct?: boolean;
}

export const findWidgetTypeAndProperty = (node: SyntaxNode, state: EditorState, tree: Tree): WidgetTypeAndProperty => {
	const propertyNode = findPropertyNode(node);
	if (propertyNode == null) {
		return {} as WidgetTypeAndProperty;
	}
	const property = (state.sliceDoc(propertyNode.from, propertyNode.to) ?? '').trim();
	let nodeBefore = tree.resolveInner(propertyNode.from, -1);
	if (nodeBefore == null) {
		return {property};
	} else if (nodeBefore.name === 'MightBeWidgetDeclaration') {
		nodeBefore = tree.resolveInner(nodeBefore.from, -1);
	}
	if (nodeBefore.name === 'ListItem') {
		//TODO CURRENTLY ONLY ONE LEVEL UP, THEREFORE DIRECT ALWAYS BE TRUE
		// DEPENDS ON THE LOGIC OF findWidgetType
		const {$wt, direct} = findWidgetType(nodeBefore, state);
		return {$wt, property, direct};
	} else {
		return {property};
	}
};
