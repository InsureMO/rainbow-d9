import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {askMenus, isMenuGroup, isMenuItem} from '../global-settings';
import {MenuGroup} from './menu-group';
import {MenuItem} from './menu-item';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-side-menu-body'})`
    display: flex;
    position: relative;
    flex-direction: column;
    flex-grow: 1;
    padding: var(--app-side-menu-body-padding);
    transition: padding .3s ease-in-out;
`;

export const SideMenuBody = () => {
	const menus = askMenus();

	return <Container>
		{menus.map(menu => {
			if (isMenuGroup(menu)) {
				return <MenuGroup key={menu.code} {...menu} level={0}/>;
			} else if (isMenuItem(menu)) {
				return <MenuItem key={menu.code} {...menu} level={0}/>;
			} else {
				return null;
			}
		})}
	</Container>;
};
