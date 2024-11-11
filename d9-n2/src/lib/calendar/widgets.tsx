import styled from 'styled-components';
import {CssVars, DOM_KEY_WIDGET} from '../constants';
import {CaretLeft, CaretRight} from '../icons';
import {SDP} from '../styled-components-styles';

export const PopupContainer = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-calendar-popup-wrapper'})`
    display: flex;
    position: relative;
    flex-direction: column;
    background-color: ${CssVars.BACKGROUND_COLOR};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LeftCaret = styled(CaretLeft as any)`
    height: ${CssVars.FONT_SIZE};
    width: calc(${CssVars.FONT_SIZE} + 2px);
    fill: ${CssVars.FONT_COLOR};
`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RightCaret = styled(CaretRight as any)`
    height: ${CssVars.FONT_SIZE};
    width: calc(${CssVars.FONT_SIZE} + 2px);
    fill: ${CssVars.FONT_COLOR};
`;
