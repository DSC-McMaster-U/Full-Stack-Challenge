import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Chat.css'


const ChatRoom = () => {
	
	const [messages, setMessages] = useState([])
	const [chatData, setChatData] = useState({name:'Youssof'})
	const [text, setText] = useState('')
	
	return (
		<div className='Chat'>
			<div className="chatBody">
				
				<div className="messages">
					
					<div className="chatHeader">
						<h1>{chatData.name}</h1>
					</div>
					
					{messages.map(m=>{
						return <div className="message">
							{m.body}
						</div>
					})}
				</div>
				
				<div className="chatControls">
					<Form>
						<Form.Control value={text} onChange={e => setText(e.target.value)} />
						<Button className='sendButton'>Send</Button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default ChatRoom;
