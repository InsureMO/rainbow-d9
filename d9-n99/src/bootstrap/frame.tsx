import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {Banner} from '../header';
import {SideMenu} from '../left-side';
import {WorkArea} from '../work-area';
import {AppFrameLayoutController} from './layout-controller';

const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-frame'})`
    display: block;
    position: relative;
    min-width: 100vw;
    min-height: 100vh;
`;

export const AppFrame = () => {
	return <>
		{/** controller for control the layout of frame */}
		<AppFrameLayoutController/>
		<Container>
			<SideMenu/>
			<Banner/>
			<WorkArea/>
		</Container>
	</>;
};
