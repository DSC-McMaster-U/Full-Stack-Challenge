import React, { useState, useEffect, useRef } from 'react';
import app from '../firebase';
import { Container, Col, Row, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css'


const Home = () => {

	const [chats, setChats] = useState([])
	
	return (
		<div className="Home">
			
			<div className="chatList">
				<div className="chatListHeader">
					<h1>Chats</h1>
					<Col>
						<Button className='bigButton' onClick={() => app.auth().signOut()}>Sign out</Button>
					</Col>
				</div>
				
				<div className="chatLinks">
					
				</div>
				
				
				
			</div>
		</div>
	);
};

export default Home;
