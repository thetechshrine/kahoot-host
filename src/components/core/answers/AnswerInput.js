import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AnswerInput = ({ type, placeHolder }) => {
  const [active, setActive] = useState(false);

  const onKeyUp = (evt) => {
    const { value } = evt.target;
    setActive(value && value.length > 0);
  };

  return (
    <div className={`answer-input ${type} ${active ? 'active' : 'inactive'}`}>
      <div
        className={`answer-input-inner-container ${
          active ? 'active' : 'inactive'
        }`}
      >
        <div className="shape-container">
          <div className="shape" />
        </div>
        <input
          type="text"
          className={`input ${active ? 'active' : 'inactive'}`}
          placeholder={placeHolder}
          onKeyUp={onKeyUp}
        />
        <div className={`checkbox-container ${active ? 'active' : 'inactive'}`}>
          <input type="checkbox" className="checkbox" id="" />
          <div>
            <i className="fas fa-check"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

AnswerInput.propTypes = {
  type: PropTypes.oneOf(['one', 'two', 'three', 'four', '']),
  placeHolder: PropTypes.string,
};

AnswerInput.defaultProps = {
  type: 'one',
  placeHolder: 'Add answer 1',
};

export default AnswerInput;
