import {NodeDef, NUtils, VUtils, WrappedAttributes, Wrapper} from '@rainbow-d9/n1';
import React, {ReactNode} from 'react';
import {Caption} from './caption';
import {toIntlLabel} from './intl-label';

export interface LabelLikeProps {
	label?: ReactNode | NodeDef;
	$wrapped: WrappedAttributes;
	$validationScopes?: Pick<NodeDef, '$validationScopes'>;
	wrapByCaption?: boolean;
}

export const LabelLike = (props: LabelLikeProps) => {
	const {
		label,
		$wrapped, $validationScopes,
		wrapByCaption = false, ...rest
	} = props;
	if (label == null || React.isValidElement(label) || typeof label === 'string' || VUtils.isBlank((label as NodeDef).$wt)) {
		if (wrapByCaption) {
			if (typeof label === 'string') {
				return <Caption label={toIntlLabel(label) as ReactNode} $wrapped={$wrapped} {...rest}/>;
			} else {
				return <Caption label={label as ReactNode} $wrapped={$wrapped} {...rest}/>;
			}
		} else {
			return <>{toIntlLabel(label)}</>;
		}
	} else {
		const def = label as NodeDef;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {$key: keyOfChild, ...more} = def;
		NUtils.getDefKey(def);
		NUtils.inheritValidationScopes($validationScopes, def);
		return <Wrapper $root={$wrapped.$root} $model={$wrapped.$model} $p2r={$wrapped.$p2r} {...rest} {...more} />;
	}
};
