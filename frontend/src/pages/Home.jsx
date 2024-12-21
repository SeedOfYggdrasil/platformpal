''// frontend/src/pages/Home.jsx

import { useState } from 'react';
import logo from '../assets/logo.svg';
import FileUpload from '@c/FileUpload.jsx';
import Progress from '@c/Progress.jsx';
import '@s/Home.css';
import '@s/logo.css';

function Home() {
  const [isLoading, setLoading] = useState(false);

  return (
    <div className="cs-container">
        <div className="cs-content">
          <div className="logo">
            <img
              src={logo}
              className={`logo ${isLoading ? 'loading' : ''}`}
              alt="Logo"
            />
          </div>
          <div className="title">
            <h2>
              PlatformPal
            </h2>
          </div>
          <div className="cs-card">
            <Progress isLoading={isLoading} />
            <FileUpload apiEndpoint="/api/upload" setLoading={setLoading} />
          </div>
      </div>
    </div>
  );
}

export default Home;
