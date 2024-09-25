import styled from 'styled-components';

// noinspection CssUnresolvedCustomProperty
export const CheckLabel = styled.span`
    display: flex;
    position: relative;
    align-items: center;
    flex-grow: 1;

    > span[data-type=text] {
        flex-grow: 1;
    }

    > span[data-type=icon] {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        height: var(--app-side-menu-item-label-height);
        width: var(--app-side-menu-item-label-height);
        min-width: var(--app-side-menu-item-label-height);

        > svg {
            height: var(--app-side-menu-icon-size);
            width: var(--app-side-menu-icon-size);
        }
    }
`;