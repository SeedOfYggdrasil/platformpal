// ../frontend/src/components/FileUpload.jsx

import { useRef, useState } from 'react';
import axios from 'axios';
import Progress from './Progress.jsx';
import '@s/FileUpload.css';
import '@s/Progress.css';

const FileUpload = ({ apiEndpoint, setLoading }) => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [buttonText, setButtonText] = useState('Upload Files')
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files.length) {
      setStatus('Upload Files');
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('imgFiles', file));

    try {
      setLoading(true);
      setProgress(0);
      setButtonText('Uploading...')

     const response = await axios.post(apiEndpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

        socket.emit('processingProgress', { progress });
      },
    });

      setStatus(`${response.data.message}`);
    } catch (error) {
      setError(`Error: ${error.response?.data?.error || error.message}`);
    }
    setLoading(false);
  };

  return (

    <div className="file-upload">

      <Progress loading={isLoading} />

      <div className="status">
        {status && <p>{status}</p>}
        {error && <p>{error}</p>}
      </div>

      <button onClick={handleButtonClick} className="uploadButton">
        {buttonText}
      </button>

      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <div className="error">
        
      </div>

    </div>

  );
};

export default FileUpload;
