import {ButtonFill, UnwrappedCaption} from '@rainbow-d9/n2';
import {ResultItem} from './types';

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
	results.push(...wrapped as unknown as Array<ResultItem>);
	return results;
};
