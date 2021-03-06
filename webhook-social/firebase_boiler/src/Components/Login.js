import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Container, Col, Button, Card, Form } from 'react-bootstrap';
import app from '../firebase';
import { AuthContext } from '../Contexts/Auth';
import './index.css';

const Login = ({ history }) => {
	const handleLogin = useCallback(
		async (event) => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await app.auth().signInWithEmailAndPassword(email.value, password.value);
				history.push('/');
			} catch (error) {
				alert(error);
			}
		},
		[history]
	);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to='/' />;
	}

	const gotoSignup = () => {
		history.push('/signup');
	};

	return (
		<Container>
			<Col></Col>
			<Col>
				<Card className='Card shadow rounded'>
					<Card.Body className='cardBody'>
						<Card.Title as='h4'>Log In</Card.Title>
						<Form onSubmit={handleLogin}>
							<Form.Group>
								<Form.Label className='label'>Email</Form.Label>
								<Form.Control name='email' type='email' placeholder='Email' />

								<Form.Label className='label'>Password</Form.Label>
								<Form.Control name='password' type='password' placeholder='Password' />

								<Button className='button' type='submit'>
									Log in
								</Button>
							</Form.Group>
						</Form>
					</Card.Body>
				</Card>
				<Button className='button shadow rounded' onClick={gotoSignup}>
					or Click Here to Sign Up
				</Button>
			</Col>
			<Col></Col>
		</Container>
	);
};

export default withRouter(Login);
