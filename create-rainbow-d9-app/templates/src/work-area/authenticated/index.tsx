import {Fragment, useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {AppEventTypes, useAppEventBus} from '../../bootstrap';
import {EntryPointPage, PageRegistrar} from '../../pages';
import {isAuthenticated} from '../../services';
import {getUnauthenticatedRoute} from '../../utils';

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
				const Renderer = page.renderer;
				return <Route path={page.route} element={<Renderer/>} key={page.code}/>;
			})}
			<Route path="/*" element={<EntryPointPage.renderer/>}/>
		</Routes>
		<RouteSwitcher/>
	</>;
};

