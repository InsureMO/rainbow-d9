import {ButtonFill, UnwrappedCaption} from '@rainbow-d9/n2';
import {asT} from '../../../../utils';
import {ResultItem} from './types';

// change the relatedPolicyNos, ongoingClaimNos in item model
// from string array
// to react component
// make sure it can be rendered in label, and a clickable caption, and as vertical list

const RelatedPolicy = (props: { policyNo: string }) => {
	const {policyNo} = props;
	const onClick = () => alert(policyNo);
	return <UnwrappedCaption data-fill={ButtonFill.LINK} click={onClick}>{policyNo}</UnwrappedCaption>;
};
const RelatedClaim = (props: { claimNo: string }) => {
	const {claimNo} = props;
	const onClick = () => alert(claimNo);
	return <UnwrappedCaption data-fill={ButtonFill.LINK} click={onClick}>{claimNo}</UnwrappedCaption>;
};
export const wrapResults = (results?: Array<ResultItem>) => {
	if (results == null || results.length === 0) {
		return [];
	}
	const wrapped = results.map(item => {
		const {relatedPolicyNos, ongoingClaimNos, ...rest} = item;
		return {
			...rest,
			relatedPolicyNos: relatedPolicyNos?.map(policyNo => {
				return <RelatedPolicy policyNo={policyNo} key={policyNo}/>;
			}),
			ongoingClaimNos: ongoingClaimNos?.map(claimNo => {
				return <RelatedClaim claimNo={claimNo} key={claimNo}/>;
			})
		};
	});
	results.length = 0;
	results.push(...asT<Array<ResultItem>>(wrapped));
	return results;
};
