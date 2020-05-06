import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import gameActions from '../../../store/actions/game';

import GameList from './GameList';
import DeleteModal from '../../helpers/DeleteModal';

import history from '../../../helpers/history';

const Kahoots = ({ games, getGames, deleteGame }) => {
  const [deleteModal, setDeleModal] = useState({
    visible: false,
    game: null,
  });

  useEffect(() => {
    getGames();
  }, [getGames]);

  const onGameSelected = (game) => {
    history.push(`/creator?game=${game.uuid}`);
  };

  const onGameDeleted = (game) => {
    setDeleModal({
      game,
      visible: true,
    });
  };

  const processDeleteGame = () => {
    deleteGame({ game: deleteModal.game });
    setDeleModal({
      visible: false,
      game: null,
    });
  };

  return (
    <div className="kahoots">
      <div className="kahoots-inner-container">
        <div className="search-container">
          <div className="inner-container">
            <input
              type="search"
              className="input-search"
              placeholder="Search..."
            />
            <span className="material-icons">search</span>
          </div>
        </div>

        <GameList
          games={games}
          onGameDeleted={onGameDeleted}
          onGameSelected={onGameSelected}
        />

        <DeleteModal
          show={deleteModal.visible}
          onHide={() => setDeleModal({ visible: false, game: null })}
          onDone={processDeleteGame}
          title="Delete game"
          message="Are you sure you want to delete this game? This action can not be undone"
        />
      </div>
    </div>
  );
};

Kahoots.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({})),
  getGames: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired,
};

Kahoots.defaultProps = {
  games: [],
};

const mapStateToProps = (state) => {
  return {
    games: state.core.game.games,
  };
};

const actions = {
  getGames: gameActions.getGames,
  deleteGame: gameActions.deleteGame,
};

export default connect(mapStateToProps, actions)(Kahoots);
