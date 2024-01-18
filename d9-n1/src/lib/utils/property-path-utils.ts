import {PROPERTY_PATH_JOINER, PROPERTY_PATH_ME, PROPERTY_PATH_ROOT} from '../constants';
import {PropertyPath, Undefinable} from '../types';
import {VUtils} from './value-utils';

export interface PropertyPathUtilsType {
	readonly legalize: (pp?: PropertyPath) => PropertyPath;
	/**
	 * check the model stays on current level or not, by given property path
	 */
	readonly isLevelStayed: (pp?: PropertyPath) => boolean;
	/**
	 * split given property path to segments, each segment is a relative property path.
	 */
	readonly segments: (pp: PropertyPath) => Array<PropertyPath>;
	readonly concat: (...paths: Array<PropertyPath>) => PropertyPath;
	/**
	 * return absolute path
	 */
	readonly absolute: (relativeToRoot: PropertyPath, current: PropertyPath) => PropertyPath;
	readonly relative: (path: PropertyPath) => PropertyPath;
	/**
	 * exactly same, or wildcard same
	 * wildcard: * means any character, ** means any character or dot
	 */
	readonly matches: (expected: PropertyPath, actual: PropertyPath) => boolean;
	/**
	 * generate property path to dom id string
	 */
	readonly asId: (path?: PropertyPath, id?: string) => Undefinable<string>;
}

export const PPUtils: PropertyPathUtilsType = {
	legalize: (pp?: PropertyPath) => (pp || '').trim() || PROPERTY_PATH_ME,
	isLevelStayed: (pp?: PropertyPath) => PPUtils.legalize(pp) === PROPERTY_PATH_ME,
	segments: (pp: PropertyPath): Array<PropertyPath> => pp.split('.').map(p => p.trim()).filter(p => p.length !== 0),
	concat: (...paths: Array<PropertyPath>) => {
		if (paths == null || paths.length === 0) {
			return PROPERTY_PATH_ROOT;
		} else {
			const path = paths
				.map(p => PPUtils.legalize(p))
				.filter(p => p !== PROPERTY_PATH_ME)
				.reduce((path, segment) => {
					if (path === '') {
						return segment;
					} else if (segment.startsWith('[')) {
						return `${path}${segment}`;
					} else {
						return `${path}${PROPERTY_PATH_JOINER}${segment}`;
					}
				}, '');
			if (path.length === 0) {
				return PROPERTY_PATH_ROOT;
			} else {
				return path;
			}
		}
	},
	absolute: (relativeToRoot: PropertyPath, current: PropertyPath) => {
		if (VUtils.isBlank(current)) {
			return relativeToRoot;
		}
		current = PPUtils.legalize(current);
		if (current === PROPERTY_PATH_ME) {
			return relativeToRoot;
		} else if (current.startsWith(PROPERTY_PATH_ROOT)) {
			return current;
		}

		relativeToRoot = PPUtils.legalize(relativeToRoot);

		if (relativeToRoot.startsWith(PROPERTY_PATH_ROOT)) {
			return PPUtils.concat(relativeToRoot, current);
		} else {
			return PROPERTY_PATH_ROOT + PPUtils.concat(relativeToRoot, current);
		}
	},
	relative: (path: PropertyPath): PropertyPath => {
		path = PPUtils.legalize(path);
		if (path.startsWith(PROPERTY_PATH_ROOT)) {
			return PPUtils.legalize(path.substring(1));
		} else {
			return path;
		}
	},
	matches: (expected: PropertyPath, actual: PropertyPath): boolean => {
		if (VUtils.isBlank(actual)) {
			return false;
		}
		if (expected === actual) {
			return true;
		}
		// remove criteria path of actual
		let bracketCount = 0;
		const tidy = actual.split('').reduce((chars, char) => {
			if (char === '[') {
				bracketCount = bracketCount + 1;
			} else if (char === ']') {
				bracketCount = bracketCount - 1;
			} else if (bracketCount === 0) {
				chars.push(char);
			} else {
				// ignore criteria path in bracket
			}
			return chars;
		}, [] as Array<string>).join('');
		expected = expected ?? '';
		if (expected.includes('*')) {
			// wildcard
			expected = expected.replace(/\*{2}/g, '[\\w|\\.]{0,}')
				.replace(/\*{1}/g, '[\\w]{0,}')
				.replace(/\./g, '\\.');
			return new RegExp(`^${expected}$`).test(tidy);
		} else {
			return tidy === expected;
		}
	},
	asId: (path?: PropertyPath, id?: string): Undefinable<string> => {
		if (VUtils.isNotBlank(id)) {
			return id;
		}
		if (VUtils.isBlank(path)) {
			return (void 0);
		}
		if (path.trim() == PROPERTY_PATH_JOINER) {
			return (void 0);
		}
		id = path.replace(/\./g, '-').replace(/\[([^\]]+)]/g, '_$1');
		if (id.startsWith(PROPERTY_PATH_ROOT)) {
			id = id.substring(1);
		}
		return id;
	}
};