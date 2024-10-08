import {DOM_KEY_WIDGET, IntlLabel} from '@rainbow-d9/n2';
import {JSX, LazyExoticComponent, Suspense} from 'react';
import styled from 'styled-components';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'page-lazy-loading'})`
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

export const LazyPageWrapper = (LazyComponent: LazyExoticComponent<() => JSX.Element>) => {
	return () => (
		<Suspense fallback={<Container>
			<div>
				<IntlLabel keys={['page.lazy']} value="Page is loading ..."/>
			</div>
		</Container>}>
			<LazyComponent/>
		</Suspense>
	);
};
