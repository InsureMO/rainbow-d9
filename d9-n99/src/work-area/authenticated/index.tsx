import {Navigate, Route, Routes} from 'react-router-dom';
import {isAuthenticated} from '../../services';
import {getUnauthenticatedRoute} from '../../utils';
import {Home} from '../home';

export const Authenticated = () => {
	if (!isAuthenticated()) {
		return <Navigate to={getUnauthenticatedRoute()} replace={true}/>;
	}

	return <Routes>
		<Route path="/*" element={<Home/>}/>
	</Routes>;
};
