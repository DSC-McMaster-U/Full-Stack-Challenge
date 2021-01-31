import './App.css'
import axios from 'axios'
import React, {useState} from 'react'
import {Container, FormControl, Button} from 'react-bootstrap'
import ImageCard from './ImageCard'

export default function App() {
	
	const [url, setUrl] = useState('http://google.com')
	const [loading, setLoading] = useState(false)
	
	const [screenshotURL, setScreenshotURl] = useState('')
	
	async function submit(){
		setLoading(true)
		try{
			const result = await axios.post('http://localhost:5000/api/screenshot', {
				url: url
			})
			
			console.log(result)
			setScreenshotURl(result.data.url)
		}catch(err){
			console.error(err)
		}
		setLoading(false)
	}
	
	return (
		<div className="App">
			
			<Container>
				<div className="topBar">
					
					<FormControl 
						className='urlBar' 
						placeholder='Enter a URL'
						value={url} 
						onChange={e=>setUrl(e.target.value)}
					/>
					
					<div className="submitHolder flexCenter">
						<Button className='submitButton' onClick={submit}>Submit</Button>
					</div>
				</div>
				
				<ImageCard url = {screenshotURL} loading={loading}/>
					
			</Container>
			
		</div>
	)
}


