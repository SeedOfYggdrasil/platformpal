import { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const FileUpload = () => {
  const [preview, setPreview] = useState('');
  const [messages, setMessages] = useState('');
  const [notImage, setNotImage] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target.result);
      reader.readAsDataURL(file);
      setNotImage(false);
      setMessages(`File "${file.name}" selected.`);
    } else {
      setPreview('');
      setNotImage(true);
      setMessages('Please select a valid image file.');
    }
  };

  return (
    <div>
      <h2>PlatformPal</h2>
      <p className="lead"Show the world what you got.<b>Everywhere you got it.</b></p>

      <form id="file-upload-form" className="uploader">
        <input
          id="file-upload"
          type="file"
          name="fileUpload"
          accept="image/*"
          onChange={handleFileChange}
        />

        <label htmlFor="file-upload" id="file-drag">
          {preview ? (
            <img id="file-image" src={preview} alt="Preview" />
          ) : (
            <div id="start">
              <i className="fa fa-download" aria-hidden="true"></i>
              <div>Select a file or drag here</div>
              {notImage && <div id="notimage">Please select an image</div>}
              <span id="file-upload-btn" className="btn btn-primary">
                Select File(s) to Upload (max: 10)
              </span>
            </div>
          )}
          <div id="response" className={preview ? '' : 'hidden'}>
            <div id="messages">{messages}</div>
            <progress className="progress" id="file-progress" value={progress}>
              <span>{progress}</span>%
            </progress>
          </div>
        </label>
      </form>
    </div>
  );
};

FileUpload.propTypes = {};

export default FileUpload;
