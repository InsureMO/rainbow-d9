import {DOM_KEY_WIDGET, SDP} from '@rainbow-d9/n2';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import styled from 'styled-components';
import {getBaseContext, getUnauthenticatedRoute} from '../utils';
import {Authenticated} from './authenticated';
import {Unauthenticated} from './unauthenticated';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'app-work-area'})`
    display: block;
    position: relative;
    width: 100vw;
    min-width: 100vw;
    min-height: 100vh;
    background: var(--app-work-area-background);
    transition: margin-left .3s ease-in-out, width .3s ease-in-out, min-width .3s ease-in-out;

    > div[data-w=dialog] > div[data-w=dialog-wrapper] {
        > div[data-w=page-standard-wrapper] {
            padding: 0;
        }
    }
`;

const WorkAreaContainer = () => {
	return <Container>
		<BrowserRouter basename={getBaseContext()}>
			<Routes>
				<Route path={getUnauthenticatedRoute()} element={<Unauthenticated/>}/>
				<Route path="*" element={<Authenticated/>}/>
			</Routes>
		</BrowserRouter>
	</Container>;
};

export const WorkArea = () => {
	return <WorkAreaContainer/>;
};
