import React, { useEffect, useState, useContext} from 'react';
import { Form, Button } from 'react-bootstrap';
import './Chat.css'
import firebase from 'firebase'
import { AuthContext } from '../Contexts/Auth'
import MessageBubble from './MessageBubble';


const ChatRoom = ({match, history}) => {
	
	const [messages, setMessages] = useState([])
	const [chatData, setChatData] = useState({})
	const [text, setText] = useState('')
	
	const {currentUser} = useContext(AuthContext)
	
	useEffect(()=>{
		
		//get the actual chat data
		firebase.firestore().doc('Conversations/' + match.params.chatID).get().then(doc=>{
			if (!doc.exists) {
				history.push('/')
			}

			const chatItem = { ...doc.data(), id: doc.id }

			const members = Object.values(chatItem.members)

			if (members[0] === currentUser.email) {
				chatItem.name = members[1]
			} else {
				chatItem.name = members[0]
			}
			
			setChatData(chatItem)
		})
		
		//Get the list of messages
		const unsub = firebase.firestore().collection('Conversations/' + match.params.chatID + '/Messages')
		.orderBy('date', 'asc')
		.onSnapshot(col=>{
			const newMessages = []
			
			col.forEach(doc=>{
				const msg = {...doc.data(), id: doc.id}
				
				if(msg.from === currentUser.email){
					msg.className = 'mine'
				}else{
					msg.className = 'theirs'
				}
				
				newMessages.push(msg)
			})
			
			setMessages(newMessages)
		})
		
		return unsub
		
	},[])
	
	//send
	async function sendMessage(){
		if(!text.trim()){
			return
		}
		
		await firebase.firestore().collection('Conversations/' + match.params.chatID + '/Messages').add({
			from: currentUser.email, 
			body: text,
			date: firebase.firestore.FieldValue.serverTimestamp()
		})
		
		setText('')
	}
	
	return (
		<div className='Chat'>
			<div className="chatBody">
				
				<div className="messages">
					
					<div className="chatHeader">
						<h1>{chatData.name}</h1>
					</div>
					
					{messages.map(m=>{
						return <MessageBubble message={m} key={m.id}/>
					})}
				</div>
				
				<div className="chatControls">
					<Form>
						<Form.Control value={text} onChange={e => setText(e.target.value)} />
						<Button className='sendButton' onClick={sendMessage}>Send</Button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default ChatRoom;
