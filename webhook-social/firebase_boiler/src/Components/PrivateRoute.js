import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../Contexts/Auth';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
	// What component should we render after authenticated, passing in rest of props
	const { currentUser } = useContext(AuthContext);
	return (
		<Route
			{...rest} // pass rest of props to render
			render={(routeProps) =>
				!!currentUser ? (
					<RouteComponent {...routeProps} /> // if user is good, render route component
				) : (
					<Redirect to={'/login'} /> // if not, render login again
				)
			}
		/>
	);
};

export default PrivateRoute;
