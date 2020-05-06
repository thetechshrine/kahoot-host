import React, { createContext } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';

import { WS_BASE } from '../../api/websocket-client';
import history from '../../helpers/history';
import webSocketActions from '../../store/actions/websocket';

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  let socket;
  let ws;
  const dispatch = useDispatch();

  const playGame = ({ gamePin }) => {
    socket.emit('game-play', { gamePin });
  };

  const startGame = ({ gamePin }) => {
    socket.emit('game-start', { gamePin });
  };

  const endGame = ({ gamePin }) => {};

  const nextQuestion = ({ gamePin }) => {
    socket.emit('question-next', { gamePin });
  };

  const mapToCurrent = ({ currentQuestion, currentIndex, totalCount }) => ({
    question: currentQuestion,
    index: currentIndex,
    total: totalCount,
  });

  if (!socket) {
    socket = io.connect(WS_BASE, { transports: ['websocket'] });
    socket.on('connect', () => {
      socket.on('game-start', ({ game }) => {
        history.push(`/game-start?gameId=${game._id}`);
      });

      socket.on('question-intro', ({ data }) => {
        dispatch(
          webSocketActions.questionIntro({
            current: mapToCurrent(data),
          })
        );
      });

      socket.on('question-start', ({ data }) => {
        dispatch(
          webSocketActions.questionStart({
            current: mapToCurrent(data),
          })
        );
      });

      socket.on('question-end', ({ data }) => {
        dispatch(
          webSocketActions.questionEnd({
            current: mapToCurrent(data),
          })
        );
      });

      socket.on('player-list', ({ players }) => {
        dispatch(webSocketActions.updatePlayersList({ players }));
      });

      socket.on('game-end', () => {
        dispatch(webSocketActions.gameOver());
      });
    });

    ws = {
      socket,
      playGame,
      startGame,
      endGame,
      nextQuestion,
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
