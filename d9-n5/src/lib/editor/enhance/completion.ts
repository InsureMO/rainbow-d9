import {Completion, CompletionContext, CompletionResult} from '@codemirror/autocomplete';
import {markdownLanguage} from '@codemirror/lang-markdown';
import {syntaxTree} from '@codemirror/language';
import {N2} from '@rainbow-d9/n3';
import {PlaygroundWidget} from '../../types';

//TODO:
// 1. completion: attribute name, attributes list names, $icons, $ext
// 2. $icons, $ext syntax highlight
// 3. Widget Type Linting, $icons linting
// 4. Click toolbar icons, and check editor caret, should be first column. otherwise copy to clipboard.
// 5. javascript code block
export const createCompleteD9ml = (widgets: Array<PlaygroundWidget>) => {
	const WidgetTypeOptions: Array<Completion> = widgets
		.filter(({$wt}) => $wt != N2.N2WidgetType.PAGE)
		.map(({$wt, label, description}) => ({label: $wt, detail: label, info: description, type: 'class'}));

	return (context: CompletionContext): CompletionResult | null => {
		const tree = syntaxTree(context.state);
		const nodeBefore = tree.resolveInner(context.pos, -1);
		if (nodeBefore == null) {
			return null;
		}
		if (nodeBefore.name.startsWith('ATXHeading')) {
			const textBefore = (context.state.sliceDoc(nodeBefore.from, context.pos) ?? '').trim();
			const tagBefore = /(#{1,6})(\s+)\w*$/.exec(textBefore);
			if (tagBefore == null) {
				return null;
			}
			if (tagBefore[1].length === 1) {
				return {
					from: nodeBefore.from + tagBefore[1].length + tagBefore[2].length,
					// no matter what, the top level is Page only
					options: [{label: N2.N2WidgetType.PAGE}]
				};
			} else {
				return {
					from: nodeBefore.from + tagBefore[1].length + tagBefore[2].length,
					options: WidgetTypeOptions
					// validFor: /^#{1,6}\s+\w*$/
				};
			}
		} else if (nodeBefore.name === 'Paragraph') {
			const nodeBefore2 = tree.resolveInner(nodeBefore.from, -1);
			if (nodeBefore2 == null) {
				return null;
			}
			if (nodeBefore2.name === 'ListItem') {
				const textBefore = (context.state.sliceDoc(nodeBefore2.from, context.pos) ?? '').trim();
				const tagBefore = /([-|*]\s+)\w*$/.exec(textBefore);
				if (tagBefore == null) {
					return null;
				}
				return {
					from: nodeBefore2.from + tagBefore[1].length,
					options: WidgetTypeOptions
					// validFor: /^#{1,6}\s+\w*$/
				};
			}
		}
		return null;
	};
};

// export const d9mlCompletions = autocompletion({activateOnTyping: true, override: [completeD9ml]});
export const createD9mlCompletions = (widgets: Array<PlaygroundWidget>) => {
	return markdownLanguage.data.of({autocomplete: createCompleteD9ml(widgets)});
};