import React from 'react';
import { Form, Button } from 'react-bootstrap';

/*The following code is commented out due to the requirement of rewiring webpack. In create-react-app projects, we
cannot used module exports from outside the src folder.  For now we will hardware the socket connections to port 4000.
However, if you wish to deploy a build of this application later on, it may be mandatory that the process.env port be used,
especially on pipeline deployments. */

//const server = require('../../../server/server');
//var PORT = server.PORT;
//const socket = io.connect(`http://localhost:${PORT}`);

//const socket = io.connect('http://localhost:4000'); //if using the lines above, remove this hardcoded connection

const ChatRoom = () => {
	return (
		<>
			<Form>
				<Form.Control> </Form.Control>
				<Button></Button>
			</Form>
		</>
	);
};

export default ChatRoom;
