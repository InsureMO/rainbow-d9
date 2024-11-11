import {DOM_KEY_WIDGET, SDP} from '@rainbow-d9/n2';
import styled from 'styled-components';

// noinspection CssUnresolvedCustomProperty,CssNoGenericFontName
export const Container = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'page-authentication'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: 5fr auto 10fr;
    width: 100%;
    height: 100vh;

    > div {
        grid-column: 2;
        grid-row: 2;

        &[data-type=no-authentication] {
            font-size: var(--page-no-authentication-font-size);
        }

        &[data-w=authentication-panel] {
            min-width: var(--page-authentication-min-width);
            border: var(--page-authentication-border);
            border-radius: var(--page-authentication-border-radius);
            padding: var(--page-authentication-padding);
            --input-height: calc(var(--d9-input-height) * 1.5);
            --font-size: calc(var(--d9-font-size) * 1.5);
            overflow: hidden;

            &[data-mode=pwd] {
                > div[data-w=d9-section-body] {
                    > span[data-type=icon][data-for=code2fa],
                    > div[data-w=d9-deco-input][data-di-for=code2fa] {
                        left: 110%;
                        //opacity: 0;
                        pointer-events: none;
                    }
                }
            }

            &[data-mode=code-2fa] {
                > div[data-w=d9-section-body] {
                    > span[data-type=icon][data-for=pwd],
                    > div[data-w=d9-deco-input][data-di-for=pwd] {
                        left: -110%;
                        //opacity: 0;
                        pointer-events: none;
                    }
                }
            }

            > div[data-w=d9-section-header] {
                border-bottom: 0;
                height: unset;
                padding-top: calc(var(--input-height) / 3);
                padding-bottom: calc(var(--input-height) / 4);


                > div[data-w=d9-section-header-title] {
                    font-family: var(--page-authentication-title-font-family);
                    font-size: calc(var(--font-size) * 1.5);
                    font-weight: var(--page-authentication-title-font-weight);
                }
            }

            > div[data-w=d9-section-body] {
                grid-template-rows: auto calc(var(--input-height) * 1.5) calc(var(--input-height) * 1.5) auto;

                > span[data-w=d9-caption] {
                    --grid-column: span 12;
                    color: var(--d9-danger-color);
                    height: calc(var(--input-height) * 0.5);
                    font-size: calc(var(--font-size) * 0.7);
                    margin-bottom: calc(var(--input-height) / 2);

                    &:empty {
                        height: 0;
                        margin-bottom: 0;
                    }
                }

                > span[data-type=icon] {
                    display: flex;
                    position: absolute;
                    align-items: center;
                    height: var(--input-height);
                    width: var(--input-height);
                    left: calc(var(--input-height) / 4);
                    transition: color .3s ease-in-out, left .3s ease-in-out, opacity .3s ease-in-out;
                    z-index: 1;

                    &[data-for=username] {
                        grid-row: 2;
                    }

                    &[data-for=pwd],
                    &[data-for=code2fa] {
                        grid-row: 3;
                    }

                    > svg {
                        height: calc(var(--input-height) * 0.5);
                        width: calc(var(--input-height) * 0.5);
                    }
                }

                > div[data-w=d9-deco-input] {
                    position: absolute;
                    --grid-column: 1 / span 12;
                    height: var(--input-height);

                    &[data-di-for=username] {
                        grid-row: 2;
                    }

                    &[data-di-for=pwd],
                    &[data-di-for=code2fa] {
                        grid-row: 3;
                        transition: left 30s ease-in-out, opacity .3s ease-in-out;
                    }

                    &[data-disabled=false]:hover + span[data-type=icon],
                    &[data-disabled=false]:focus-within + span[data-type=icon] {
                        color: var(--d9-primary-color);
                    }

                    > input,
                    > span[data-w=d9-deco-input-placeholder] {
                        padding-left: var(--input-height);
                        height: var(--input-height);
                        font-size: var(--font-size);
                    }
                }

                > button[data-w=d9-button] {
                    grid-row: 4;
                    height: calc(var(--input-height) * 0.8);
                    font-size: var(--font-size);

                    &[data-for=toPwd] {
                        --grid-column: span 6;
                        padding: 0;
                        justify-self: flex-start;
                    }

                    &[data-for=login] {
                        --grid-column: 9 / span 4;
                        width: 100%;
                    }
                }
            }
        }
    }
`;
