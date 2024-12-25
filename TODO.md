# PLATFORMPAL
## DEVELOPMENT ROADMAP & TO-DO LIST

### Current Goal
Build and deploy a functional web-application prototype that satisfies eachl of the following requirements:
	- publicly accessible domain
	- allows users to upload up to 10 image files for re-sizing
	- re-sizes each image to meet the specifications of various platforms, saving each variant as a unique image file
	- organizes the newly created image files into subdirectories of a root directory, categorized by platform
	- compresses and archives the root directory into a single file for user download
	- caches images for reprocessing for 24 hours before purging them from the server
	- expresses the backend processing visually as part of the UI, using aesthetically appealing styles, fonts, media, animations
	
### Recent

- Current:
	Modifying /home/dev/.userenv/.user ; invalid identifier error	

1. User can select up to 10 image files to upload
2. The selected files are successfully uploaded to the backend server
3. Logo animates during processing
4. Processing is simulated by a series of outputs seperated by pauses of various lengths
5. Displays realtime progress updates

### To-do List

#### Frontend
	1. Apply fixes and improvements to the GUI for a consistent, good-looking user experience
	2. Replace React logo placeholder with the application's logo
	3. Include a background image or video
	4. Select and implement easy-to-read, visually appealing fontfaces
	5. Apply colors and thematic elements aligned with the app's branding and overall vision

### BACKEND
	1. Once files are uploaded, prepare them for processing by the ImageMagick API
	2. Packages files into a POST request sent to ImageMagick using axios
	3. Access ImageMagick with via remote service or by running it locally on the server
