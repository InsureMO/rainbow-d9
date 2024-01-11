import {useEffect, useState} from 'react';
import {PlanDefs, PlanSelectionDef} from './types';

export interface PlanDefsState {
	initialized: boolean;
	defs?: PlanDefs;
}

export const useDefs = (defs: PlanSelectionDef['defs']) => {
	const [state, setState] = useState<PlanDefsState>({initialized: false});
	useEffect(() => {
		if (state.initialized) {
			return;
		}
		(async () => {
			if (typeof defs === 'function') {
				setState({initialized: true, defs: await defs()});
			} else {
				setState({initialized: true, defs});
			}
		})();
	}, [state.initialized]);

	return state;
};
