import {ParsedHeadingIdentified} from '../semantic';
import {ParsedNodeDef} from '../types';
import {Undefinable} from '../utility-types';
import {createOrGetTranslatorRepositorySingleton, WidgetTranslatorRepository} from './translator';

export class WidgetHelper {
	constructor(private readonly _repository: WidgetTranslatorRepository) {
		this._repository = _repository;
	}

	get repository(): WidgetTranslatorRepository {
		return this._repository;
	}

	public translate(heading: ParsedHeadingIdentified): ParsedNodeDef {
		const translator = this._repository.askTranslator(heading.$wt);
		if (translator == null) {
			throw new Error(`Translator of root node[type=${heading.$wt}] is not found. All content ignored.`);
		}
		return translator.translate(heading);
	}
}

const SINGLETON: {
	helper: Undefinable<WidgetHelper>
} = {helper: (void 0)};

export const createOrGetTranslateHelperSingleton = (): WidgetHelper => {
	if (SINGLETON.helper == null) {
		SINGLETON.helper = new WidgetHelper(createOrGetTranslatorRepositorySingleton());
	}
	return SINGLETON.helper;
};
