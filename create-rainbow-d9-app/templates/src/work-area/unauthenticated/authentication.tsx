import {GlobalRoot} from '@rainbow-d9/n2';
import {I18NAndD9N2Bridge} from '../../bootstrap';
import {useExternalSSO} from './use-external-sso';
import {Container} from './widgets';

export const Authentication = () => {
	// also could be authed by external SSO as well
	useExternalSSO();

	return <GlobalRoot>
		<I18NAndD9N2Bridge/>
		<Container>
			<div>Unauthenticated</div>
		</Container>
	</GlobalRoot>;
};
