import React from 'react'
import './MessageBubble.css'

export default function MessageBubble({message}) {
	return (
		<div className={"MessageBubble " + message.className} >
			<div className="messageBody">
				<div className="dateBox">
					{message.date?.toDate().toISOString()}
				</div>
				{message.body}
				
			</div>
		</div>
	)
}
