// frontend/src/components/FileUpload.jsx

import { useRef, useState } from 'react';
import axios from 'axios';
import '@s/FileUpload.css';

const FileUpload = ({ apiEndpoint, setLoading }) => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files.length) {
      setStatus('');
      setError('No files selected');
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('imgFiles', file));

    try {
      setLoading(true);
      setStatus('Uploading...');
      setError('');
      const response = await axios.post(apiEndpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setStatus(`Upload progress: ${progress}%`);
        },
      });
      setStatus(response.data.message);
    } catch (err) {
      setError(`Error: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload">
      {status && <p className="status">{status}</p>}
      {error && <p className="error">{error}</p>}
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
    </div>
  );
};

export default FileUpload;
