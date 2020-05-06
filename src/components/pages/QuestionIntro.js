import React from 'react';
import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

import ProgressBar from '../helpers/ProgressBar';

const QuestionIntro = ({ className, current }) => {
  return (
    <div className={className}>
      <p>
        <span>
          {current.index} of {current.total}
        </span>
      </p>
      <p>{current.question.title}</p>
      <div>
        <ProgressBar
          time={3}
          backgroundColor="transparent"
          foregroundColor="#ffffff"
          rounded
        />
      </div>
    </div>
  );
};

QuestionIntro.propTypes = {
  current: PropTypes.shape({
    question: PropTypes.shape({}),
    index: PropTypes.number,
    total: PropTypes.number,
  }),
};

QuestionIntro.defaultProps = {
  current: {
    question: {},
    index: 0,
    total: 0,
  },
};

const mapStateToProps = (state) => {
  return {
    current: state.core.websocket.current,
  };
};

const pulse = keyframes`
  0% {
    transform: scale(0)
  }

  50% {
    transform: scale(1.2)
  }

  100% {
    transform: scale(1)
  }
`;

export default styled(connect(mapStateToProps)(QuestionIntro))`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #eb7610;
  position: relative;

  > p:nth-child(1) {
    position: absolute;
    top: -20px;
    left: -20px;
    display: flex;
    justify-content: flex-end;
    padding: 1.5rem 2rem 0 0;
    align-items: center;
    width: 220px;
    height: 120px;
    transform: skew(-20deg) rotate(-10deg);
    background: #e24104;
  }

  > p:nth-child(1) > span {
    font-size: 40px;
    font-weight: 700;
    color: var(--color-white);
    transform: skew(20deg) rotate(10deg);
  }

  > p:nth-child(2) {
    background: var(--color-white);
    padding: 2rem;
    font-size: 36px;
    font-weight: 700;
    text-align: center;
    border-radius: 3px;
    animation: ${pulse} 1s forwards;
  }

  > div {
    position: absolute;
    left: 2rem;
    right: 2rem;
    bottom: 3rem;
  }
`;
