import {DOM_KEY_WIDGET, SDP, toIntlLabel} from '@rainbow-d9/n2';
import {CSSProperties} from 'react';
import styled from 'styled-components';
import {useAppEventBus} from '../bootstrap';
import {AppMenuItem} from '../global-settings';

interface MenuItemProps extends AppMenuItem {
	/** starts from 0 */
	level: number;
}

const Container = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'app-side-menu-item'})`
    display: flex;
    position: relative;
    flex-direction: column;
`;
// noinspection CssUnresolvedCustomProperty
const Label = styled.span.attrs<{ level: number }>(({level}) => {
	return {
		[DOM_KEY_WIDGET]: 'app-side-menu-item-label',
		style: {
			'--menu-level': level
		} as CSSProperties
	};
})<{ level: number }>`
    display: flex;
    position: relative;
    align-items: center;
    height: var(--app-side-menu-item-label-height);
    color: var(--app-side-menu-item-label-color);
    font-size: var(--app-side-menu-item-label-font-size);
    font-weight: var(--app-side-menu-item-label-font-weight);
    border-radius: var(--app-side-menu-item-border-radius);
    padding-left: calc(var(--menu-level) * var(--app-side-menu-level-indent));
    white-space: nowrap;
    cursor: pointer;
    transition: background .3s ease-in-out, padding .3s ease-in-out;

    &:hover {
        background: var(--app-side-menu-item-label-hover-background);

        > span[data-type=icon],
        > span[data-type=text] {
            color: var(--app-side-menu-item-label-hover-color);
        }
    }

    > span[data-type=icon] {
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
            transition: color .3s ease-in-out;
        }
    }

    > span[data-type=text] {
        display: flex;
        position: relative;
        align-items: center;
        flex-grow: 1;
        margin-left: var(--app-side-menu-text-indent);
        transition: color .3s ease-in-out;
    }
`;

export const MenuItem = (props: MenuItemProps) => {
	const {icon, text, level, click} = props;

	const {fire} = useAppEventBus();
	const onLabelClick = async () => {
		await click(fire);
	};

	return <Container data-visible={true}>
		<Label level={level} onClick={onLabelClick}>
			<span data-type="icon">{icon}</span>
			<span data-type="text">{toIntlLabel(text)}</span>
		</Label>
	</Container>;
};