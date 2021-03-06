import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import { Container, Col, Row, Button, Card, Form } from 'react-bootstrap';
import app from '../firebase';
import './index.css';

const SignUp = ({ history }) => {
	const handleSignUp = useCallback(
		async (event) => {
			event.preventDefault(); // dont reload page
			const { email, password } = event.target.elements; // get information from forms
			try {
				await app.auth().createUserWithEmailAndPassword(email.value, password.value); // firebase API
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
		<Container history={history}>
			<row></row>

			<Col></Col>
			<Col>
				<Card className='Card'>
					<Card.Body className='cardBody'>
						<Card.Header as='h4'>Sign Up</Card.Header>
						<Form onSubmit={handleSignUp}>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control name='email' type='email' placeholder='Email' />

								<Form.Label>Password</Form.Label>
								<Form.Control name='password' type='password' placeholder='Password' />

								<Button type='submit'>Sign Up</Button>
							</Form.Group>
						</Form>
					</Card.Body>
				</Card>
				<Button onClick={gotoLogin}>or Click Here to Log In</Button>
			</Col>
			<Col></Col>

			<Row></Row>
		</Container>
	);
};

export default withRouter(SignUp);
