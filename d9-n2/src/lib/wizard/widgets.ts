import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from '../constants';

export const AWizard = styled.div.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-wizard',
		[DOM_ID_WIDGET]: id
	};
})`
    display: flex;
    position: relative;
    flex-direction: column;

    &[data-visible=false] {
        display: none;
    }
`;

export const WizardHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wizard-header'})`
    display: flex;
    position: relative;
    flex-wrap: wrap;
    column-gap: calc(${CssVars.WIZARD_STEP_TITLE_PADDING} / 2);
    row-gap: calc(${CssVars.WIZARD_STEP_TITLE_PADDING} / 2);
    padding: calc(${CssVars.WIZARD_STEP_TITLE_PADDING} / 2) 0;
    border-radius: calc(${CssVars.BORDER_RADIUS} * 2);
`;
export const AWizardStepTitle = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wizard-step-title'})`
    display: flex;
    position: relative;
    align-items: center;
    font-family: ${CssVars.WIZARD_STEP_TITLE_FONT_FAMILY};
    font-size: ${CssVars.WIZARD_STEP_TITLE_FONT_SIZE};
    font-weight: ${CssVars.WIZARD_STEP_TITLE_FONT_WEIGHT};
    color: ${CssVars.CAPTION_FONT_COLOR};
    fill: ${CssVars.CAPTION_FONT_COLOR};
    border: ${CssVars.BORDER};
    border-radius: calc(${CssVars.BORDER_RADIUS} * 3);
    height: ${CssVars.WIZARD_STEP_TITLE_HEIGHT};
    padding: ${CssVars.WIZARD_STEP_TITLE_OFFSET} ${CssVars.WIZARD_STEP_TITLE_PADDING} 0;
    margin-top: -1px;
    margin-right: -1px;
    cursor: pointer;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-active=true] {
        background-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
        border-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
        color: ${CssVars.INVERT_COLOR};

        &:hover {
            background-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
            border-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
            box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
        }

        > span[data-w=d9-caption] {
            color: ${CssVars.INVERT_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.INVERT_COLOR};
                fill: ${CssVars.INVERT_COLOR};
            }
        }
    }

    &[data-visible=false] {
        display: none;
    }

    &[data-disabled=true] {
        cursor: default;
        background-color: ${CssVars.DISABLE_COLOR};
    }

    &:hover {
        background-color: ${CssVars.HOVER_COLOR};
        border-color: ${CssVars.HOVER_COLOR};
        box-shadow: ${CssVars.HOVER_SHADOW};
    }
`;
export const WizardBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wizard-body'})`
    display: block;
    position: relative;
    border-top: ${CssVars.BORDER};
    padding: ${CssVars.SECTION_BODY_PADDING} 0;
    margin-top: -1px;
`;
export const AWizardStepBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wizard-step-body'})`
    display: block;
    position: relative;

    &[data-visible=false] {
        display: none;
    }
`;