import {isMockEnabled} from '../utils';

export const mock = <F>(func: F): { by: (mock: F) => F } => {
	if (isMockEnabled()) {
		return {by: (_mock: F): F => func};
	} else {
		return {by: (mock: F): F => mock};
	}
};
