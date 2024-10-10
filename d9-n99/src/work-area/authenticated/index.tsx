import {Fragment, useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {AppEventTypes, useAppEventBus} from '../../bootstrap';
import {PageRegistrar} from '../../global-settings';
import {EntryPointPage} from '../../pages';
import {isAuthenticated} from '../../services';
import {getUnauthenticatedRoute} from '../../utils';
import {BreadcrumbCorrespondent} from './breadcrumb-correspondent';

const AuthenticationChangeHandler = () => {
	const navigate = useNavigate();
	const {on, off} = useAppEventBus();
	useEffect(() => {
		const onAuthenticationChanged = () => {
			if (!isAuthenticated()) {
				navigate(getUnauthenticatedRoute(), {replace: true});
			}
		};
		on(AppEventTypes.AUTHENTICATED_CHANGED, onAuthenticationChanged);
		return () => {
			off(AppEventTypes.AUTHENTICATED_CHANGED, onAuthenticationChanged);
		};
	}, [on, off]);

	return <Fragment/>;
};

const RouteSwitcher = () => {
	const navigate = useNavigate();
	const {on, off} = useAppEventBus();
	useEffect(() => {
		const onNavigatorTo = (route: string) => {
			navigate(route);
		};
		on(AppEventTypes.NAVIGATE_TO, onNavigatorTo);
		return () => {
			off(AppEventTypes.NAVIGATE_TO, onNavigatorTo);
		};
	}, [on, off]);
	return <Fragment/>;
};

export const Authenticated = () => {
	if (!isAuthenticated()) {
		return <Navigate to={getUnauthenticatedRoute()} replace={true}/>;
	}

	return <>
		<AuthenticationChangeHandler/>
		<Routes>
			{PageRegistrar.all().map(page => {
				return <Route path={page.route} element={<BreadcrumbCorrespondent {...page}/>} key={page.code}/>;
			})}
			<Route path="/*" element={<BreadcrumbCorrespondent {...EntryPointPage}/>}/>
		</Routes>
		<RouteSwitcher/>
	</>;
};

