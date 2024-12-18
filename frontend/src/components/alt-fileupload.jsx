import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import ProgressDisplay from './ProgressDisplay';

const socket = io('http://localhost:5000'); // Socket.IO server URL

const FileUpload = ({ apiEndpoint }) => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Listen for progress updates
    socket.on('processingProgress', ({ progress }) => {
      setProgress(progress);
    });

    socket.on('processingComplete', ({ message }) => {
      setLoading(false);
      setUploadStatus(message);
      setProgress(100);
    });

    return () => {
      socket.off('processingProgress');
      socket.off('processingComplete');
    };
  }, []);

  const handleButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files.length) {
      setUploadStatus('No files selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      setLoading(true);
      setUploadStatus('');
      setProgress(0);

      await axios.post(apiEndpoint, formData, {
        headers: { 'socket-id': socket.id },
      });
    } catch (error) {
      setUploadStatus(`Upload Failed: ${error.response?.data?.error || error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="file-upload">
      <button onClick={handleButtonClick} className="uploadButton">
        Upload File
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <ProgressDisplay progress={progress} loading={loading} />

      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

FileUpload.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
};

export default FileUpload;
