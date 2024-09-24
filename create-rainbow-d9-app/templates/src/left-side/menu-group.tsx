import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import {useState} from 'react';
import styled from 'styled-components';
import ArrowIcon from '../assets/single-arrow-down.svg?react';
import {AppMenuGroup, isMenuGroup, isMenuItem} from '../global-settings';
import {MenuItem} from './menu-item';

interface MenuGroupProps extends AppMenuGroup {
	/** starts from 0 */
	level: number;
}

const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-side-menu-group'})`
    display: flex;
    position: relative;
    flex-direction: column;
    flex-grow: 1;

    &[data-expanded=true] {
        > span[data-w=app-side-menu-group-label] {
            > span[data-type=arrow] > svg {
                transform: rotateX(180deg);
            }
        }

        > div[data-w=app-side-menu-group-items] {
            max-height: unset;
        }
    }

    &[data-expanded=false] {
        > div[data-w=app-side-menu-group-items] {
            max-height: 0;
        }
    }
`;
// noinspection CssUnresolvedCustomProperty
const Label = styled.span.attrs<{ level: number }>(({level}) => {
	return {
		[DOM_KEY_WIDGET]: 'app-side-menu-group-label',
		style: {
			'--menu-level': level
		}
	};
})<{ level: number }>`
    display: flex;
    position: relative;
    align-items: center;
    height: var(--app-side-menu-group-label-height);
    color: var(--app-side-menu-group-label-color);
    font-size: var(--app-side-menu-group-label-font-size);
    font-weight: var(--app-side-menu-group-label-font-weight);
    border-radius: var(--app-side-menu-group-border-radius);
    padding-left: calc(var(--menu-level) * var(--app-side-menu-level-indent));
    white-space: nowrap;
    cursor: pointer;
    transition: background 0.3s ease-in-out;

    &:hover {
        background: var(--app-side-menu-group-label-hover-background);

        > span[data-type=icon],
        > span[data-type=text],
        > span[data-type=arrow] {
            color: var(--app-side-menu-group-label-hover-color);
        }
    }

    > span[data-type=icon],
    > span[data-type=arrow] {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        height: var(--app-side-menu-item-label-height);
        width: var(--app-side-menu-item-label-height);
        min-width: var(--app-side-menu-item-label-height);
    }

    > span[data-type=icon] {
        &:empty {
            display: none;
        }

        > svg {
            height: var(--app-side-menu-icon-size);
            width: var(--app-side-menu-icon-size);
            transition: color 0.3s ease-in-out;
        }
    }

    > span[data-type=text] {
        display: flex;
        position: relative;
        align-items: center;
        flex-grow: 1;
        transition: color 0.3s ease-in-out;
    }

    > span[data-type=arrow] {
        > svg {
            height: calc(var(--app-side-menu-icon-size) * 0.8);
            width: calc(var(--app-side-menu-icon-size) * 0.8);
            transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
        }
    }
`;

const Items = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-side-menu-group-items'})`
    display: flex;
    position: relative;
    flex-direction: column;
    overflow: hidden;
`;

interface MenuGroupState {
	expanded: boolean;
}

export const MenuGroup = (props: MenuGroupProps) => {
	const {icon, text, items, level} = props;

	const [state, setState] = useState<MenuGroupState>({expanded: false});

	if (items == null || items.length === 0) {
		// no menu item, there is no need to show this group
		return null;
	}

	const onGroupLabelClicked = () => {
		setState({expanded: !state.expanded});
	};

	return <Container data-expanded={state.expanded}>
		<Label level={level} onClick={onGroupLabelClicked}>
			<span data-type="icon">{icon}</span>
			<span data-type="text">{text}</span>
			<span data-type="arrow"><ArrowIcon/></span>
		</Label>
		<Items>
			{items.map(menu => {
				if (isMenuGroup(menu)) {
					return <MenuGroup key={menu.code} {...menu} level={level + 1}/>;
				} else if (isMenuItem(menu)) {
					return <MenuItem key={menu.code} {...menu} level={level + 1}/>;
				} else {
					return null;
				}
			})}
		</Items>
	</Container>;
};
