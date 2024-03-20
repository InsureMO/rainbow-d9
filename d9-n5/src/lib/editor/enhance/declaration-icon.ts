import {syntaxTree} from '@codemirror/language';
import {Range} from '@codemirror/state';
import {Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate, WidgetType} from '@codemirror/view';

export class WidgetDeclarationIcon extends WidgetType {
	constructor(readonly ch: string, readonly classSuffix: string) {
		super();
	}

	public eq(other: WidgetDeclarationIcon) {
		return other.ch == this.ch;
	}

	public toDOM() {
		const icon = document.createElement('span');
		icon.setAttribute('aria-hidden', 'true');
		icon.className = `d9-playground-editor-widget-declaration-icon d9-playground-editor-widget-declaration-${this.classSuffix}-icon`;
		icon.innerText = this.ch;
		return icon;
	}

	public ignoreEvent() {
		return true;
	}
}

export const decorateWidgetDeclarationIcon = (view: EditorView) => {
	const widgets = [];
	const createDecorator = (ch: string, classSuffix: string, rangeDecoration: (decoration: Decoration) => Range<Decoration>) => {
		widgets.push(rangeDecoration(Decoration.widget({widget: new WidgetDeclarationIcon(ch, classSuffix), side: 1})));
	};
	for (const {from, to} of view.visibleRanges) {
		syntaxTree(view.state).iterate({
			from, to,
			enter: (node) => {
				switch (node.name) {
					// case 'WidgetDeclarationSplitter':
					case 'WidgetDeclarationType':
						createDecorator('w', 'type', (decoration: Decoration) => decoration.range(node.to));
						break;
					case 'WidgetDeclarationHeadline':
						createDecorator('l', 'headline', (decoration: Decoration) => decoration.range(node.to));
						break;
					case 'WidgetDeclarationProperty':
						createDecorator('p', 'property', (decoration: Decoration) => decoration.range(node.to));
						break;
					case 'WidgetDeclarationId':
						createDecorator('id', 'id', (decoration: Decoration) => decoration.range(node.to));
						break;
					case 'WidgetDeclarationFlag':
						createDecorator('f', 'flag', (decoration: Decoration) => decoration.range(node.to));
						break;
					case 'WidgetDeclarationAttrName':
						createDecorator('a', 'attr-name', (decoration: Decoration) => decoration.range(node.to));
						break;
					// case 'WidgetDeclarationAttrSplitter':
					// case 'WidgetDeclarationAttrValue':
					default:
					// do nothing
				}
			}
		});
	}
	return Decoration.set(widgets);
};

export const WidgetDeclarationIconPlugin = ViewPlugin.fromClass(class {
	public decorations: DecorationSet;

	constructor(view: EditorView) {
		this.decorations = decorateWidgetDeclarationIcon(view);
	}

	public update(update: ViewUpdate) {
		if (update.docChanged || update.viewportChanged ||
			syntaxTree(update.startState) != syntaxTree(update.state))
			this.decorations = decorateWidgetDeclarationIcon(update.view);
	}
}, {decorations: v => v.decorations});