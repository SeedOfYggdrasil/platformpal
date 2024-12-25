// @p/LandingPage

import { } from "react";
import NavMenu from '@c/NavMenu';

const LandingPage = () => {
	return (
		<>
			<NavMenu />			

			<section className="hero">
				
				<h1>PLATFORM.PAL</h1>
			</section>
			
			<section className="content">
					<h3>SOCIAL MEDIA ASSETS BUNDLER</h3>
					<p>Automatically resize up to 10 images at once to comply with platform standards.</p>

		            <FileUpload apiEndpoint="/api/upload" setLoading={setLoading} />
					<Progress isLoading={isLoading} /> 
			</section>
			
			<footer>
				<p>© 2024 Alex Pariah -  All rights reserved.</p>
			</footer>
		</>
	);
};
	
export default LandingPage;	
