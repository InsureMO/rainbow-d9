import {Fragment, useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {AppEventTypes, useAppEventBus} from '../../bootstrap';
import {isAuthenticated} from '../../services';
import {getUnauthenticatedRoute} from '../../utils';
import {Home} from '../home';

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

export const Authenticated = () => {
	if (!isAuthenticated()) {
		return <Navigate to={getUnauthenticatedRoute()} replace={true}/>;
	}

	return <>
		<AuthenticationChangeHandler/>
		<Routes>
			<Route path="/*" element={<Home/>}/>
		</Routes>
	</>;
};

