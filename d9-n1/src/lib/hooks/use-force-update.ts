import {DispatchWithoutAction, useReducer} from 'react';

export const useForceUpdate = (): DispatchWithoutAction => {
	const [, forceUpdate] = useReducer(x => !x, true);
	return forceUpdate;
};
