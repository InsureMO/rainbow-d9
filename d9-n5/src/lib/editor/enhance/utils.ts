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

export const findProperty = (node: SyntaxNode, state: EditorState): string | undefined => {
	const propertyNode = findPropertyNode(node);
	return propertyNode == null ? (void 0) : state.sliceDoc(node.from, node.to);
};

/**
 * current is a ListItem, to find the widget type which leads this item.
 */
export const findWidgetType = (node: SyntaxNode, state: EditorState): string | undefined => {
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
		return (void 0);
	}
	if (parent.name === 'Document') {
		// find the closest heading, there still can be a ListItem which declares widget anyway,
		// but since it may be manually adjusted to ensure the grammatical correctness,
		// so for now, ignore the ListItem
		let previous = parent.childBefore(node.from);
		while (previous != null && !previous.name.startsWith('ATXHeading')) {
			previous = parent.childBefore(previous.from);
		}
		if (previous == null) {
			return (void 0);
		}
		// if the Heading is a widget declaration, check follows:
		// firstChild is HeadMark, nextSibling is WidgetDeclaration
		const declaration = previous.firstChild?.nextSibling;
		if (declaration == null || declaration.name !== 'WidgetDeclaration') {
			return (void 0);
		}
		const declarationType = declaration.firstChild;
		if (declarationType == null || declarationType.name !== 'WidgetDeclarationType') {
			return (void 0);
		}
		return state.sliceDoc(declarationType.from, declarationType.to);
	} else if (parent.name !== 'ListItem') {
		return (void 0);
	}
	// if the ListItem is a widget declaration, check follows:
	// firstChild is ListMark, nextSibling is Paragraph, firstChild could be WidgetDeclaration
	const declaration = parent.firstChild?.nextSibling?.firstChild;
	if (declaration == null || declaration.name !== 'WidgetDeclaration') {
		return (void 0);
	}
	const declarationType = declaration.firstChild;
	if (declarationType == null || declarationType.name !== 'WidgetDeclarationType') {
		//TODO SOMETIMES, PROPERTY ALSO CAN USE THE LIST TO DESCRIBE MORE DETAILS
		// BUT CURRENTLY, ONLY FIND THE WIDGET DECLARATION TYPE
		return (void 0);
	}

	return state.sliceDoc(declarationType.from, declarationType.to);
};

interface WidgetTypeAndProperty {
	$wt?: string;
	property?: string;
}

export const findWidgetTypeAndProperty = (node: SyntaxNode, state: EditorState, tree: Tree) => {
	const propertyNode = findPropertyNode(node);
	if (propertyNode == null) {
		return {} as WidgetTypeAndProperty;
	}
	const property = state.sliceDoc(propertyNode.from, propertyNode.to);
	let nodeBefore = tree.resolveInner(propertyNode.from, -1);
	if (nodeBefore == null) {
		return {property};
	} else if (nodeBefore.name === 'MightBeWidgetDeclaration') {
		nodeBefore = tree.resolveInner(nodeBefore.from, -1);
	}
	if (nodeBefore.name === 'ListItem') {
		const $wt = findWidgetType(nodeBefore, state);
		return {$wt, property};
	} else {
		return {property};
	}
};