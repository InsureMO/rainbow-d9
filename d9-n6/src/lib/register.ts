import {NodeDef, registerWidget, Undefinable, VUtils} from '@rainbow-d9/n1';
import {Widget} from '@rainbow-d9/n3';
import {Playground} from './playground';
import {PlaygroundModuleUsage} from './types';

export abstract class AbstractPlaygroundTranslator extends Widget.SpecificWidgetTranslator<string> {
	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	public getAttributeNamesMapping(): Undefinable<Record<Widget.CustomAttributeName, Widget.WidgetPropertyName>> {
		const keys: Array<keyof PlaygroundModuleUsage> = ['useN3', 'useN5', 'useN6', 'useN7', 'useN8'];
		return keys.reduce((mapping, key) => {
			mapping[`${this.getSupportedType()}.${key}`] = `usage.${key}`;
			return mapping;
		}, {});
	}
}

export const registerPlayground = (widgetHelper: Widget.WidgetHelper, widgetType?: string) => {
	widgetType = VUtils.isBlank(widgetType) ? 'O23Playground' : widgetType;
	registerWidget({key: widgetType, JSX: Playground, container: false, array: false});
	// n3 translator
	const TranslatorClass = class extends AbstractPlaygroundTranslator {
		public getSupportedType(): string {
			return widgetType;
		}
	};
	const repo = widgetHelper.repository;
	repo.register(new TranslatorClass(repo));
};
