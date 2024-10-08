import {NodeDef, registerWidget, Undefinable, VUtils} from '@rainbow-d9/n1';
import {Widget} from '@rainbow-d9/n3';
import {Playground} from './playground';
import {PlaygroundDecorator, PlaygroundDef} from './types';
import {PLAYGROUND_WIDGET_WRAPPER, PlaygroundWidgetWrapper} from './widget-wrapper';

Widget.ValidatorUtils.registerRegexps({'abc': /^abc$/});

export const PlaygroundMockDataBuild = Widget.createAsyncSnippetBuild<PlaygroundDef, 'mockData'>('mockData', []);
export const PlaygroundExternalDefsBuild = Widget.createAsyncSnippetBuild<PlaygroundDef, 'externalDefs'>('externalDefs', []);
export const PlaygroundExternalDefsTypesBuild = Widget.createAsyncSnippetBuild<PlaygroundDef, 'externalDefsTypes'>('externalDefsTypes', []);
export const PlaygroundThemeBuild = Widget.createSyncSnippetBuild<PlaygroundDecorator, 'theme'>('theme', ['theme']);

export abstract class AbstractPlaygroundTranslator extends Widget.SpecificWidgetTranslator<string> {
	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<Widget.AttributeValueBuild<any>> {
		return [
			PlaygroundMockDataBuild,
			PlaygroundExternalDefsBuild,
			PlaygroundExternalDefsTypesBuild,
			PlaygroundThemeBuild
		];
	}

	public getAttributeNamesMapping(): Undefinable<Record<Widget.CustomAttributeName, Widget.WidgetPropertyName>> {
		const type = this.getSupportedType();
		return {
			[`${type}.useN2`]: 'usage.useN2',
			[`${type}.useCharts`]: 'usage.useCharts',
			[`${type}.theme`]: 'decorator.theme'
		};
	}
}

export const registerPlayground = (widgetHelper: Widget.WidgetHelper, widgetType?: string) => {
	widgetType = VUtils.isBlank(widgetType) ? 'Playground' : widgetType;
	registerWidget({key: widgetType, JSX: Playground, container: false, array: false});
	registerWidget({
		key: PLAYGROUND_WIDGET_WRAPPER,
		JSX: PlaygroundWidgetWrapper,
		container: false,
		array: false,
		consumePosition: false
	});
	// n3 translator
	const TranslatorClass = class extends AbstractPlaygroundTranslator {
		public getSupportedType(): string {
			return widgetType;
		}
	};
	const repo = widgetHelper.repository;
	repo.register(new TranslatorClass(repo));
};
