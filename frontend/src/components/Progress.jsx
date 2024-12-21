// frontend/src/components/Progress.jsx

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import '@s/Progress.css';

const Progress = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const socketURL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

  useEffect(() => {
    const socket = io(socketURL);

    socket.on('processingProgress', ({ progress }) => setProgress(progress));
    socket.on('processingComplete', () => setProgress(100));

    return () => {
      socket.off('processingProgress');
      socket.off('processingComplete');
      socket.disconnect();
    };
  }, [socketURL]);

  return (
    <div className="progress">
      {isLoading && <p className="progress-text">{progress}%</p>}
    </div>
  );
};

export default Progress;
