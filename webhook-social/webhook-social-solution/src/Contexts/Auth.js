import React, { useEffect, useState } from 'react';
import app from '../firebase';

// Generating context is allowing the spread of auth info throughout components

export const AuthContext = React.createContext(); // Create context

export const AuthProvider = ({ children }) => {
	// This stores the auth details,
	const [currentUser, setCurrentUser] = useState(null); // Hold current user
	const [pending, setPending] = useState(true);

	useEffect(() => {
		app.auth().onAuthStateChanged((user) => {
			// Sign up for changes
			setCurrentUser(user);
			setPending(false);
		});
	}, []);

	if (pending) {
		return <>Loading...</>;
	}

	return (
		<AuthContext.Provider //Wrap everything in this component, giving all componenets access to the auth provider data
			value={{
				currentUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
