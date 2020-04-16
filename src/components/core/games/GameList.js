import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../helpers/Card';
import ImageButton from '../../helpers/ImageButton';

import cover from '../../../assets/img/cover.png';

const GameItem = ({ game }) => {
  return (
    <Card>
      <div className="game-item">
        <div className="left">
          <img src={game.cover || cover} alt=" " />
          <span>{game.questions.length} Questions</span>
        </div>

        <div className="right">
          <div className="top">
            <div>
              <p>{game.title}</p>
              <ImageButton type="one">
                <span className="material-icons">delete</span>
              </ImageButton>
            </div>
            <p>Created 3 days ago</p>
          </div>
          <div className="bottom">
            <button>Play</button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const GameList = ({ games, onClick }) => {
  return (
    <ul className="game-list">
      {games.map((game) => (
        <li key={game.uuid}>
          <GameItem game={game} />
        </li>
      ))}
    </ul>
  );
};

GameList.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
    })
  ),
  onClick: PropTypes.func,
};

GameList.defaultProps = {
  games: [],
  onClick: () => {},
};

export default GameList;
