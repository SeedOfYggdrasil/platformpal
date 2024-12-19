// ../frontend/src/pages/Home.jsx

import { useState } from 'react';
import logo from '../assets/logo.svg';
import { Box, Heading } from 'rebass';
import FileUpload from '@c/FileUpload.jsx';
import '@s/Home.css';
import '@s/logo.css';

function Home() {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="cs-container">
    	<Box p={4} bg="black" boxShadow="0 0 8px rgba(255, 0, 255, 0.3)">
 			<div className="cs-content">

			<div className="logo">
				<img 
				src={logo} 
				className={`logo ${isLoading ? 'loading' : ''}`}
				/>
          	</div> 

	 			<div className="title">
      				<Heading fontSize={5} mb={3} color="white">
         				PlatformPal
     	 			</Heading>
    			</div>

    			<div className="cs-card">
     				<FileUpload
     					apiEndpoint="/api/upload"
						setLoading={setIsLoading}
     				/>
    			</div>

			</div>
		</Box>
	</div>
  )
}

export default Home;
