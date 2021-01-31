import './App.css'
import React from 'react'
import {Container, FormControl, Button} from 'react-bootstrap'

export default function App() {
	
	return (
		<div className="App">
			
			<Container>
				<div className="topBar">
					
					<FormControl 
						className='urlBar' 
						placeholder='Enter a URL'
					/>
					
					<div className="submitHolder flexCenter">
						<Button className='submitButton'>Submit</Button>
					</div>
				</div>
					
			</Container>
			
		</div>
	)
}