/** /lib.${string}.d.ts */
export type DtsFileKey = string;
export type DtsFileContent = string;
export type DtsMap = Map<DtsFileKey, DtsFileContent>;

/**
 * key should be the name, and will be
 * 1. transformed to "/lib.{name}.d.ts" as key of DtsMap
 * 2. add "/// <reference lib="${name}" />" to the lib.es5.d.ts after decorators.legacy reference tag
 */
export type DtsMapExtendKey = string;
export type DtsMapExtendContent =
	| DtsFileContent
	| Array<DtsFileContent>
	| Record<DtsMapExtendKey, DtsFileContent>
	| Array<DtsFileContent | Record<DtsMapExtendKey, DtsFileContent>>
export type DtsMapExtend = () => DtsMapExtendContent;

export interface DtsMapOptions {
	extend?: DtsMapExtend;
}

export interface LibDtsMapOptions extends DtsMapOptions {
	full: boolean;
}