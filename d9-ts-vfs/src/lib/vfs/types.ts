/** /lib.${string}.d.ts */
export type DtsFileKey = string;
export type DtsFileContent = string;
export type DtsMap = Map<DtsFileKey, DtsFileContent>;

export type DtsMapExtend = () => DtsFileContent;

export interface DtsMapOptions {
	extend?: DtsMapExtend;
}

export interface LibDtsMapOptions extends DtsMapOptions {
	full: boolean;
}