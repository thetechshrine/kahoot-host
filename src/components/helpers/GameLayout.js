import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { connect } from 'react-redux';

const GameLayout = ({ className, title, game, children }) => {
  return (
    <div className={className}>
      <header>
        <p>{title}</p>
      </header>
      <main>{children}</main>
      <footer>
        <p>
          <span>localhost</span>
          <span> Game PIN: </span>
          <span>{game.pin}</span>
        </p>
      </footer>
    </div>
  );
};

GameLayout.propTypes = {
  title: PropTypes.string,
  game: PropTypes.shape({
    pin: PropTypes.string,
  }),
};

GameLayout.defaultProps = {
  title: '',
  game: {
    pin: '',
  },
};

const mapStateToProps = (state) => {
  return {
    game: state.core.websocket.game,
  };
};

const WrappedGameLayout = connect(mapStateToProps)(GameLayout);

export default styled(WrappedGameLayout)`
  height: 100%;
  display: flex;
  flex-direction: column;

  > header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-height: 6rem;
  }

  > header::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background: #e1e1e1;
  }

  > header > p {
    font-size: 32px;
    font-weight: 700;
  }

  > main {
    flex: 1;
  }

  > footer {
    display: flex;
    align-items: center;
    position: relative;
    min-height: 4rem;
    padding: 0 1rem;
  }

  > footer::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 4px;
    background: #e1e1e1;
  }

  > footer > p > span {
    font-size: 18px;
  }

  > footer > p > span:nth-child(1),
  > footer > p > span:nth-child(3) {
    font-weight: 700;
  }
`;
