import {VUtils} from '@rainbow-d9/n1';
import {DOM_KEY_WIDGET, SDP, toIntlLabel} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {AppEventTypes, BannerBreadcrumb, useAppEventBus, useAuthenticatedChanged} from '../bootstrap';
import {isAuthenticated} from '../services';
import {isBannerBreadcrumbEnabled} from '../utils';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'app-banner-breadcrumb'})`
    display: flex;
    position: relative;
    flex-direction: column;
    height: var(--app-banner-height);
    padding: var(--app-banner-breadcrumb-padding);
    justify-content: center;

    > span[data-type=space-grabber] {
        flex-grow: 1;

        &[data-visible=false] {
            display: none;
        }
    }
`;
// noinspection CssUnresolvedCustomProperty,CssNoGenericFontName
const Title = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'app-banner-breadcrumb-title'})`
    display: flex;
    position: relative;
    align-items: center;
    white-space: nowrap;
    font-family: var(--app-banner-breadcrumb-title-font-family);
    font-size: var(--app-banner-breadcrumb-title-font-size);
    font-weight: var(--app-banner-breadcrumb-title-font-weight);
    color: var(--app-banner-breadcrumb-title-color);
`;
const Locations = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'app-banner-breadcrumb-locations'})`
    display: flex;
    position: relative;
    margin-top: 2px;
    margin-bottom: -6px;

    &:empty {
        display: none;
    }
`;
// noinspection CssUnresolvedCustomProperty,CssNoGenericFontName
const Location = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'app-banner-breadcrumb-location'})`
    display: flex;
    position: relative;
    align-items: center;
    white-space: nowrap;
    font-family: var(--app-banner-breadcrumb-location-font-family);
    font-size: var(--app-banner-breadcrumb-location-font-size);
    font-weight: var(--app-banner-breadcrumb-location-font-weight);
    color: var(--app-banner-breadcrumb-location-color);

    &:not(:first-child):before {
        content: '/';
        margin-left: 4px;
        margin-right: 4px;
    }
`;

interface BreadcrumbState extends Partial<BannerBreadcrumb> {
	exists: boolean;
}

export const Breadcrumb = () => {
	const {on, off, fire} = useAppEventBus();
	const [state, setState] = useState<BreadcrumbState>({exists: false});
	useAuthenticatedChanged();
	useEffect(() => {
		const onBreadcrumbChanged = (breadcrumb?: BannerBreadcrumb) => {
			setState({exists: !!breadcrumb, ...breadcrumb});
		};
		on(AppEventTypes.BREADCRUMB_CHANGED, onBreadcrumbChanged);
		return () => {
			off(AppEventTypes.BREADCRUMB_CHANGED, onBreadcrumbChanged);
		};
	}, []);
	useEffect(() => {
		if (!state.exists) {
			fire(AppEventTypes.ASK_BREADCRUMB, (breadcrumb?: BannerBreadcrumb) => {
				if (breadcrumb != null) {
					setState({exists: true, ...breadcrumb});
				}
			});
		}
	}, [state.exists]);

	if (!isBannerBreadcrumbEnabled() || !isAuthenticated() || !state.exists) {
		return null;
	}

	return <Container>
		<Title>{toIntlLabel(state.title)}</Title>
		<Locations>
			{state.locations?.map(location => {
				return <Location key={VUtils.generateUniqueId()}>
					{toIntlLabel(location)}
				</Location>;
			})}
		</Locations>
	</Container>;
};