/** copy from @valtown/codemirror-ts */
import {DefinitionInfo, QuickInfo} from 'typescript';
import {VirtualTypeScriptEnvironment} from '../../vfs';

export interface GetHoverOptions {
	env: VirtualTypeScriptEnvironment;
	path: string;
	pos: number;
}

/**
 * This information is passed to the API consumer to allow
 * them to create tooltips however they wish.
 */
export interface HoverInfo {
	start: number;
	end: number;
	typeDef: readonly DefinitionInfo[] | undefined;
	quickInfo: QuickInfo | undefined;
}

export const getHover = (options: GetHoverOptions): HoverInfo | null => {
	const {env, path, pos} = options;

	const sourcePos = pos;
	if (sourcePos === null) {
		return null;
	}

	const quickInfo = env.languageService.getQuickInfoAtPosition(path, sourcePos);
	if (!quickInfo) {
		return null;
	}

	const start = quickInfo.textSpan.start;

	const typeDef =
		env.languageService.getTypeDefinitionAtPosition(path, sourcePos) ??
		env.languageService.getDefinitionAtPosition(path, sourcePos);

	return {
		start,
		end: start + quickInfo.textSpan.length,
		typeDef,
		quickInfo
	};
};