import React from 'react'
import {Loading} from 'touchpoint-ui'
import { Card } from 'react-bootstrap'

export default function ImageCard(props) {
	
	if(props.loading){
		return <div className='flexCenter' style={{padding: '50px'}}>
			<Loading />
		</div>
	}
	
	if(!props.url){
		return null
	}
	
	return (
		<Card className='mainCard flexCenter'>
			<Card.Body>
				<img src={props.url}/>
			</Card.Body>
		</Card>
	)
}