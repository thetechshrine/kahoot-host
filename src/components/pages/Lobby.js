import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components';
import queryString from 'query-string';
import { connect } from 'react-redux';

import { WebSocketContext } from '../providers/WebSocket';
import websocketActions from '../../store/actions/websocket';

const Lobby = ({ className, game, players, playGame }) => {
  const ws = useContext(WebSocketContext);
  useEffect(() => {
    const { gameId } = queryString.parse(window.location.search);
    playGame({ ws, gameUUID: gameId });
  }, [playGame, ws]);

  const onClick = () => {
    if (ws.socket && game.pin) {
      ws.startGame({ gamePin: game.pin });
    }
  };

  return (
    <div className={className}>
      <header>
        <p>
          Join at <span>localhost</span> with Game PIN : <span>{game.pin}</span>
        </p>
      </header>

      <section>
        <header>
          <p>
            <span>{players.length}</span>
            <span>Players</span>
          </p>
          <p>Kahoot</p>
          <button onClick={onClick}>Start</button>
        </header>

        <section>
          <ul>
            {players.map((player) => (
              <li key={player.uuid}>{player.username}</li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
};

const pulse = keyframes`
  0% {
    transform: scale(0)
  }

  50% {
    transform: scale(1.4);
  }

  100% {
    transform: scale(1);
  }
`;

Lobby.propTypes = {
  game: PropTypes.shape({
    pin: PropTypes.string,
  }),
  playGame: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
    })
  ),
};

Lobby.defaultProps = {
  game: {},
  players: [],
};

const mapStateToProps = (state) => {
  return {
    game: state.core.websocket.game,
    players: state.core.websocket.players,
  };
};

const actions = {
  playGame: websocketActions.playGame,
};

export default styled(connect(mapStateToProps, actions)(Lobby))`
  flex: 1;
  background-color: rgb(242, 211, 51);
  > header {
    background: rgb(243, 215, 72);
    padding: 2rem;
    display: flex;
    justify-content: center;
    position: relative;
    > p {
      background: #ffffff;
      font-size: 32px;
      padding: 1rem 2rem;
      position: relative;
    }
    > p::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      background: #e1e1e1;
    }
    > p > span {
      font-weight: 700;
    }
    > p > span:nth-child(1) {
      font-size: 32px;
    }
    > p > span:nth-child(2) {
      display: block;
      font-size: 56px;
    }
  }
  > header::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background: rgb(207, 183, 61);
  }
  > section {
    padding: 2rem;
    > header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ffffff;
      > p:nth-child(1) > span {
        display: block;
        font-weight: 700;
        text-align: center;
      }
      > p:nth-child(1) > span:nth-child(1) {
        font-size: 32px;
      }
      > p:nth-child(1) > span:nth-child(2) {
        font-size: 24px;
      }
      > p:nth-child(2) {
        font-weight: 700;
        font-size: 56px;
        font-style: italic;
      }
      > button {
        display: inline-block;
        border: none;
        border-radius: 3px;
        padding: 12px 18px;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        color: var(--color-white);
        background: rgb(204, 204, 204);
        transition: all var(--button-animation-duration) ease-out;
      }
      > button:hover {
        background: rgb(208, 208, 208);
      }
    }
    > section {
      padding: 4rem 0;
      width: 90%;
      margin: 0 auto;
    }
    > section ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    > section ul li {
      text-align: center;
      color: var(--color-white);
      font-size: 28px;
      font-weight: 600;
      animation: ${pulse} 800ms forwards;
    }
  }
`;
