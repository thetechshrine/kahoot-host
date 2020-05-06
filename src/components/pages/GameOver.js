import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

import Button from '../helpers/Button';

const GameOver = ({ className, game, players }) => {
  const [topPlayers, setTopPlayers] = useState([]);
  useEffect(() => {
    if (players.length > 0) {
      setTopPlayers(players.slice(0, 3));
    }
  }, [players]);

  return (
    <div className={className}>
      <header>
        <p>{game.title}</p>
      </header>
      <main>
        <section>
          <Button variant="one" onClick={() => window.close()}>
            <span class="material-icons">home</span>
          </Button>
        </section>
        <section>
          {topPlayers.length >= 2 && (
            <div className="second">
              <p>{topPlayers[1].username}</p>
              <div>
                <p>{topPlayers[1].totalScore}</p>
              </div>
            </div>
          )}
          {topPlayers.length >= 1 && (
            <div className="first">
              <p>{topPlayers[0].username}</p>
              <div>
                <p>{topPlayers[0].totalScore}</p>
              </div>
            </div>
          )}
          {topPlayers.length >= 3 && (
            <div className="third">
              <p>{topPlayers[2].username}</p>
              <div>
                <p>{topPlayers[2].totalScore}</p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

GameOver.propTypes = {
  game: PropTypes.shape({
    title: PropTypes.string,
  }),
  players: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      totalScore: PropTypes.number,
    })
  ),
};

GameOver.defaultProps = {
  game: {},
  players: [],
};

const mapStateToProps = (state) => {
  return {
    game: state.core.websocket.game,
    players: state.core.websocket.players,
  };
};

const WrappedGameOver = connect(mapStateToProps)(GameOver);

const first = keyframes`
  from {
    margin-top: 100%;
  }

  top {
    margin-top: 0;
  }
`;

const second = keyframes`
  from {
    margin-top: 80%;
  }

  top {
    margin-top: 0;
  }
`;

export default styled(WrappedGameOver)`
  background: rgb(70, 23, 143);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  > header {
    display: flex;
    justify-content: center;
    padding: 2rem;

    > p {
      font-size: 40px;
      background: var(--color-white);
      padding: 1rem 2rem;
      font-weight: 700;
      color: var(--color-black);
      display: inline-block;
      border-radius: 5px;
    }
  }

  > main {
    flex: 1;
    padding: 2rem 2rem 0 2rem;
    display: flex;
    flex-direction: column;

    > section:first-child {
      display: flex;
      justify-content: flex-end;
    }

    > section:last-child {
      flex: 1;
      padding-top: 2rem;
      display: flex;
      justify-content: center;

      > div {
        position: relative;
        display: flex;
        flex-direction: column;

        p {
          color: var(--color-white);
          font-weight: 600;
          font-size: 2.5rem;
        }

        > p {
          font-weight: 700;
          font-size: 3rem;
          margin-bottom: 1rem;
          padding: 0 1.5rem;
        }

        > div {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          flex: 1;
          display: flex;
          justify-content: center;
          padding: 2rem;
          box-shadow: 2px 2px 10px 10px rgba(0, 0, 0, 0.1);
        }

        &.second {
          top: 20%;
          height: 80%;
          animation: ${second} 2s forwards;

          > div {
            background: #d7d7d7;
          }
        }

        &.first {
          animation: ${first} 3s forwards;

          > div {
            background: #af9500;
            z-index: 1;
          }

          &.delay-2 {
            animation-delay: 2;
          }
        }

        &.third {
          top: 40%;
          height: 60%;

          > div {
            background: #ad8a56;
          }
        }
      }
    }
  }
`;
