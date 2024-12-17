// ../frontend/src/pages/Home.jsx

import { } from 'react';
import logo from '../assets/logo.svg';
import { Box, Heading } from 'rebass';
import FileUpload from '@c/FileUpload.jsx';
import '@s/Home.css';

function Home() {

  return (
    <div className="cs-container">
    	<Box p={4} bg="black" boxShadow="0 0 8px rgba(255, 0, 255, 0.3)">
 			<div className="cs-content">

				<div className="logo">
      				<img src={logo} className="logo" />
				</div> 

	 			<div className="title">
      				<Heading fontSize={5} mb={3} color="white">
         				PlatformPal
     	 			</Heading>
    			</div>

    			<div className="card">
     				<FileUpload
     					apiEndpoint="/api/upload" 
     				/>
    			</div>

			</div>
		</Box>
	</div>
  )
}

export default Home;
