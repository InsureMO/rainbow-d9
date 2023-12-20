import {NodeDef, NUtils, VUtils, WrappedAttributes, Wrapper} from '@rainbow-d9/n1';
import React, {ReactNode} from 'react';
import {Caption} from './caption';

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
			return <Caption label={label as ReactNode} $wrapped={$wrapped} {...rest}/>;
		} else {
			return <>{label}</>;
		}
	} else {
		const caption = label as NodeDef;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {$key: keyOfChild, ...more} = caption;
		NUtils.getDefKey(caption);
		NUtils.inheritValidationScopes($validationScopes, caption);
		return <Wrapper $root={$wrapped.$root} $model={$wrapped.$model} $p2r={$wrapped.$p2r} {...rest} {...more} />;
	}
};
