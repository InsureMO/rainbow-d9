import {WidgetType} from '../../semantic';
import {Undefinable} from '../../utility-types';
import {AbstractTranslator, Decipherable} from './abstract-translator';
import {AttributeNameUtils, AttributeUtils, CustomAttributeName} from './attribute';
import {
	DisablementBuild,
	DisablementUtils,
	ReactorBuild,
	ReactorUtils,
	ValidatorBuild,
	ValidatorUtils,
	VisibilityBuild,
	VisibilityUtils
} from './monitor';
import {PageTranslator} from './page-translator';
import {SpecificWidgetTranslator} from './specific-translator';
import {WidgetTranslator} from './widget-translator';

export class WidgetTranslatorRepository {
	private readonly _validatorBuild: ValidatorBuild;
	private readonly _reactorBuild: ReactorBuild;
	private readonly _disablementBuild: DisablementBuild;
	private readonly _visibilityBuild: VisibilityBuild;
	private readonly translators: Array<AbstractTranslator<Decipherable>>;
	private readonly specificTranslators: Record<WidgetType, SpecificWidgetTranslator<WidgetType>> = {};

	public constructor() {
		this._validatorBuild = this.createValidatorBuild();
		this._reactorBuild = this.createReactorBuild();
		this._disablementBuild = this.createDisablementBuild();
		this._visibilityBuild = this.createVisibilityBuild();
		this.translators = this.createDefaultTranslators();
	}

	protected createValidatorBuild() {
		return new ValidatorBuild();
	}

	protected createReactorBuild() {
		return new ReactorBuild();
	}

	protected createDisablementBuild() {
		return new DisablementBuild();
	}

	protected createVisibilityBuild() {
		return new VisibilityBuild();
	}

	protected createDefaultTranslators(): Array<AbstractTranslator<Decipherable>> {
		return [new PageTranslator(this), new WidgetTranslator(this)];
	}

	get validatorBuild(): ValidatorBuild {
		return this._validatorBuild;
	}

	get reactorBuild(): ReactorBuild {
		return this._reactorBuild;
	}

	get disablementBuild(): DisablementBuild {
		return this._disablementBuild;
	}

	get visibilityBuild(): VisibilityBuild {
		return this._visibilityBuild;
	}

	public askTranslator<T extends Decipherable>($wt: WidgetType): Undefinable<AbstractTranslator<T>> {
		return this.translators.find(translator => translator.isTypeSupported($wt));
	}

	public register<T extends WidgetType>(translator: SpecificWidgetTranslator<T>): Undefinable<SpecificWidgetTranslator<T>> {
		const existing = this.specificTranslators[translator.getSupportedType()];

		const $wt = translator.getSupportedType();
		this.specificTranslators[$wt] = translator;
		const namesMapping = translator.getAttributeNamesMapping();
		if (namesMapping != null) {
			AttributeNameUtils.register(namesMapping);
		}
		AttributeUtils.register($wt, translator.getAttributeValueBuilders());
		ValidatorUtils.register($wt, translator.getValidationHandlerDetectives());
		ReactorUtils.register($wt, translator.getReactionHandlerDetectives());
		DisablementUtils.register($wt, translator.getEnablementHandlerDetectives());
		VisibilityUtils.register($wt, translator.getVisibilityHandlerDetectives());
		return existing as Undefinable<SpecificWidgetTranslator<T>>;
	}

	public unregister<T extends WidgetType>(translator: SpecificWidgetTranslator<T>): Undefinable<SpecificWidgetTranslator<T>> {
		const $wt = translator.getSupportedType();
		const existing = this.specificTranslators[$wt];

		const namesMapping = translator.getAttributeNamesMapping();
		if (namesMapping != null) {
			AttributeNameUtils.unregister(Object.keys(namesMapping) as Array<CustomAttributeName>);
		}
		ReactorUtils.unregister($wt);
		ValidatorUtils.unregister($wt);
		AttributeUtils.unregister($wt);
		DisablementUtils.unregister($wt);
		VisibilityUtils.unregister($wt);
		delete this.specificTranslators[$wt];

		return existing as Undefinable<SpecificWidgetTranslator<T>>;
	}

	public askSpecificTranslator<T extends WidgetType>($wt: T): Undefinable<SpecificWidgetTranslator<T>> {
		return this.specificTranslators[$wt] as Undefinable<SpecificWidgetTranslator<T>>;
	}
}

const SINGLETON: {
	repo: Undefinable<WidgetTranslatorRepository>
} = {repo: (void 0)};

export const createOrGetTranslatorRepositorySingleton = (): WidgetTranslatorRepository => {
	if (SINGLETON.repo == null) {
		SINGLETON.repo = new WidgetTranslatorRepository();
	}

	return SINGLETON.repo;
};
