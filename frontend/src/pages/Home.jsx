import { } from 'react';
import logo from '../assets/logo.svg';
import { Box, Heading, Text, Button } from 'rebass';
import '@s/App.css';

function Home() {

  return (
    <>
    <div className="container">
    <Box p={4} bg="black" boxShadow="0 0 8px rgba(255, 0, 255, 0.3)">
<div className="content">
      <img src={logo} className="logo" />
      <Heading fontSize={5} mb={3} color="white">
         MetaMockup
      </Heading>
</div>

      <div className="card">
        <Button variant="Secondary" bg="rgba(0,150,200,0.8)" color="white">
          Upload
        </Button>
      </div>

      </Box>

    </div>
    </>
  )
}

export default Home;
