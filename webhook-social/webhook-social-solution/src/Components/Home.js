import React, { useState, useEffect, useContext } from 'react';
import app from '../firebase';
import { Container, Col, Row, Button, Card, Form } from 'react-bootstrap';
import './Home.css'
import {AuthContext} from '../Contexts/Auth'
import firebase from 'firebase'
import ChatLinkButton from './ChatLinkButton'


const Home = ({history}) => {

	const [chats, setChats] = useState([])
	const [text, setText] = useState('')
	
	const {currentUser} =useContext(AuthContext)
	
	async function createChat(){
		try{
			const result = await firebase.functions().httpsCallable('createChat')({
				email: text
			})
			console.log(result)
			
			history.push('/Chat/' + result.data.body.id)
		}catch(err){
			console.error(err)
		}
		
	}
	
	//get chat list
	useEffect(()=>{

		const unsub = firebase.firestore().collection('Conversations')
		.where(`members.${currentUser.uid}`, '!=', null)
		.onSnapshot(col => {
			const newChatList = []
			
			col.forEach(doc => {
				const chatItem = { ...doc.data(), id: doc.id }
				
				const members = Object.values(chatItem.members)
				
				if(members[0] === currentUser.email){
					chatItem.name = members[1]
				}else{
					chatItem.name = members[0]
				}
				
				newChatList.push(chatItem)
			})
			
			setChats(newChatList)
			
			return unsub
		})

	},[])
	
	return (
		<div className="Home">
			
			<div className="chatList">
				<div className="chatListHeader">
					<h1>Chats</h1>
					<Col>
						<Form.Control className='bigButton' value={text} onChange={(e)=>setText(e.target.value)}/>
						<Button className='bigButton' onClick={createChat}>Create Chat</Button>
					</Col>
				</div>
				
				<div className="chatLinks">
					{chats.map(c=>{
						return <ChatLinkButton chat={c} key={c.id}/>
					})}
				</div>
				
				<Button className='bigButton' onClick={() => app.auth().signOut()}>Sign out - {currentUser.email}</Button>
				
				
			</div>
		</div>
	);
};

export default Home;
