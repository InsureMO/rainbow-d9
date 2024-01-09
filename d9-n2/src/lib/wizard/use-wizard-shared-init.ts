import {NodeDef, Undefinable, VUtils} from '@rainbow-d9/n1';
import {useEffect, useState} from 'react';
import {WizardProps, WizardSharedDef} from './types';

interface WizardSharedInitOptions {
	// tabs property path, not for tab
	contents?: WizardProps['contents'];
	shared?: WizardProps['shared'];
}

interface WizardSharedState {
	initialized: boolean;
	sharedDef?: NodeDef;
	sharedAtLead?: boolean;
}

export const useWizardSharedInit = (options: WizardSharedInitOptions) => {
	const {contents, shared} = options;

	const [state, setState] = useState<WizardSharedState>({initialized: false});

	useEffect(() => {
		if (state.initialized) {
			return;
		}

		const findSharedDef = async (def?: WizardSharedDef): Promise<{ def?: NodeDef; lead?: boolean }> => {
			if (def == null || def.body == null) {
				return {def: (void 0), lead: (void 0)};
			}
			const {$pp, body} = def;
			let foundDef: Undefinable<NodeDef>;
			if (typeof body === 'function') {
				foundDef = await body();
			} else {
				foundDef = body;
			}
			if (foundDef != null && VUtils.isBlank(foundDef.$pp)) {
				foundDef.$pp = $pp;
			}
			return {def: foundDef, lead: def.lead};
		};

		(async () => {
			const {def: sharedDef, lead: sharedAtLead} = await findSharedDef(shared);
			setState({initialized: true, sharedDef, sharedAtLead});
		})();
	}, [state.initialized, contents, shared]);

	return state;
};