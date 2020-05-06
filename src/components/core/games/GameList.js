import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../helpers/Card';
import ImageButton from '../../helpers/ImageButton';

import cover from '../../../assets/img/cover.png';

const GameItem = ({ game, onGameDeleted }) => {
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
              <ImageButton type="one" onClick={() => onGameDeleted(game)}>
                <span className="material-icons">delete</span>
              </ImageButton>
            </div>
            <p>Created 3 days ago</p>
          </div>
          <div className="bottom">
            <button
              onClick={() =>
                window.open(`/lobby?gameId=${game.uuid}`, '_blank')
              }
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const GameList = ({ games, onGameSelected, onGameDeleted }) => {
  const onClick = (evt, game) => {
    const { nodeName } = evt.target;
    if (game && nodeName !== 'BUTTON' && nodeName !== 'SPAN') {
      onGameSelected(game);
    }
  };

  return (
    <ul className="game-list">
      {games.map((game) => (
        <li
          key={game.uuid}
          id={game.uuid}
          onClick={(evt) => onClick(evt, game)}
        >
          <GameItem game={game} onGameDeleted={onGameDeleted} />
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
  onGameSelected: PropTypes.func.isRequired,
  onGameDeleted: PropTypes.func.isRequired,
};

GameList.defaultProps = {
  games: [],
};

export default GameList;
