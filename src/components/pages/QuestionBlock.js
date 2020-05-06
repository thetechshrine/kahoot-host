import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { connect } from 'react-redux';

import history from '../../helpers/history';

import GameLayout from '../helpers/GameLayout';
import Button from '../helpers/Button';
import ImageButton from '../helpers/ImageButton';

const QuestionBlock = ({ className, current, game, answersCount }) => {
  const [time, setTime] = useState(current.question.time);
  useEffect(() => {
    let interval;
    if (current.status === 'ended') {
      if (interval) clearInterval(interval);
    } else {
      interval = setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [current.status, time]);

  return (
    <GameLayout title={current.question.title}>
      <div className={className}>
        <main>
          <span>{time}</span>
          <img src={current.question.image || null} alt="" />
          <div>
            <Button
              variant="one"
              onClick={() => history.push(`/scoreboard?gameId=${game.uuid}`)}
            >
              Next
            </Button>
            <p>
              <span>{answersCount}</span>
              <span>Answers</span>
            </p>
            <ImageButton>End game</ImageButton>
          </div>
        </main>
        <footer>
          {current.question.answers
            .filter((answer) => !!answer.title)
            .map((answer) => (
              <div key={answer._id}>
                <span></span>
                <span>{answer.title}</span>
                <span
                  className={`material-icons ${
                    current.status === 'ended' && answer.isCorrect
                      ? 'visible'
                      : 'hidden'
                  }`}
                >
                  done
                </span>
              </div>
            ))}
        </footer>
      </div>
    </GameLayout>
  );
};

QuestionBlock.propTypes = {
  game: PropTypes.shape({
    uuid: PropTypes.string,
  }),
  current: PropTypes.shape({
    question: PropTypes.shape({
      answers: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    status: PropTypes.string,
  }),
  answersCount: PropTypes.number,
};

QuestionBlock.defaultProps = {
  game: {
    uuid: '',
  },
  current: {
    question: {
      answers: [],
    },
    status: '',
  },
  answersCount: 0,
};

const mapStateToProps = (state) => {
  return {
    game: state.core.websocket.game,
    current: state.core.websocket.current,
    answersCount: state.core.websocket.answersCount,
  };
};

export default styled(connect(mapStateToProps)(QuestionBlock))`
  display: grid;
  grid-template-rows: 4fr 3fr;
  background: var(--background-color);
  height: 100%;

  > main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

  > main > span {
    width: 6rem;
    height: 6rem;
    background: var(--color-one-overlay);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 40px;
    color: var(--color-white);
  }

  > main > img {
    display: block;
    max-width: 50%;
    max-height: 30rem;
  }

  > main > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  > main > div .button > span {
    font-size: 16px;
  }

  > main > div > p > span {
    display: block;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
  }

  > main > div > p > span:nth-child(1) {
    font-size: 32px;
  }

  > footer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.25rem;
    padding: 1rem;
  }

  > footer > div {
    display: flex;
    align-items: center;
    padding: 2.5rem 1rem;
    border-radius: 4px;
    position: relative;
  }

  > footer > div::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 3px;
    border-radius: 4px;
  }

  > footer > div > span {
    font-size: 24px;
    font-weight: 700;
    color: var(--color-white);
    margin-right: 1rem;
    z-index: 1;
  }

  > footer > div > span:nth-child(3) {
    font-size: 32px;

    &.hidden {
      display: none;
    }

    &.visible {
      display: inherit;
    }
  }

  > footer > div:nth-child(1) {
    background: var(--color-two-dark);
  }

  > footer > div:nth-child(1)::before {
    content: '';
    background: var(--color-two);
  }

  > footer > div:nth-child(1) > span:nth-child(1) {
    width: 0;
    height: 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 20px solid var(--color-white);
  }

  > footer > div:nth-child(2) {
    background: var(--color-one-dark);
  }

  > footer > div:nth-child(2)::before {
    content: '';
    background: var(--color-one);
  }

  > footer > div:nth-child(2) > span:nth-child(1) {
    width: 18px;
    height: 18px;
    background: var(--color-white);
    transform: rotate(45deg);
  }

  > footer > div:nth-child(3) {
    background: var(--color-three-dark);
  }

  > footer > div:nth-child(3)::before {
    content: '';
    background: var(--color-three);
  }

  > footer > div:nth-child(3) > span:nth-child(1) {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: var(--color-white);
  }

  > footer > div:nth-child(4) {
    background: var(--color-four-dark);
  }

  > footer > div:nth-child(4)::before {
    content: '';
    background: var(--color-four);
  }

  > footer > div:nth-child(4) > span:nth-child(1) {
    width: 20px;
    height: 20px;
    background: var(--color-white);
  }
`;
