import {DOM_KEY_WIDGET, GlobalEventTypes, IntlLabel, UnwrappedButton, useGlobalEventBus} from '@rainbow-d9/n2';
import styled from 'styled-components';
import LogoutIcon from '../assets/logout.svg?react';
import {AppEventTypes, useAppEventBus} from '../bootstrap';
import {isAuthenticated} from '../services';
import {clearAuthentication, isAuthenticationEnabled} from '../utils';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-side-menu-footer'})`
    display: flex;
    position: relative;
    padding: var(--app-side-menu-footer-padding);
    transition: padding .3s ease-in-out;
    overflow: hidden;

    &:empty {
        padding: 0;
    }

    > button[data-w=d9-button] {
        width: 100%;

        > span[data-role=text] {
            margin-left: calc((var(--d9-font-size, 14px)) * 1.4);
        }

        > span[data-w=d9-deco-tail] {
            > svg {
                width: 100%;
            }
        }
    }
`;

export const SideMenuFooter = () => {
	const app = useAppEventBus();
	const {fire} = useGlobalEventBus();

	const enabled = isAuthenticationEnabled();
	if (!enabled || !isAuthenticated()) {
		return null;
	}

	const onLogoutClick = () => {
		fire(GlobalEventTypes.SHOW_YES_NO_DIALOG,
			<IntlLabel keys={['actions.logout.confirm']} value="Are you sure to log out?"/>,
			() => {
				clearAuthentication();
				app.fire(AppEventTypes.AUTHENTICATED_CHANGED);
				fire(GlobalEventTypes.HIDE_DIALOG);
			},
			() => {
				fire(GlobalEventTypes.HIDE_DIALOG);
			});
	};
	return <Container>
		<UnwrappedButton
			tails={[<LogoutIcon/>]}
			onClick={onLogoutClick}>
			<IntlLabel keys={['actions.logout.label']} value="Logout"/>
		</UnwrappedButton>
	</Container>;
};
