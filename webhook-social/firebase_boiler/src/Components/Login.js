import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Container, Col, Row, Button, Card, Form } from 'react-bootstrap';
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
			<row></row>

			<Col></Col>
			<Col>
				<Card className='Card'>
					<Card.Body className='cardBody'>
						<Card.Header as='h4'>Log In</Card.Header>
						<Form onSubmit={handleLogin}>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control name='email' type='email' placeholder='Email' />

								<Form.Label>Password</Form.Label>
								<Form.Control name='password' type='password' placeholder='Password' />

								<Button type='submit'>Log in</Button>
							</Form.Group>
						</Form>
					</Card.Body>
				</Card>
				<Button onClick={gotoSignup}>or Click Here to Sign Up</Button>
			</Col>
			<Col></Col>

			<Row></Row>
		</Container>
	);
};

export default withRouter(Login);
