import {CssVars} from '@rainbow-d9/n2';
import styled from 'styled-components';

// @ts-ignore
export const DemoContainer = styled.div.attrs({'data-w': 'd9-demo-container'})`
    display: grid;
    position: relative;
    grid-template-columns: 300px 1fr;
    grid-template-rows: calc(100vh - ${CssVars.SECTION_HEADER_HEIGHT} - 2px) auto;

    &:not([data-active-source=none]) {
        grid-template-rows: 50vh 50vh;
    }
`;
export const DemoMenus = styled.div.attrs({
	// @ts-ignore
	'data-w': 'd9-demo-menus',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
    display: flex;
    position: sticky;
    grid-row: 1 / span 2;
    top: 0;
    flex-direction: column;
    height: 100vh;
    border-right: ${CssVars.BORDER};
    overflow-x: hidden;
    overflow-y: auto;
`;
export const DemoMenuHeader = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    align-items: center;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 3);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: calc(${CssVars.FONT_SIZE} * 1.4);
    font-weight: ${CssVars.FONT_BOLD};
    color: ${CssVars.INVERT_COLOR};
    background-color: ${CssVars.PRIMARY_COLOR};
    min-height: calc(${CssVars.INPUT_HEIGHT} * 1.6);
    z-index: 1;
`;
export const DemoMenu = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 3);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: calc(${CssVars.FONT_SIZE} * 1.2);
    color: ${CssVars.FONT_COLOR};
    min-height: calc(${CssVars.INPUT_HEIGHT} * 1.4);
    border-bottom: ${CssVars.BORDER};
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &[data-active=true] {
        &:before {
            content: '>>';
            display: block;
            position: relative;
            margin-right: 8px;
        }

        &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-color: ${CssVars.PRIMARY_COLOR};
            opacity: 0.1;
        }
    }

    &:hover {
        color: ${CssVars.PRIMARY_COLOR};
        background-color: ${CssVars.HOVER_COLOR};
        text-decoration: underline;
    }
`;
// @ts-ignore
export const DemoPlayground = styled.div.attrs({'data-w': 'd9-demo-playground'})`
    display: block;
    position: relative;
    overflow: auto;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 2);
    min-height: 50vh;
`;
// @ts-ignore
export const DemoSource = styled.div.attrs({'data-w': 'd9-demo-source'})`
    display: flex;
    position: relative;
    flex-direction: column;
    max-width: 100%;
    background-color: ${CssVars.INVERT_COLOR};
    border-top: ${CssVars.BORDER};
    border-top-width: 2px;
    overflow: hidden;
`;
// @ts-ignore
export const DemoSourceHeader = styled.div.attrs({'data-w': 'd9-demo-source-header'})`
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 2);
    min-height: ${CssVars.SECTION_HEADER_HEIGHT};
    border-bottom: ${CssVars.BORDER};

    > button:not(:first-child) {
        margin-left: 8px;
    }
`;
// @ts-ignore
export const DemoSourceBody = styled.div.attrs({'data-w': 'd9-demo-source-body'})`
    display: flex;
    position: relative;
    flex-direction: column;
    row-gap: 16px;
    overflow: auto;
    padding: calc(${CssVars.SECTION_BODY_PADDING} * 2);

    &[data-avoid-padding=true] {
        padding: 0;

        > div {
            height: 100%;
            min-height: 100%;
            max-height: 100%;
            border-radius: 0;
            border: 0;
        }
    }

    > div[data-w=d9-section] > div[data-w=d9-section-body] {
        display: flex;
        flex-direction: column;
    }
`;
export const MarkdownTitle = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    color: ${CssVars.PRIMARY_COLOR};
    font-size: 1.6em;
    font-weight: bold;
`;
