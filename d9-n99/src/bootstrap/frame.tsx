import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {Banner} from '../header';
import {SideMenu} from '../left-side';
import {WorkArea} from '../work-area';
import {AppFrameLayoutController} from './layout-controller';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-frame'})`
    display: block;
    position: relative;
    min-width: 100vw;
    min-height: 100vh;

    div[data-w=d9-section] {
        &[data-next-to-banner] {
            margin-top: var(--app-page-next-to-banner-margin);
        }
    }

    button[data-w=d9-button] {
        &[data-fit-link] {
            padding: 0;
            justify-self: flex-start;
        }
    }

    div[data-w=d9-deco-input] {
        &:hover {
            > span[data-w=d9-deco-tail] > svg {
                fill: var(--d9-primary-color);
                transition: fill var(--d9-transition-duration) var(--d9-transition-timing-function)
            }
        }

        &[data-di-eat-tails] {
            border: var(--d9-border);
            border-radius: var(--d9-border-radius);
            transition: box-shadow var(--d9-transition-duration) var(--d9-transition-timing-function), border-color var(--d9-transition-duration) var(--d9-transition-timing-function);

            &:hover {
                border-color: var(--d9-primary-color);
                box-shadow: var(--d9-primary-shadow);
            }

            > input {
                border: 0;
                box-shadow: none;

                &:hover, &:focus {
                    border-color: transparent;
                    box-shadow: none;
                }
            }

            > span[data-w=d9-deco-tail] {
                border: 0;
            }
        }

        svg[data-icon=search] {
            transform: scale(0.7);
        }
    }
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
