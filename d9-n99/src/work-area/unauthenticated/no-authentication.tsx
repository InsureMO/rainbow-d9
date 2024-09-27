import {GlobalRoot, IntlLabel} from '@rainbow-d9/n2';
import {I18NAndD9N2Bridge} from '../../bootstrap';
import {useExternalSSO} from './use-external-sso';
import {Container} from './widgets';

/**
 * Under normal circumstances, if the application login page is not enabled, it indicates that the login is a form of SSO.
 * Which, in this context, also includes cases where the same authentication is used for the parent when embedded in an iframe.
 * Therefore, the page presentation should be modified according to the actual requirements.
 */
export const NoAuthentication = () => {
	// should be authed by external SSO
	useExternalSSO();

	return <GlobalRoot>
		<I18NAndD9N2Bridge/>
		<Container data-w="page-no-authentication">
			<div data-type="no-authentication">
				<IntlLabel keys={['page.authentication.no-auth-enabled']}
				           value="No authentication enabled, modify /src/work-area/unauthenticated/no-authentication.tsx to implement SSO."/>
			</div>
		</Container>
	</GlobalRoot>;
};
