import {Undefinable} from '@rainbow-d9/n1';
import yaml from 'js-yaml';
import {FileDef} from './file-def-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DefExternalSaverRedress = (given: any) => any

export interface DefSaverOptions {
	redress?: DefExternalSaverRedress;
}

export abstract class FileDefSerializer {
	private readonly _redress: Undefinable<DefExternalSaverRedress>;

	public constructor(options?: DefSaverOptions) {
		this._redress = options?.redress;
	}

	protected camelToDash(key: string): string {
		return key.replace(/([A-Z])/g, ($1) => '-' + $1.toLowerCase());
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
					redressed[this.camelToDash(key)] = this.redressKeyCase(given[key]);
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

	protected abstract doStringify(def: FileDef): string;

	public stringify(def: FileDef): string {
		const redressed = this.redressDef(def);
		return this.doStringify(redressed);
	}
}

export class YamlDefSaver extends FileDefSerializer {
	public doStringify(def: FileDef): string {
		try {
			return yaml.dump(def);
		} catch (e) {
			console.group('Failed to dump O23 definition to yaml content.');
			console.error(e);
			console.log(def);
			console.groupEnd();
			throw new Error('Failed to dump O23 definition to yaml content.');
		}
	}
}
