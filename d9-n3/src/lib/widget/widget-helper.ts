import {NodeDef} from '@rainbow-d9/n1';
import {N3Logger} from '../logger';
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
			N3Logger.error(`Translator of root node[type=${heading.$wt}] is not found. All content ignored.`, WidgetHelper.name);
			return {node: {$wt: ''} as NodeDef, success: false};
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
