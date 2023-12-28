import styled from 'styled-components';
import {DOM_ID_WIDGET, DOM_KEY_WIDGET} from '../constants';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const APagination = styled.div.attrs(({id, 'data-w': dataW}) => {
	return {
		[DOM_KEY_WIDGET]: dataW || 'd9-pagination',
		[DOM_ID_WIDGET]: id
	};
})`
    display: flex;
    position: relative;

    &[data-visible=false] {
        display: none;
    }
`;
