import {Undefinable, VUtils} from '@rainbow-d9/n1';
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected redressValues(given: any): any {
		if (given == null) {
			return given;
		} else if (VUtils.isPrimitive(given)) {
			return given;
		} else if (Array.isArray(given)) {
			return given.map(item => this.redressValues(item));
		} else {
			return Object.keys(given).reduce((redressed, key) => {
				const value = given[key];
				if (value == null || (typeof value === 'string' && VUtils.isBlank(value))) {
					// ignore this value
				} else if (key.startsWith('$fold') && key.length > 5 && value !== true) {
					// $foldXXX is not true, ignore this value since default value is false
				} else if (key === '$diagram' && Object.keys(value).length === 0) {
					// no value for $diagram, ignore this
				} else if (VUtils.isPrimitive(value)) {
					redressed[key] = value;
				} else if (Array.isArray(value)) {
					redressed[key] = value.map(item => this.redressValues(item));
				} else {
					redressed[key] = this.redressValues(value);
				}
				return redressed;
			}, {});
		}
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
				if (key.indexOf('-') === -1) {
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
		return this.redressKeyCase(this.redressValues(given));
	}

	protected abstract doStringify(def: FileDef): string;

	public stringify(def: FileDef): string {
		const redressed = this.redressDef(def);
		return this.doStringify(redressed);
	}

	public abstract extname(): string;
}

export class YamlDefSaver extends FileDefSerializer {
	public doStringify(def: FileDef): string {
		try {
			const leadIndexes = [
				'code', 'type', 'init-only', 'enabled',
				'route', 'method', 'headers', 'path-params', 'query-params', 'body', 'files', 'expose-headers', 'expose-file',
				'name', 'use', 'from-input',
				'datasource', 'transaction', 'autonomous',
				'check', 'routes', 'steps', 'otherwise'
			];
			const tailIndexes = ['to-output', 'merge', 'error-handles'];
			return yaml.dump(def, {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				sortKeys: (a: any, b: any) => {
					if (a.startsWith('$') && !b.startsWith('$')) {
						return 1;
					} else if (!a.startsWith('$') && b.startsWith('$')) {
						return -1;
					} else {
						const alIndex = leadIndexes.indexOf(a);
						const blIndex = leadIndexes.indexOf(b);
						const atIndex = tailIndexes.indexOf(a);
						const btIndex = tailIndexes.indexOf(b);
						if (alIndex === -1 && blIndex === -1) {
							// neither in lead
							if (atIndex === -1 && btIndex === -1) {
								// neither in tail, compare normally
								return a.localeCompare(b);
							} else if (atIndex === -1) {
								// b in tail, a does not, a is less
								return -1;
							} else if (btIndex === -1) {
								// a in tail, b does not, b is less
								return 1;
							} else {
								// both in tail, compare index
								return atIndex - btIndex;
							}
						} else if (alIndex === -1) {
							// b in lead, a does not, b is less
							return 1;
						} else if (blIndex === -1) {
							// a in lead, b does not, a is less
							return -1;
						} else {
							// both in lead, compare index
							return alIndex - blIndex;
						}
					}
				},
				lineWidth: 120
			});
		} catch (e) {
			console.group('Failed to dump O23 definition to yaml content.');
			console.error(e);
			console.log(def);
			console.groupEnd();
			throw new Error('Failed to dump O23 definition to yaml content.');
		}
	}

	public extname(): string {
		return 'yaml';
	}
}
