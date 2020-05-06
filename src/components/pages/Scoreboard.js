import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

import { WebSocketContext } from '../providers/WebSocket';

import GameLayout from '../helpers/GameLayout';
import Button from '../helpers/Button';

const Scoreboard = ({ className, game, players }) => {
  const ws = useContext(WebSocketContext);

  const onClick = () => {
    if (ws.socket && game.pin) {
      ws.nextQuestion({ gamePin: game.pin });
    }
  };

  return (
    <GameLayout title="Scoreboard">
      <div className={className}>
        <header>
          <Button onClick={onClick}>Next</Button>
        </header>
        <main>
          <ul>
            {players.map((player) => (
              <li key={player.uuid}>
                <span>{player.username}</span>
                <span>{player.totalScore}</span>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </GameLayout>
  );
};

Scoreboard.propTypes = {
  game: PropTypes.shape({
    pin: PropTypes.string,
  }),
  players: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      username: PropTypes.string,
      totalScore: PropTypes.number,
    })
  ),
};

Scoreboard.defaultProps = {
  game: {
    pin: null,
  },
  players: [],
};

const mapStateToProps = (state) => {
  return {
    game: state.core.websocket.game,
    players: state.core.websocket.players,
  };
};

const slideIn = keyframes`
  from {
    opacity: 0;
    margin-top: 8rem;
  }

  to {
    opacity: 1;
    margin-top: 0;
  }
`;

export default styled(connect(mapStateToProps)(Scoreboard))`
  height: 100%;
  background: rgb(70, 23, 143);

  > header {
    padding: 2rem;
    display: flex;
    justify-content: flex-end;
  }

  > header > .button > span {
    font-size: 16px;
  }

  > main {
    width: 80%;
    margin: 2rem auto;
  }

  > main > ul {
    list-style: none;
  }

  > main > ul > li {
    display: block;
    padding: 1rem;
    margin-bottom: 1rem;
    background: var(--color-white);
    border-radius: 5px;
    display: flex;
    opacity: 0;
    justify-content: space-between;
    animation: ${slideIn} 1.5s forwards;
  }

  > main > ul > li span {
    font-size: 18px;
  }

  > main > ul > li span:nth-child(1) {
    font-weight: 500;
  }

  > main > ul > li span:nth-child(2) {
    font-weight: 700;
  }
`;
