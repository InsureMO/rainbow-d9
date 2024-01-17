import {registerWidget, VUtils} from '@rainbow-d9/n1';
import {Widget} from '@rainbow-d9/n3';
import {Chart} from './chart';

export abstract class AbstractChartTranslator extends Widget.SpecificWidgetTranslator<string> {
}

export const registerChart = (widgetHelper: Widget.WidgetHelper, widgetType?: string) => {
	widgetType = VUtils.isBlank(widgetType) ? 'Chart' : widgetType;
	registerWidget({key: widgetType, JSX: Chart, container: false, array: false});
	// n3 translator
	const TranslatorClass = class extends AbstractChartTranslator {
		public getSupportedType(): string {
			return widgetType;
		}
	};
	const repo = widgetHelper.repository;
	repo.register(new TranslatorClass(repo));
};
