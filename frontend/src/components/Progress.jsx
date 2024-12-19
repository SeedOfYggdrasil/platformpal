import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import '@s/Progress.css';

const socket = io('http://localhost:5000');

const Progress = ({ loading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    socket.on('processingProgress', ({ progress }) => {
      console.log('Socket connected');
      setProgress(progress);
    });

    socket.on('processingComplete', () => {
      setProgress(100);
    });

    return () => {
      socket.off('processingProgress');
      socket.off('processingComplete');
    };
  }, []);

  return (
    <div className="progress">
      {loading && <p className="progress-text">{progress}%</p>}
    </div>
  );
};

export default Progress;