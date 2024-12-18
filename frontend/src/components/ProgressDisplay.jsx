import PropTypes from 'prop-types';
import '@s/ProgressDisplay.css';

const ProgressDisplay = ({ progress, loading }) => {
  return (
    <div className="progress-display">
      {loading && <p className="progress-text">Processing... {progress}%</p>}
    </div>
  );
};

ProgressDisplay.propTypes = {
  progress: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ProgressDisplay;
