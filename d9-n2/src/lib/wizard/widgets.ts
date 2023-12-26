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
    row-gap: calc(${CssVars.WIZARD_STEP_TITLE_PADDING} / 2);
    padding: calc(${CssVars.WIZARD_STEP_TITLE_PADDING} / 2) 0;
    border-radius: calc(${CssVars.BORDER_RADIUS} * 2);

    &[data-balloon=false] {
        column-gap: calc(${CssVars.WIZARD_STEP_TITLE_PADDING} / 2);
    }
`;
export const AWizardStepTitle = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wizard-step-title'})`
    display: flex;
    position: relative;
    flex-grow: 1;
    align-items: center;
    font-family: ${CssVars.WIZARD_STEP_TITLE_FONT_FAMILY};
    font-size: ${CssVars.WIZARD_STEP_TITLE_FONT_SIZE};
    font-weight: ${CssVars.WIZARD_STEP_TITLE_FONT_WEIGHT};
    color: ${CssVars.CAPTION_FONT_COLOR};
    fill: ${CssVars.CAPTION_FONT_COLOR};
    border: ${CssVars.BORDER};
    border-radius: calc(${CssVars.BORDER_RADIUS} * 3);
    height: ${CssVars.WIZARD_STEP_TITLE_HEIGHT};
    margin-top: -1px;
    margin-right: -1px;
    cursor: pointer;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-visible=false] {
        display: none;
    }

    &[data-disabled=true] {
        cursor: default;
        background-color: ${CssVars.DISABLE_COLOR};
    }

    &[data-emphasis=true] {
        flex-grow: 4;
    }

    &[data-free-walk=false][data-done=false][data-active=false] {
        cursor: default;

        &[data-balloon=false] {
            background-color: transparent;
            border-color: ${CssVars.BORDER_COLOR};
            box-shadow: none;
        }

        &[data-balloon=true] {
            > div[data-w=d9-wizard-step-balloon] {
                > span {
                    cursor: default;

                    &:hover {
                        background-color: ${CssVars.INVERT_COLOR};
                        border-color: ${CssVars.BORDER_COLOR};
                        box-shadow: none;
                    }
                }
            }
        }
    }

    &[data-balloon=false] {
        padding: ${CssVars.WIZARD_STEP_TITLE_OFFSET} ${CssVars.WIZARD_STEP_TITLE_PADDING} 0;
        border-top-right-radius: calc(${CssVars.WIZARD_STEP_TITLE_HEIGHT} / 2);
        border-bottom-right-radius: calc(${CssVars.WIZARD_STEP_TITLE_HEIGHT} / 2);

        &[data-active=true] {
            background-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
            border-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
            color: ${CssVars.INVERT_COLOR};

            &:hover {
                background-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
                border-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
                box-shadow: ${CssVars.HOVER_SHADOW};
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

        &[data-done=true] {
            background-color: ${CssVars.WIZARD_STEP_TITLE_DONE_COLOR};
            border-color: ${CssVars.WIZARD_STEP_TITLE_DONE_COLOR};

            &:hover {
                background-color: ${CssVars.WIZARD_STEP_TITLE_DONE_COLOR};
                border-color: ${CssVars.WIZARD_STEP_TITLE_DONE_COLOR};
                box-shadow: ${CssVars.HOVER_SHADOW};
            }
        }

        &:hover {
            background-color: ${CssVars.HOVER_COLOR};
            border-color: ${CssVars.HOVER_COLOR};
            box-shadow: ${CssVars.HOVER_SHADOW};
        }
    }

    &[data-balloon=true] {
        flex-direction: column;
        height: unset;
        background-color: transparent;
        border-color: transparent;
        padding: 0;
        cursor: default;

        &[data-active=true] {
            > div[data-w=d9-wizard-step-balloon] {
                > span {
                    border-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
                    background-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
                    color: ${CssVars.INVERT_COLOR};

                    &:hover {
                        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
                    }
                }
            }
        }

        &[data-done=true] {
            > div[data-w=d9-wizard-step-balloon] {
                > span {
                    border-color: ${CssVars.WIZARD_STEP_TITLE_DONE_COLOR};
                    background-color: ${CssVars.WIZARD_STEP_TITLE_DONE_COLOR};

                    &:hover {
                        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
                    }
                }
            }
        }

        &:hover {
            background-color: transparent;
            border-color: transparent;
            box-shadow: none;
        }
    }
`;
export const AWizardStepBalloon = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-wizard-step-balloon'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    justify-self: stretch;

    &:before {
        content: '';
        display: block;
        position: absolute;
        height: calc(${CssVars.BORDER_WIDTH} * 2);
        width: 100%;
        top: 50%;
        left: 0;
        border-top-color: ${CssVars.BORDER_COLOR};
        border-top-style: dashed;
        border-top-width: calc(${CssVars.BORDER_WIDTH} * 2);
        z-index: 0;
    }

    > span {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        height: ${CssVars.WIZARD_STEP_BALLOON_HEIGHT};
        width: ${CssVars.WIZARD_STEP_BALLOON_HEIGHT};
        font-family: ${CssVars.WIZARD_STEP_TITLE_FONT_FAMILY};
        font-size: ${CssVars.WIZARD_STEP_TITLE_FONT_SIZE};
        font-weight: ${CssVars.WIZARD_STEP_TITLE_FONT_WEIGHT};
        color: ${CssVars.CAPTION_FONT_COLOR};
        background-color: ${CssVars.INVERT_COLOR};
        border: ${CssVars.BORDER};
        border-radius: 100%;
        cursor: pointer;
        transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

        &:hover {
            background-color: ${CssVars.HOVER_COLOR};
            border-color: ${CssVars.HOVER_COLOR};
            box-shadow: ${CssVars.HOVER_SHADOW};
        }
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
