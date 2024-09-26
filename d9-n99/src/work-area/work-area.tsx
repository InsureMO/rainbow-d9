import {DOM_KEY_WIDGET, GlobalEventBusProvider} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {I18NAndD9N2Bridge} from '../bootstrap';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-work-area'})`
    display: block;
    position: relative;
    width: 100vw;
    min-width: 100vw;
    height: 100vh;
    min-height: 100vh;
    background: var(--app-work-area-background);
    transition: margin-left .3s ease-in-out, width .3s ease-in-out;
`;

const WorkAreaContainer = () => {
	// wrapped by global event bus provider, which supports i18n
	return <GlobalEventBusProvider>
		<I18NAndD9N2Bridge/>
		<Container>
		</Container>
	</GlobalEventBusProvider>;
};

export const WorkArea = () => {
	return <WorkAreaContainer/>;
};
