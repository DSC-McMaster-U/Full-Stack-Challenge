import React, { useState, useEffect, useRef } from 'react';
import app from '../firebase';
import { Container, Col, Row, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/*The following code is commented out due to the requirement of rewiring webpack. In create-react-app projects, we
cannot used module exports from outside the src folder.  For now we will hardware the socket connections to port 4000.
However, if you wish to deploy a build of this application later on, it may be mandatory that the process.env port be used,
especially on pipeline deployments. */

//const server = require('../../../server/server');
//var PORT = server.PORT;
//const socket = io.connect(`http://localhost:${PORT}`);

//const socket = io.connect('http://localhost:4000'); //if using the lines above, remove this hardcoded connection

const Home = () => {
	const [roomName, setRoomName] = React.useState('');

	const handleRoomNameChange = (event) => {
		setRoomName(event.target.value);
	};
	return (
		<>
			<Col>
				<Button onClick={() => app.auth().signOut()}>Sign out</Button>
			</Col>
			<Container>
				<Col>
					<Card className='Card'>
						<Card.Body className='cardBody'>
							<Form>
								<Form.Control type='text' placeholder='Room' value={roomName} onChange={handleRoomNameChange} className='text-input-field' />

								<Link to={`/${roomName}`} className='enter-room-button'>
									<Button>Go to Room</Button>
								</Link>
							</Form>
						</Card.Body>
					</Card>
				</Col>
				<Col></Col>
			</Container>
		</>
	);
};

export default Home;
