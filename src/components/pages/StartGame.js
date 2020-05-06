import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { connect } from 'react-redux';

import GameLayout from '../helpers/GameLayout';
import ProgressBar from '../helpers/ProgressBar';

const StartGame = ({ className, game }) => {
  return (
    <GameLayout title="Soccer">
      <div className={className}>
        <ProgressBar time={4} />
        <div>
          <div>
            <p>{game.questions.length} Questions</p>
            <p>Are you ready ?</p>
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

StartGame.propTypes = {
  game: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

StartGame.defaultProps = {
  game: {
    questions: [],
  },
};

const mapStateToProps = (state) => {
  return {
    game: state.core.websocket.game,
  };
};

export default styled(connect(mapStateToProps)(StartGame))`
  display: flex;
  flex-direction: column;
  height: 100%;

  > div:nth-child(2) {
    flex: 1;
    background: #444444;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
  }

  > div:nth-child(2) > div {
    background: var(--color-white);
    padding: 1rem;
    border-radius: 2px;
    position: relative;
  }

  > div:nth-child(2) > div::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: #e1e1e1;
  }

  > div:nth-child(2) > div > p:nth-child(1) {
    font-weight: 700;
    font-size: 24px;
    text-align: center;
  }

  > div:nth-child(2) > div > p:nth-child(2) {
    font-weight: 700;
    font-size: 36px;
    text-align: center;
  }
`;
