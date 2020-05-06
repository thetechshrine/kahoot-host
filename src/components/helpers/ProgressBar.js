import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProgressBar = ({ className, time }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const end = start + time * 1000 + 500;

    let interval;
    const updateProgress = (end) => {
      interval = setInterval(() => {
        if (Date.now() <= end) {
          setProgress(Math.round(((Date.now() - start) * 100) / (end - start)));
        } else {
          clearInterval(interval);
        }
      }, 10);
    };

    setTimeout(() => {
      updateProgress(end);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return (
    <div className={className}>
      <div style={{ width: `${progress}%` }}></div>
    </div>
  );
};

const StyledComponent = styled(ProgressBar)`
  width: 100%;
  height: 1.2rem;
  background: ${(props) => props.backgroundColor};
  border-radius: ${(props) => (props.rounded ? '24px' : '0px')};

  > div {
    height: 100%;
    background: ${(props) => props.foregroundColor};
    transition: all 1ms ease-out;
    border-radius: ${(props) => (props.rounded ? '24px' : '0px')};
  }
`;

StyledComponent.propTypes = {
  rounded: PropTypes.bool,
  time: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  foregroundColor: PropTypes.string,
};

StyledComponent.defaultProps = {
  rounded: false,
  backgroundColor: '#cccccc',
  foregroundColor: '#7233b2',
};

export default StyledComponent;
