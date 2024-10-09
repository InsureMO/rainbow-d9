import {isMockEnabled} from '../utils';

export const mock = <F>(func: F): { by: (mock: F) => F } => {
	if (isMockEnabled()) {
		return {by: (mock: F): F => mock};
	} else {
		return {by: (_mock: F): F => func};
	}
};
