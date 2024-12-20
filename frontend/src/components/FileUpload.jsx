// ../frontend/src/components/FileUpload.jsx

import { useRef, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const FileUpload = ({ apiEndpoint }) => {
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files.length) {
      setUploadStatus('No files selected.');
      return;
    }
  
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('imgFiles', file)); // Key: imgFiles
  
    try {
      setUploadStatus('Uploading...');
      const response = await axios.post(apiEndpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus(`Upload Successful: ${response.data.message}`);
    } catch (error) {
      setUploadStatus(`Upload Failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="file-upload">
    
      <button onClick={handleButtonClick} className="uploadButton">
        Upload Files
      </button>
      
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      <div className="uploadOutput">
    	{uploadStatus && <p>{uploadStatus}</p>}
	  </div>
	  
	</div>
  );
};

FileUpload.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
};

export default FileUpload;
