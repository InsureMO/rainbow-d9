import {ExternalDefIndicator, NodeDef, registerWidget, Undefinable, VUtils} from '@rainbow-d9/n1';
import {Semantic, Widget} from '@rainbow-d9/n3';
import {Playground} from './playground';
import {PlaygroundModuleAssistant} from './types';

export const PlaygroundCreateDefaultStepBuild: Widget.AttributeValueBuild<PlaygroundModuleAssistant['createDefaultStep'] | ExternalDefIndicator> = {
	accept: (key: Widget.WidgetPropertyName) => key === 'defaultStep',
	build: (value: Undefinable<string>, list: Semantic.ParsedListItemAttributePair): Undefinable<PlaygroundModuleAssistant['createDefaultStep'] | ExternalDefIndicator> => {
		if (VUtils.isBlank(value)) {
			return (void 0);
		}
		return Widget.createSyncSnippetBuild<PlaygroundModuleAssistant, 'createDefaultStep'>('createDefaultStep', []).build(value, list);
	}
};
export const PlaygroundAskSystemsForHttpBuild: Widget.AttributeValueBuild<PlaygroundModuleAssistant['askSystemsForHttp'] | ExternalDefIndicator> = {
	accept: (key: Widget.WidgetPropertyName) => key === 'httpSystems',
	build: (value: Undefinable<string>, list: Semantic.ParsedListItemAttributePair): Undefinable<PlaygroundModuleAssistant['askSystemsForHttp'] | ExternalDefIndicator> => {
		if (VUtils.isBlank(value)) {
			return (void 0);
		}
		return Widget.createSyncSnippetBuild<PlaygroundModuleAssistant, 'askSystemsForHttp'>('askSystemsForHttp', []).build(value, list);
	}
};
export const PlaygroundAskTypeOrmDatasourcesBuild: Widget.AttributeValueBuild<PlaygroundModuleAssistant['askTypeOrmDatasources'] | ExternalDefIndicator> = {
	accept: (key: Widget.WidgetPropertyName) => key === 'typeOrmDatasources',
	build: (value: Undefinable<string>, list: Semantic.ParsedListItemAttributePair): Undefinable<PlaygroundModuleAssistant['askTypeOrmDatasources'] | ExternalDefIndicator> => {
		if (VUtils.isBlank(value)) {
			return (void 0);
		}
		return Widget.createSyncSnippetBuild<PlaygroundModuleAssistant, 'askTypeOrmDatasources'>('askTypeOrmDatasources', []).build(value, list);
	}
};
export const PlaygroundAskRefPipelinesBuild: Widget.AttributeValueBuild<PlaygroundModuleAssistant['askRefPipelines'] | ExternalDefIndicator> = {
	accept: (key: Widget.WidgetPropertyName) => key === 'refPipelines',
	build: (value: Undefinable<string>, list: Semantic.ParsedListItemAttributePair): Undefinable<PlaygroundModuleAssistant['askRefPipelines'] | ExternalDefIndicator> => {
		if (VUtils.isBlank(value)) {
			return (void 0);
		}
		return Widget.createSyncSnippetBuild<PlaygroundModuleAssistant, 'askRefPipelines'>('askRefPipelines', []).build(value, list);
	}
};
export const PlaygroundAskRefStepsBuild: Widget.AttributeValueBuild<PlaygroundModuleAssistant['askRefSteps'] | ExternalDefIndicator> = {
	accept: (key: Widget.WidgetPropertyName) => key === 'refSteps',
	build: (value: Undefinable<string>, list: Semantic.ParsedListItemAttributePair): Undefinable<PlaygroundModuleAssistant['askRefSteps'] | ExternalDefIndicator> => {
		if (VUtils.isBlank(value)) {
			return (void 0);
		}
		return Widget.createSyncSnippetBuild<PlaygroundModuleAssistant, 'askRefSteps'>('askRefSteps', []).build(value, list);
	}
};

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
			PlaygroundCreateDefaultStepBuild,
			PlaygroundAskSystemsForHttpBuild,
			PlaygroundAskTypeOrmDatasourcesBuild,
			PlaygroundAskRefPipelinesBuild, PlaygroundAskRefStepsBuild
		];
	}

	public getAttributeNamesMapping(): Undefinable<Record<Widget.CustomAttributeName, Widget.WidgetPropertyName>> {
		const type = this.getSupportedType();
		return {
			[`${type}.defaultStep`]: 'assistant.createDefaultStep',
			[`${type}.httpSystems`]: 'assistant.askSystemsForHttp',
			[`${type}.typeOrmDatasources`]: 'assistant.askTypeOrmDatasources',
			[`${type}.refPipelines`]: 'assistant.askRefPipelines',
			[`${type}.refSteps`]: 'assistant.askRefSteps'
		};
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
