import {DOM_KEY_WIDGET, GlobalRoot, IntlLabel} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {I18NAndD9N2Bridge} from '../../bootstrap';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'page-my-tasks'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: 7fr auto 10fr;
    width: 100%;
    height: 100%;

    > div {
        grid-column: 2;
        grid-row: 2;
    }
`;

export default () => {
	return <GlobalRoot>
		<I18NAndD9N2Bridge/>
		<Container>
			<div data-type="home">
				<IntlLabel keys={['page.my-tasks']}
				           value="My tasks page, modify /src/pages/my-tasks/page.tsx change the rendering behavior."/>
			</div>
		</Container>
	</GlobalRoot>;
};
