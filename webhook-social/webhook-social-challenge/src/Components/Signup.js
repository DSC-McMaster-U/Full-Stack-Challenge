import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import { Container, Col, Row, Button, Card, Form } from 'react-bootstrap';
import app from '../firebase';
import './index.css';

const SignUp = ({ history }) => {
	const handleSignUp = useCallback(
		async (event) => {
			event.preventDefault(); // dont reload page
			const { email, password, username } = event.target.elements; // get information from forms
			try {
				await app.auth().createUserWithEmailAndPassword(email.value, password.value); // firebase API
				await app.auth().signInWithEmailAndPassword(email.value, password.value)
				await app.auth().updateCurrentUser({displayName:username.value})
				history.push('/');
			} catch (error) {
				alert(error); // if wrong alert error
			}
		},
		[history]
	);

	const gotoLogin = () => {
		history.push('/login');
	};

	return (
		<Container>

			<Col></Col>
			<Col>
				<Card className='Card shadow rounded'>
					<Card.Body className='cardBody'>
						<Card.Title as='h4'>Sign Up</Card.Title>
						<Form onSubmit={handleSignUp}>
							<Form.Group>
								<Form.Label className='label'>Username</Form.Label>
								<Form.Control name='username' type='text' placeholder='Username' />
								
								<Form.Label className='label'>Email</Form.Label>
								<Form.Control name='email' type='email' placeholder='Email' />

								<Form.Label className='label'>Password</Form.Label>
								<Form.Control name='password' type='password' placeholder='Password' />

								<Button className='button' type='submit'>
									Sign Up
								</Button>
							</Form.Group>
						</Form>
					</Card.Body>
				</Card>
				<Button className='button shadow rounded' onClick={gotoLogin}>
					or Click Here to Log In
				</Button>
			</Col>
			<Col></Col>

			<Row></Row>
		</Container>
	);
};

export default withRouter(SignUp);
