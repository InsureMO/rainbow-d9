import {Undefinable} from '@rainbow-d9/n1';
import yaml from 'js-yaml';
import {FileDef} from './file-def-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DefExternalRedress = (given: any) => any

export interface DefLoaderOptions {
	redress?: DefExternalRedress;
}

export abstract class FileDefLoader {
	private readonly _redress: Undefinable<DefExternalRedress>;

	public constructor(options?: DefLoaderOptions) {
		this._redress = options?.redress;
	}

	protected dashToCamel(key: string): string {
		return key.replace(/-(.)/g, (_, group1) => group1.toUpperCase());
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected redressKeyCase(given: any): any {
		if (given == null) {
			return given;
		} else if (Array.isArray(given)) {
			return given.map(item => this.redressKeyCase(item));
		} else if (typeof given === 'object') {
			return Object.keys(given).reduce((redressed, key) => {
				if (key.indexOf('-') !== -1) {
					redressed[this.dashToCamel(key)] = this.redressKeyCase(given[key]);
				} else {
					redressed[key] = this.redressKeyCase(given[key]);
				}
				return redressed;
			}, {});
		} else {
			return given;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected redressDef(given: any): any {
		if (this._redress) {
			given = this._redress(given);
		}
		return this.redressKeyCase(given);
	}

	protected abstract doParse(content: string): FileDef;

	public parse(content: string): FileDef {
		const def = this.doParse(content);
		return this.redressDef(def);
	}
}

export class YamlDefLoader extends FileDefLoader {
	public doParse(content: string): FileDef {
		try {
			return yaml.load(content) as FileDef;
		} catch (e) {
			console.group('Failed to parse yaml content to O23 definition.');
			console.error(e);
			console.log(content);
			console.groupEnd();
			throw new Error('Failed to parse yaml content to O23 definition.');
		}
	}
}
