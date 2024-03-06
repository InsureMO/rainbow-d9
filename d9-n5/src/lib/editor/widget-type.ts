import {
	Decoration,
	DecorationSet,
	EditorView,
	MatchDecorator,
	ViewPlugin,
	ViewUpdate,
	WidgetType
} from '@codemirror/view';
import {VUtils} from '@rainbow-d9/n1';
import {Semantic} from '@rainbow-d9/n3';

export class WidgetDeclarationWidget extends WidgetType {
	constructor(private readonly symbol: string,
	            private readonly spaces: string,
	            private readonly headline: string) {
		super();
	}

	public eq(other: WidgetDeclarationWidget) {
		return other.symbol == this.symbol
			&& other.headline == this.headline;
	}

	protected parseTitle(title: string): { title: string, $flag?: string } {
		const str = (title ?? '').trim();
		const matches = Semantic.HeadingParser.WIDGET_TITLE_FLAG_MATCHERS.find(matcher => str.endsWith(matcher));
		if (matches == null) {
			return {title};
		} else if (matches === Semantic.HeadingParser.TAILING_IGNORE_FLAG) {
			const index = title.indexOf(matches);
			return {title: title.substring(0, index), $flag: title.substring(index)};
		} else {
			const index = title.indexOf(matches);
			return {title: title.substring(0, index), $flag: title.substring(index)};
		}
	}

	protected matchWidget(title: string): {
		$wt: string;
		headline?: string;
		$pp?: string;
		$id?: string;
		$joint: number
	} {
		const segments = title.split(Semantic.HeadingParser.WIDGET_TITLE_SPLITTER);
		if (segments.length === 1) {
			const $wt = segments[0].trim();
			return {$wt, $joint: 0};
		} else if (segments.length === 3) {
			const $pp = segments[segments.length - 1].trim();
			const $wt = segments[0].trim();
			const headline = segments.slice(1, segments.length - 1).join(Semantic.HeadingParser.WIDGET_TITLE_SPLITTER).trim();
			return {$wt, headline: headline.trim(), $pp, $joint: 2};
		} else if (segments.length > 3) {
			const $id = segments[segments.length - 1].trim();
			const $pp = segments[segments.length - 2].trim();
			const $wt = segments[0].trim();
			const headline = segments.slice(1, segments.length - 2).join(Semantic.HeadingParser.WIDGET_TITLE_SPLITTER).trim();
			return {$wt, headline: headline.trim(), $pp, $id, $joint: 3};
		} else {
			const $wt = segments[0].trim();
			const headline = segments[1].trim();
			return {$wt, headline: VUtils.isBlank(headline) ? (void 0) : headline.trim(), $joint: 1};
		}
	}

	protected createWidgetType(parent: HTMLSpanElement, $wt: string): void {
		if (VUtils.isNotBlank($wt)) {
			const wtBox = parent.appendChild(document.createElement('span'));
			wtBox.className = 'cm-widget-declaration-type';
			wtBox.innerText = $wt;
		}
	}

	protected createJoint(parent: HTMLSpanElement): void {
		const joint = parent.appendChild(document.createElement('span'));
		joint.className = 'cm-widget-declaration-joint';
		joint.innerText = Semantic.HeadingParser.WIDGET_TITLE_SPLITTER;
	}

	protected createWidgetLabel(parent: HTMLSpanElement, label?: string): void {
		if (VUtils.isNotEmpty(label)) {
			const wtBox = parent.appendChild(document.createElement('span'));
			wtBox.className = 'cm-widget-declaration-label';
			wtBox.innerText = label;
		}
	}

	protected createWidgetProperty(parent: HTMLSpanElement, $pp?: string): void {
		if (VUtils.isNotEmpty($pp)) {
			const wtBox = parent.appendChild(document.createElement('span'));
			wtBox.className = 'cm-widget-declaration-property';
			wtBox.innerText = $pp;
		}
	}

	protected createWidgetId(parent: HTMLSpanElement, $id?: string): void {
		if (VUtils.isNotEmpty($id)) {
			const wtBox = parent.appendChild(document.createElement('span'));
			wtBox.className = 'cm-widget-declaration-id';
			wtBox.innerText = $id;
		}
	}

	protected createWidgetFlag(parent: HTMLSpanElement, $flag?: string): void {
		if (VUtils.isNotEmpty($flag)) {
			this.createJoint(parent);
			const wtBox = parent.appendChild(document.createElement('span'));
			wtBox.className = 'cm-widget-declaration-flag';
			wtBox.innerText = $flag.substring(2);
		}
	}

	public toDOM() {
		const box = document.createElement('span');
		box.className = 'cm-widget-declaration';
		const symbolBox = box.appendChild(document.createElement('span'));
		symbolBox.className = `cm-widget-declaration-symbol cm-widget-declaration-symbol-${(this.symbol ?? '').length || 6}`;
		symbolBox.contentEditable = 'true';
		symbolBox.innerText = this.symbol;
		const spacesBox = box.appendChild(document.createElement('span'));
		spacesBox.className = 'cm-widget-declaration-spaces';
		spacesBox.innerText = this.spaces ?? ' ';
		if (VUtils.isNotBlank(this.headline)) {
			const {title, $flag} = this.parseTitle(this.headline);
			const {$wt, headline: label, $pp, $id, $joint} = this.matchWidget(title);
			this.createWidgetType(box, $wt);
			$joint !== 0 && this.createJoint(box);
			this.createWidgetLabel(box, label);
			$joint > 1 && this.createJoint(box);
			this.createWidgetProperty(box, $pp);
			$joint > 2 && this.createJoint(box);
			this.createWidgetId(box, $id);
			this.createWidgetFlag(box, $flag);
		}
		return box;
	}

	public ignoreEvent() {
		return false;
	}
}

const HeadingWidgetDeclarationMatcher = new MatchDecorator({
	regexp: /^(#{1,6})(\s+)(.*)$/g,
	decoration: match => {
		const [, symbol, spaces, headline
		] = match;
		return Decoration.replace({
			widget: new WidgetDeclarationWidget(symbol, spaces, headline)
		});
	}
});

export const WidgetDeclarations = ViewPlugin.fromClass(class {
	declarations: DecorationSet;

	constructor(view: EditorView) {
		this.declarations = HeadingWidgetDeclarationMatcher.createDeco(view);
	}

	update(update: ViewUpdate) {
		this.declarations = HeadingWidgetDeclarationMatcher.updateDeco(update, this.declarations);
	}
}, {
	decorations: instance => instance.declarations,
	provide: plugin => EditorView.atomicRanges.of(view => {
		return view.plugin(plugin)?.declarations || Decoration.none;
	})
});