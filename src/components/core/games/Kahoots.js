import React from 'react';

import GameList from './GameList';

const Kahoots = () => {
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

        <GameList />
      </div>
    </div>
  );
};

export default Kahoots;
