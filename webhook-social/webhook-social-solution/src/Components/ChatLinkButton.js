import React from 'react'
import { Link } from 'react-router-dom';
import './ChatLinkButton.css'
import {Card} from 'react-bootstrap'

export default function ChatLinkButton({chat}) {
	return (
		<Link to={'/Chat/' + chat.id}>
			<Card className='ChatLinkButton'>
				{chat.name}
			</Card>
			
		</Link>
	)
}
