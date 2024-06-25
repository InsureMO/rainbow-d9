import {confirm} from './confirm';
import {discard} from './discard';
import {elementCode} from './element-code';
import {elementEnabled} from './element-enabled';
import {elementType} from './element-type';
import {prepare} from './prepare';

export * from './types';

export const FileDefs = {
	prepare, confirm, discard, elements: [elementCode, elementEnabled, elementType]
};
