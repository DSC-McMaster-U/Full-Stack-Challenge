import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Chat from './Chat'
import SignUp from './Signup';
import { AuthProvider } from '../Contexts/Auth';
import PrivateRoute from './PrivateRoute';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div>
					<PrivateRoute exact path='/' component={Home} />
					<PrivateRoute exact path='/Chat/:chatID' component={Chat} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={SignUp} />
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;